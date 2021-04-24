import {InfoCircleFilled, CaretDownOutlined} from '@ant-design/icons';
import {Button, Col, Dropdown, Menu, Row, Spin, Modal, Tooltip} from 'antd';
import _isEqual from 'lodash/isEqual';
import _orderBy from 'lodash/orderBy';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {FormattedMessage, useIntl} from "react-intl";
import {useHistory} from 'react-router-dom';
import warning from '../../assets/img/noti-warn-icon.png';
import MTLogo from '../../assets/logo.svg';
import Messages from '../../Messages';
import {findBoxsBySCStationId} from '../../SCStationAPI';
import {getBoxEventDisplay} from '../Beds/BoxEventDisplay';
import {isLeftSiderAlert, LeftSiderAlerts, BoxEventType, BoxEventValue} from '../Beds/BoxEvents';
import DataContext from '../DataContext/DataContext';
import {Actions} from '../Store/Reducer';
import {StoreContext} from '../Store/Store';
import './AlertsSidebar.scss';
import {SIDEBAR_WIDTH} from '../../layouts/ResponsiveLayout';
import {Colors} from '../../util/Colors';
import {tryPlaySound} from '../../util/Sounds';
import connectionConnecting from '../../assets/img/icon-conn.png';
import connectionError from '../../assets/img/icon-conn-error.png';
import connectionWarning from '../../assets/img/icon-conn-warn.png';
import connectionGood from '../../assets/img/icon-conn-good.png';
import PatientCheckinSubPane from '../SubPanes/PatientCheckinSubPane/PatientCheckinSubPane';
import PatientTransferSubPane from '../SubPanes/PatientTransferSubPane/PatientTransferSubPane';

const SortBy = {
    Alert: 'Alert',
    Time: 'Time',
};
if (Object.freeze) Object.freeze(SortBy);

const SortByControl = {
    [SortBy.Alert]: [],
    [SortBy.Time]: ['Time'],
};
if (Object.freeze) Object.freeze(SortByControl);

const SystemStatus = {
    Normal: 'Normal',
    // DataHubNone: 'DataHubNone',
    // NOTE: the following don't appear to be used any more
    Connecting: 'Connecting',
    NoConnection: 'NoConnection',
    Connected: 'Connected',
    PoorTransmission: 'PoorTransmission',
};
if (Object.freeze) Object.freeze(SystemStatus);

const AlertsSidebar = ({props}) => {
    const intl = useIntl();
    const [store, dispatch] = useContext(StoreContext);
    const [sortBy, setSortBy] = useState(null);
    const [, setBoxes] = useState(null);
    const boxSounds = useRef({});
    const [isBoxesLoading, setBoxesLoading] = useState(false);
    const [, setErrorControlBoxes] = useState(null);
    const [checkinBoxId, setCheckinBoxId] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (!store.controlBoxes)
            (async () => {
                const result = await findBoxsBySCStationId({
                    store,
                    dispatch,
                    intl,
                    setIsLoading: setBoxesLoading,
                    setError: setErrorControlBoxes
                });
                if (result) {
                    dispatch({type: Actions.SetControlBoxes, payload: result});
                    setBoxes(result);
                }
            })();

    }, [store.boxEvents.length, dispatch, intl, store]); // reload boxes when the # in the WS changes

    let events = [];
    let classSuffix = '_Short';
    let connStatus = SystemStatus.NoConnection; // default
    let bedsInUse = 0;
    let notCheckedIn = [];
    // filter & sort
    // Assess name length & find System status & count beds in use
    store.boxEvents.forEach(boxEvent => {
        // separate checkins to always append at the end
        if (boxEvent.type === BoxEventType.PatientState && boxEvent.value === BoxEventValue.NoCheckIn) {
            notCheckedIn.push(boxEvent);
            return;
        }
        if (isLeftSiderAlert(boxEvent, store)) events.push(boxEvent);
        if (boxEvent.type === BoxEventType.SystemConnectionStatus) connStatus = boxEvent.value;
        if (boxEvent.patientId && boxEvent.patientId.length > 4) classSuffix = '_Long';
        if (boxEvent.patientId !== null && boxEvent.patientId !== '') bedsInUse++;
    });

    // sort
    const sortByAlert = (boxEvent) => (
        LeftSiderAlerts[boxEvent.type][boxEvent.value]
    );
    const sortByTime = 'time';
    const sortByBedId = (boxEvent) => {
        // const box = store.controlBoxIdToBox[boxEvent.boxId];
        // return box && box.bedNumber ? box.bedNumber : boxEvent.boxId;
        return boxEvent.bedNumber || boxEvent.boxId;
    };
    if (sortBy === null || sortBy === SortBy.Alert) {
        events = _orderBy(
            events,
            [sortByAlert, sortByTime],
            ['asc', 'desc']
        )
    } else {
        events = _orderBy(events, [sortByTime], ['desc'])
    }
    // sort checkin events by BedNo
    notCheckedIn = _orderBy(notCheckedIn, [sortByBedId], ['asc']);
    events.push(...notCheckedIn);

    useEffect(() => {
        const soundsToPlay = new Set();
        events.forEach(boxEvent => {
            const boxId = boxEvent.boxId;
            const display = getBoxEventDisplay({
                boxEvent,
                intl,
                controlBoxIdToBox: store.controlBoxIdToBox,
                controlBoxIdToSettings: store.controlBoxIdToSettings
            });
            const prevState = boxSounds.current[boxId];
            const nextSound = display.sound;
            const nextState = [nextSound, boxEvent.value, boxEvent.time];
            if (!display.noAlert && !_isEqual(prevState, nextState) && nextSound !== null) {
                soundsToPlay.add(nextSound);
            }
            boxSounds.current[boxId] = nextState;
        });

        for (const sound of soundsToPlay) {
            (async () => {
                try {
                    await sound.play()
                } catch (error) {
                    // just to be safe, in case browsers change sound playing permissions.
                }
            })();
        }
    }, [events, intl, store.controlBoxIdToBox]);

    // render events
    const alerts = [];
    events.forEach(boxEvent => {
        const display = getBoxEventDisplay({
            boxEvent,
            intl,
            controlBoxIdToBox: store.controlBoxIdToBox,
            controlBoxIdToSettings: store.controlBoxIdToSettings
        });
        if (display.noAlert && boxEvent.value !== BoxEventValue.NoCheckIn) return;
        const titleText = isBoxesLoading ? <Spin size="small"/> : boxEvent.bedNumber;
        const eventText = display.warningText ? display.warningText : display.eventText;
        const onClickAlert = boxEvent.value !== BoxEventValue.NoCheckIn ? null : boxEvent => {
            if (store.permissions.includes('patient_mgmt')) {
                setCheckinBoxId(boxEvent.boxId);
            } else {
                Modal.info({
                    title: intl.formatMessage(Messages.Text_Common_NotRole),
                    content: (
                        <div>
                            <p>
                                {intl.formatMessage(Messages.Text_ErrorMessage_E019)}
                            </p>
                        </div>
                    ),
                    onOk() {
                    },
                });
            }
        };
        alerts.push(
            <div key={`${boxEvent.erpid}${boxEvent.careUnitId}${boxEvent.boxId}`} onClick={() => onClickAlert ? onClickAlert(boxEvent) : null} style={{
                marginBottom: 10,
                background: display.bgColorAlert,
                color: display.eventTextColorAlert,
                cursor: onClickAlert ? 'pointer' : null
            }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '48px'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div className={`Noti_Item_BedId${classSuffix}`}>
                            {titleText}
                        </div>
                        <div className={`Noti_Item_EventName${classSuffix}`}>
                            <div className="warning-text"
                                 style={eventText && eventText.length > 13 ? {lineHeight: '22px'} : null}>
                                {eventText}
                            </div>
                        </div>
                    </div>
                    <div className="warning-image">
                        {display.exclamationShow && (
                            <div style={{fontSize: 24}}>
                                <Tooltip title={display.exclamationAlert}>
                  <span style={{color: Colors.White}}>
                    <InfoCircleFilled/>
                  </span>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    });

    const menu = (
        <Menu onClick={({key}) => setSortBy(key)}>
            <Menu.Item key={SortBy.Alert}>
                <FormattedMessage {...Messages.Text_SortByAlert} />
            </Menu.Item>
            <Menu.Item key={SortBy.Time}>
                <FormattedMessage {...Messages.Text_SortByTime} />
            </Menu.Item>
        </Menu>
    );

    const filterMessage = sortBy === null ? Messages.Text_SortByAlert : sortBy === SortBy.Alert ? Messages.Text_SortByAlert : Messages.Text_SortByTime;

    let connImage = connectionError;
    let connText = Messages.Text_ConnectionStatus2; // No Connection
    let connColor = Colors.Gray;
    if (store.disconnected) {
        connImage = connectionError;
        connText = Messages.Text_ConnectionStatus2;
        connColor = Colors.Error;
    } else if (connStatus === SystemStatus.Normal || connStatus === SystemStatus.Connected) {
        connImage = connectionGood;
        connText = Messages.Text_ConnectionStatus3;
        connColor = Colors.Good;
    } else if (connStatus === SystemStatus.DataHubNone) {
        connText = Messages.Text_ConnectionStatus4;
    } else if (connStatus === SystemStatus.Connecting) {
        connImage = connectionConnecting;
        connText = Messages.Text_ConnectionStatus1;
    } else if (connStatus === SystemStatus.PoorTransmission) {
        connImage = connectionWarning;
        connText = Messages.Text_ConnectionStatus3;
        connColor = Colors.Warn;
    } else if (connStatus === SystemStatus.NoConnection) {
        connText = Messages.Text_ConnectionStatus2;
    }

    return (
        <div>
            <div className="logo-container" style={{width: SIDEBAR_WIDTH}}>
                <div className="logo">
                    <img
                        src={MTLogo}
                        style={{cursor: 'pointer'}}
                        alt="Cognito Health"
                        width={250}
                        className="logo-image"
                        onClick={() => history.push('/')}/>
                </div>
                <div style={{height: '48px'}}>
                    <Row justify="space-between" align="middle">
                        <Col className="Noti_Title" style={{marginLeft: '16px'}}>
                            <FormattedMessage {...Messages.Text_NOTIFICATION} />
                        </Col>
                        <Col style={{textAlign: 'right'}}>
                            <Dropdown overlay={menu} trigger={['click']} size='large' placement="bottomRight">
                                <Button type='link' className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <FormattedMessage {...filterMessage} /> <CaretDownOutlined/>
                                </Button>
                            </Dropdown>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="sidebar-alerts-container" style={{width: SIDEBAR_WIDTH}}>
                {alerts}
            </div>
            <div className="sidebar-status-container" style={{width: SIDEBAR_WIDTH}}>
                <Row justify="middle" align="space-between" style={{height: '48px'}}>
                    <Col style={{color: connColor}}>
                        <img src={connImage} alt='connection status'/> <FormattedMessage {...connText} />
                    </Col>
                    <Col style={{color: Colors.Gray}}>
                        {bedsInUse} <FormattedMessage {...Messages.Text_BadsInUse} />
                    </Col>
                </Row>
            </div>
            <PatientCheckinSubPane boxId={checkinBoxId} isVisible={checkinBoxId !== null}
                                   onComplete={() => setCheckinBoxId(null)}/>
            {store.patientTransfer && (
                <PatientTransferSubPane
                    patient={store.patientTransfer.patient}
                    boxSettings={store.patientTransfer.boxSettings}
                    isVisible={store.patientTransfer !== null}
                    onComplete={() => dispatch({type: Actions.SetPatientTransfer, payload: null})}/>)}
        </div>
    )
};

export default AlertsSidebar;
