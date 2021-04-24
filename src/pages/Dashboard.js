import {CaretDownOutlined, InfoCircleFilled, SearchOutlined} from '@ant-design/icons';
import {Button, Col, Dropdown, Grid, Input, Menu, Row, Table, Tabs, Tooltip, Modal} from 'antd';
import _orderBy from 'lodash/orderBy';
import React, {useContext, useEffect, useState} from 'react';
import {FormattedMessage, useIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import listViewIcon from '../assets/img/icon-ptlist-disp.png';
import gridViewIcon from '../assets/img/icon-ptwin-disp.png';
import sortBedIdIcon from '../assets/img/icon-sort-asc-display.png';
import sortCheckinTimeIcon from '../assets/img/icon-sort-time-display.png';
import boxPairingIcon from '../assets/img/img-device96-box.png';
import padIcon from '../assets/img/img-device96-pad.png';
import Bed from '../components/Beds/Bed';
import BedNotificationsEmpty from '../components/Beds/BedNotificationsEmpty';
import {getBoxEventDisplay} from '../components/Beds/BoxEventDisplay';
import {DashboardNotifications, isAllPatientsEvent, isDashboardNotification} from '../components/Beds/BoxEvents';
import {BoxSettingsDisplay, DashboardAlertsDisplay} from '../components/Beds/BoxSettingsDisplay';
import {BedSize} from '../components/Beds/displayConstants';
import {StoreContext} from '../components/Store/Store';
import TopBarMainMenu from '../components/TopBar/TopBarMainMenu';
import Messages from '../Messages';
import {findBoxsBySCStationId, findPatientByPatientId} from '../SCStationAPI';
import {loadControlBoxesAndSettings} from '../util/ApiUtils';
import {Colors} from '../util/Colors';
import {useDebouncedCallback} from 'use-debounce';
import './Dashboard.scss';

const {useBreakpoint} = Grid;
const {TabPane} = Tabs;

const SortBy = {
    edId: 'BedId',
    CheckinTime: 'CheckinTime'
};
if (Object.freeze) {
    Object.freeze(SortBy)
}

const ViewStyle = {
    GridView: 'GridView',
    ListView: 'ListView',
};
if (Object.freeze) {
    Object.freeze(ViewStyle)
}

const DashboardTab = {
    Notification: 'Notificaiton',
    AllPatients: 'AllPatients',
};
if (Object.freeze) {
    Object.freeze(DashboardTab)
}

const DEFAULT_VIEW = {
    tab: DashboardTab.Notification,
    sortBy: SortBy.BedId,
    viewStyle: ViewStyle.GridView,
    searchFilter: '',
};

export default function Dashboard() {
    const intl = useIntl();
    const history = useHistory();
    const screens = useBreakpoint();
    const [store, dispatch] = useContext(StoreContext);
    const [isBoxesLoading, setBoxesLoading] = useState(false);
    const [, setErrorControlBoxes] = useState(null);
    const [dashboardView, setDashboardView] = useState(store.dashboardView ? store.dashboardView : DEFAULT_VIEW);
    const [searchPatientResults, setSearchPatientResults] = useState([]);
    const [searchPatients] = useDebouncedCallback((patientId) => {
        (async () => {
            const patient = await findPatientByPatientId({patientId, store, dispatch, intl});
            setSearchPatientResults(patient && patient.bedNo ? [patient.bedNo.toLowerCase()] : []);
        })();
    }, 300);

    // save dashbaord view settings to global store
    useEffect(() => {
        dispatch({type: 'SetDashboardView', payload: dashboardView})
    }, [dashboardView]);

    // load boxes and settings
    useEffect(() => {
        if (!store.controlBoxes)
            (async () => loadControlBoxesAndSettings({
                store,
                dispatch,
                intl,
                setIsLoading: setBoxesLoading,
                setError: setErrorControlBoxes
            }))();
    }, [dispatch, intl, store]);

    let headerButtons = [
        getSearchBtn(),
        dashboardView.tab === DashboardTab.AllPatients ? getSortByBtn() : null,
        getViewStyleBtn(),
    ];

    // search for patients when filter changes
    useEffect(() => searchPatients(dashboardView.searchFilter), [dashboardView.searchFilter]);

    const dataByBox = {};
    store.currentPressure.forEach(element => {
        dataByBox[element.boxId] = element.value;
    });

    const filteredBoxEvents = store.boxEvents.filter(boxEvent => {
        const box = store.controlBoxIdToBox[boxEvent.boxId];
        const bedNumber = box && box.bedNo ? box.bedNo.toLowerCase() : '';
        return bedNumber.includes(dashboardView.searchFilter.toLowerCase()) || searchPatientResults.includes(bedNumber.toLowerCase());
    });

    // filter boxEvents into Notification and All Patients
    // let notificationEvents = [];
    // let allPatientsEvents = [];
    // filteredBoxEvents.forEach(boxEvent => {
    //     if (isDashboardNotification(boxEvent)) {
    //         const display = getBoxEventDisplay({
    //             boxEvent,
    //             intl,
    //             controlBoxIdToBox: store.controlBoxIdToBox,
    //             controlBoxIdToSettings: store.controlBoxIdToSettings
    //         });
    //         if (!display.noAlert) notificationEvents.push(boxEvent)
    //     }
    //
    //     if (isAllPatientsEvent(boxEvent)) allPatientsEvents.push(boxEvent);
    // });
    let notificationEvents = store.boxEvents;
    let allPatientsEvents = store.boxEvents;

    const sortByAlert = boxEvent => (
        DashboardNotifications[boxEvent.type][boxEvent.value]
    );
    const sortByTime = 'Time';

    // always sort notification events by alert first
    notificationEvents = _orderBy(
        notificationEvents,
        [sortByAlert, sortByTime],
        ['asc', 'desc']
    );

    // sort all patients
    const sort = getSort(dashboardView.sortBy, store);
    allPatientsEvents = _orderBy(allPatientsEvents, [sort.iteratee], [sort.order]);

    // renders
    let bedsNotification;
    if (notificationEvents.length === 0) {
        bedsNotification = <BedNotificationsEmpty/>;
    } else if (dashboardView.viewStyle === ViewStyle.GridView) {
        bedsNotification = (
            <Row>
                {notificationEvents.map(boxEvent => (
                    getBedCard(boxEvent, getBedSize(notificationEvents), 'nt')
                ))}
            </Row>
        );
    } else {
        bedsNotification = (
            <div style={{padding: '12px'}}>
                {getBedTable(notificationEvents, 'nt')}
            </div>
        );
    }

    let bedsAllPatients;
    if (dashboardView.viewStyle === ViewStyle.GridView) {
        bedsAllPatients = (
            <Row>
                {allPatientsEvents.map(boxEvent => (
                    getBedCard(boxEvent, getBedSize(allPatientsEvents), 'ap')
                ))}
            </Row>
        );
    } else {
        bedsAllPatients = (
            <div style={{padding: '12px'}}>
                {getBedTable(allPatientsEvents, 'ap')}
            </div>
        );
    }

    return (
        <div>
            <TopBarMainMenu
                className="mt-header"
                title={store.scStation.scStationName}
                buttons={headerButtons}/>
            <div className="mt-content">
                <Tabs className="mt-tabs" defaultActiveKey={dashboardView.tab} animated={false}
                      onChange={key => setDashboardView({...dashboardView, tab: key})}>
                    <TabPane tab={intl.formatMessage(Messages.Text_Dashboard_Tab_Notifications)}
                             key={DashboardTab.Notification}>
                        <div style={{padding: '4px'}}>
                            {bedsNotification}
                        </div>
                    </TabPane>
                    <TabPane tab={intl.formatMessage(Messages.Text_Dashboard_Tab_AllPatients)}
                             key={DashboardTab.AllPatients}>
                        <div style={{padding: '4px'}}>
                            {bedsAllPatients}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );

    function getSort(sortBy, store) {
        const sortByBedId = boxEvent => {
            const box = store.controlBoxIdToBox[boxEvent.boxId];
            return box ? box.bedNo : boxEvent.boxId;
        };
        const sortByTime = boxEvent => {
            const box = store.controlBoxIdToBox[boxEvent.boxId];
            return box && box.checkInTime ? box.checkInTime : 0;
        };
        let sort = {iteratee: null, order: null};
        if (sortBy === SortBy.BedId) {
            sort.iteratee = sortByBedId;
            sort.order = 'asc';
        } else if (sortBy === SortBy.CheckinTime) {
            sort.iteratee = sortByTime;
            sort.order = 'desc';
        } else {
            throw new Error(`Unknown sortBy ${sortBy}`);
        }
        return sort;
    }

    // bed Card render
    function getBedCard(boxEvent, size, salt) {
        return (
            <Col key={`bed${salt}${boxEvent.erpId}${boxEvent.careUnitId}${boxEvent.boxId}`} className="gutter-row">
                <Bed
                    boxEvent={boxEvent}
                    currentPressure={dataByBox[boxEvent.boxId]}
                    showRaw={true}
                    size={size}
                    isBoxesLoading={isBoxesLoading}/>
            </Col>
        );
    }

    function getBedTable(boxEvents, salt) {
        const columns = [
            {
                // Bed
                key: 'bed',
                title: intl.formatMessage(Messages.Text_PatientList_Bedside),
                width: '320px',
                render: boxEvent => {
                    const display = getBoxEventDisplay({
                        boxEvent,
                        intl,
                        controlBoxIdToBox: store.controlBoxIdToBox,
                        controlBoxIdToSettings: store.controlBoxIdToSettings
                    });

                    let eventText;
                    let eventTextColor;
                    if (display.warningText) {
                        eventText = display.warningText;
                        eventTextColor = display.warningTextColor;
                    } else if (display.listText && display.listTextColor) {
                        eventText = display.listText;
                        eventTextColor = display.listTextColor;
                    } else if (display.eventText) {
                        eventText = display.eventText;
                        eventTextColor = display.eventTextColor;
                    } else {
                        eventText = intl.formatMessage(Messages.Text_Event_InUse);
                        eventTextColor = Colors.MainText;
                    }
                    return (
                        <div style={{display: 'flex'}}>
                            <div
                                className="Noti_Item_BedId_Long"
                                style={{marginLeft: 0}}
                            >
                                {display.titleText}
                            </div>
                            <div
                                className="Noti_Item_EventName_Long"
                                style={{
                                    background: display.bgColor,
                                    color: eventTextColor,
                                    borderRadius: '3px',
                                    border: `2px solid ${Colors.Black_a12}`,
                                    textAlign: 'center',
                                    padding: '2px',
                                    lineHeight: eventText && eventText.length > 13 ? '22px' : null,
                                }}
                            >
                                {eventText}
                            </div>
                            <div>
                                {display.exclamationShow && (
                                    <div style={{fontSize: 24, paddingLeft: 8}}>
                                        <Tooltip title={display.exclamationAlert}>
                      <span style={{color: Colors.Gray}}>
                        <InfoCircleFilled/>
                      </span>
                                        </Tooltip>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                },
            },
            {
                // Box settings
                key: 'box-settings',
                title: intl.formatMessage(Messages.Text_PatientList_Bedset),
                width: '265px',
                render: boxEvent => {
                    const boxId = boxEvent.boxId;
                    const boxSettings = store.controlBoxIdToSettings[boxId];
                    if (!boxSettings) {
                        return <></>;
                    }
                    const settingsDisplays = [
                        BoxSettingsDisplay.led[boxSettings.led],
                        BoxSettingsDisplay.volume[boxSettings.volume],
                        BoxSettingsDisplay.language[boxSettings.language],
                        BoxSettingsDisplay.sitUpAudio[boxSettings.sitUpAudio],
                    ];
                    return (
                        <div className="list-view-settings-col list-view-border-right">
                            {settingsDisplays.map(settingsDisplay => (
                                <div
                                    key={settingsDisplay.label.id}
                                    style={{
                                        marginLeft: '8px',
                                        marginRight: '8px',
                                    }}
                                >
                                    <img
                                        src={settingsDisplay.img}
                                        alt=''
                                        style={{
                                            display: 'block',
                                            height: '36px',
                                            width: '36px',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            marginBottom: '4px',
                                        }}
                                    />
                                    <div>
                                        <FormattedMessage {...settingsDisplay.label} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                },
            },
            {
                // Alert settings
                key: 'alert-settings',
                title: intl.formatMessage(Messages.Text_PatientList_Warning),
                width: '400px',
                render: boxEvent => {
                    const boxId = boxEvent.boxId;
                    const boxSettings = store.controlBoxIdToSettings[boxId];
                    if (!boxSettings) {
                        return <></>;
                    }
                    const alertsDisplays = [
                        DashboardAlertsDisplay.stirring[boxSettings.stirring][boxSettings.alertOn],
                        DashboardAlertsDisplay.sittingUp[boxSettings.sittingUp][boxSettings.alertOn],
                        DashboardAlertsDisplay.leaving[boxSettings.leaving][boxSettings.alertOn],
                        DashboardAlertsDisplay.reposition[boxSettings.reposition][boxSettings.alertOn],
                    ];
                    return (
                        <div className="list-view-settings-col list-view-border-right">
                            {alertsDisplays.map(alertsDisplay => (
                                <div
                                    key={alertsDisplay.label.id}
                                    style={{
                                        marginLeft: '8px',
                                        marginRight: '8px',
                                    }}
                                >
                                    <img
                                        src={alertsDisplay.img}
                                        alt=''
                                        style={{
                                            display: 'block',
                                            height: '36px',
                                            width: '36px',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            marginBottom: '4px',
                                        }}
                                    />
                                    <div>
                                        <FormattedMessage {...alertsDisplay.label} />
                                    </div>
                                </div>
                            ))}
                            <div
                                key="time-to-reposition"
                                style={{
                                    marginLeft: '8px',
                                    marginRight: '8px',
                                }}
                            >
                                <div
                                    style={{
                                        height: '36px',
                                        paddingTop: '10px',
                                        marginBottom: '4px',
                                    }}
                                >
                  <span className="list-view-setting-reposition-time">
                    {boxSettings.timeToReposition}
                  </span>
                                    <FormattedMessage {...Messages.Text_Minutes} />
                                </div>
                                <div style={{display: 'block', textAlign: 'center'}}>
                                    <FormattedMessage {...Messages.Text_BedSide_Settings_RepositionAlertTime3} /></div>
                            </div>
                        </div>
                    );
                },
            },
            {
                key: 'box-info',
                title: intl.formatMessage(Messages.Text_PatientList_Alarm),
                width: '140px',
                render: boxEvent => {
                    let controlBox = store.controlBoxIdToBox[boxEvent.boxId];
                    if (!controlBox) {
                        controlBox = {};
                    }
                    return (
                        <div
                            className="list-view-border-right"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                src={boxPairingIcon} alt=''
                                style={{
                                    height: '36px',
                                    width: '36px',
                                    marginLeft: '8px',
                                    marginRight: '8px',
                                }}
                            />
                            <div
                                style={{
                                    marginLeft: '8px',
                                    marginRight: '8px',
                                }}
                            >
                                <FormattedMessage {...Messages.Text_PatientList_BedsideAlerts} />
                                <div className="mt-general-bold">{controlBox.boxId}</div>
                            </div>
                        </div>
                    );
                }
            },
            {
                key: 'sensor-info',
                title: intl.formatMessage(Messages.Text_PatientList_Info),
                width: '260px',
                render: boxEvent => {
                    let controlBox = store.controlBoxIdToBox[boxEvent.boxId];
                    if (!controlBox) {
                        controlBox = {};
                    }
                    return (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                src={padIcon} alt=''
                                style={{
                                    height: '36px',
                                    width: '36px',
                                    marginLeft: '8px',
                                    marginRight: '8px',
                                }}
                            />
                            <table
                                style={{
                                    marginLeft: '8px',
                                    marginRight: '8px',
                                }}
                            >
                                <tbody>
                                <tr>
                                    <td style={{borderBottom: 'none', fontWeight: 700}}>
                                        <FormattedMessage {...Messages.Text_PatientList_Pad} />
                                    </td>
                                    <td style={{borderBottom: 'none'}}>
                                        {controlBox.padId}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{borderBottom: 'none'}}>
                                        <FormattedMessage {...Messages.Text_SensorLifeWarning_Lifetime} />:
                                    </td>
                                    <td style={{borderBottom: 'none'}}>
                                        {controlBox.padUsageTime >= 0 ? `${Math.floor(controlBox.padUsageTime / 6)} ${intl.formatMessage(Messages.Text_Dashboard_Text_Hours)}` : ''}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    );
                }
            }
        ];

        return (
            <Table
                tableLayout="fixed"
                size="small"
                className="mt-list-table"
                dataSource={store.boxEvents}
                columns={columns}
                pagination={false}
                scroll={{x: true}}
                rowKey={boxEvent => `bed${salt}${boxEvent.boxId}`}
                rowClassName="list-view-row"
                onRow={(boxEvent, index) => ({
                    onClick: event => {
                        if (store.permissions.includes('patient_detail')) {
                            history.push(`/patient/${boxEvent.patientId}`);
                        } else {
                            Modal.info({
                                title: intl.formatMessage(Messages.Text_Common_NotRole),
                                content: (
                                    <div>
                                        <p>
                                            {intl.formatMessage(Messages.Text_ErrorMessage_E021)}
                                        </p>
                                    </div>
                                ),
                                onOk() {
                                },
                            });
                        }
                    }
                })}
            />
        );
    }

    function getBedSize(events) {
        return events && events.length <= 14 ? BedSize.Large : events && events.length <= 30 ? BedSize.Medium : BedSize.Small;
    }

    // Header Buttons
    function getSearchBtn() {
        const button = (
            <div key="searchHeaderBtn" className="header-button" style={{width: screens.xxl ? 160 : 80}}>
                <Input
                    className="header-search"
                    defaultValue={dashboardView.searchFilter}
                    placeholder={screens.xxl ? intl.formatMessage(Messages.Text_Title_Search) : null}
                    onChange={event => setDashboardView({...dashboardView, searchFilter: event.target.value})}
                    suffix={<SearchOutlined style={{color: Colors.Focus}}/>}
                />
            </div>
        );
        return button;
    }

    function getSortByBtn() {
        const menu = (
            <Menu onClick={({key}) => setDashboardView({...dashboardView, sortBy: key})}>
                <Menu.Item key={SortBy.bedNumber}>
                    <img src={sortBedIdIcon}
                         alt='Sort by BedID'/><FormattedMessage {...Messages.Text_Title_SortByBedID} />
                </Menu.Item>
                <Menu.Item key={SortBy.CheckinTime}>
                    <img src={sortCheckinTimeIcon}
                         alt='Sort by Checkin Time'/><FormattedMessage {...Messages.Text_Title_SortByCheckInTime} />
                </Menu.Item>
            </Menu>
        );
        const button = (
            <div key="sortHeaderBtn" className="header-button">
                <Dropdown className="header-button-dd" overlay={menu} trigger={['click']} size='large'
                          placement="bottomRight">
                    {dashboardView.sortBy === SortBy.bedNumber ?
                        <Button type='link' className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <img src={sortBedIdIcon} alt='Sort by BedID'/> {screens.xxl ?
                            <FormattedMessage {...Messages.Text_Title_SortByBedID} /> : null}<CaretDownOutlined/>
                        </Button> :
                        <Button type='link' className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <img src={sortCheckinTimeIcon} alt='Sort by Checkin Time'/> {screens.xxl ?
                            <FormattedMessage {...Messages.Text_Title_SortByCheckInTime} /> : null}<CaretDownOutlined/>
                        </Button>}
                </Dropdown>
            </div>
        );
        return button;
    }

    function getViewStyleBtn() {
        const selectView = ({key}) => {
            findBoxsBySCStationId({store, dispatch, intl});  // update boxes
            setDashboardView({...dashboardView, viewStyle: key});
        }
        const menu = (
            <Menu onClick={selectView}>
                <Menu.Item key={ViewStyle.GridView}>
                    <img src={gridViewIcon} alt='grid'/><FormattedMessage {...Messages.Text_Title_DisplayList1} />
                </Menu.Item>
                <Menu.Item key={ViewStyle.ListView}>
                    <img src={listViewIcon} alt='list'/><FormattedMessage {...Messages.Text_Title_DisplayList2} />
                </Menu.Item>
            </Menu>
        );
        const button = (
            <div key="viewStyleHeaderBtn" className="header-button">
                <Dropdown className="header-button-dd" overlay={menu} trigger={['click']} size='large'
                          placement="bottomRight">
                    {dashboardView.viewStyle === ViewStyle.GridView ?
                        <Button type='link' className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <img src={gridViewIcon} alt='grid'/> {screens.xxl ?
                            <FormattedMessage {...Messages.Text_Title_DisplayList1} /> : null}<CaretDownOutlined/>
                        </Button> :
                        <Button type='link' className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <img src={listViewIcon} alt='list'/>{screens.xxl ?
                            <FormattedMessage {...Messages.Text_Title_DisplayList2} /> : null}<CaretDownOutlined/>
                        </Button>}
                </Dropdown>
            </div>
        );
        return button;
    }

};
