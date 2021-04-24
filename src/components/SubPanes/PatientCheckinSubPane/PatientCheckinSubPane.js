import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Divider, Drawer, Form, Input, InputNumber, notification, Radio, Row, Select, Slider, Space, Switch, Modal } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import { useDebouncedCallback } from 'use-debounce/lib';
import '../../../App.scss';
import lightFullSelected from '../../../assets/img/icon-light-hi-selected.png';
import lightFull from '../../../assets/img/icon-light-hi.png';
import lightLightSelected from '../../../assets/img/icon-light-lo-selected.png';
import lightLight from '../../../assets/img/icon-light-lo.png';
import lightOffSelected from '../../../assets/img/icon-light-off-selected.png';
import lightOff from '../../../assets/img/icon-light-off.png';
import volumeLoud from '../../../assets/img/icon-vol-hi-enable.png';
import volumeLoudSelected from '../../../assets/img/icon-vol-hi-selected.png';
import volumeLow from '../../../assets/img/icon-vol-lo-enable.png';
import volumeLowSelected from '../../../assets/img/icon-vol-lo-selected.png';
import volumeOffSelected from '../../../assets/img/icon-vol-mute-selected.png';
import volumeOff from '../../../assets/img/icon-vol-mute.png';
import leavingOffDisabled from '../../../assets/img/icon48-pt-leaving-off-disable.png';
import leavingOff from '../../../assets/img/icon48-pt-leaving-off-enable.png';
import leavingOnDisabled from '../../../assets/img/icon48-pt-leaving-on-disable.png';
import leavingOn from '../../../assets/img/icon48-pt-leaving-on-enable.png';
import reposOffDisabled from '../../../assets/img/icon48-pt-repos-off-disable.png';
import reposOff from '../../../assets/img/icon48-pt-repos-off-enable.png';
import reposOnDisabled from '../../../assets/img/icon48-pt-repos-on-disable.png';
import reposOn from '../../../assets/img/icon48-pt-repos-on-enable.png';
import sittingupOffDisabled from '../../../assets/img/icon48-pt-sittingup-off-disable.png';
import sittingupOff from '../../../assets/img/icon48-pt-sittingup-off-enable.png';
import sittingupOnDisabled from '../../../assets/img/icon48-pt-sittingup-on-disable.png';
import sittingupOn from '../../../assets/img/icon48-pt-sittingup-on-enable.png';
import stirringOffDisabled from '../../../assets/img/icon48-pt-stirring-off-disable.png';
import stirringOff from '../../../assets/img/icon48-pt-stirring-off-enable.png';
import stirringOnDisabled from '../../../assets/img/icon48-pt-stirring-on-disable.png';
import stirringOn from '../../../assets/img/icon48-pt-stirring-on-enable.png';
import padR from '../../../assets/img/img-padlineside.png';
import padL from '../../../assets/img/img-padlineside_L.PNG';
import Messages from '../../../Messages';
import { findBoxsBySCStationId, findBoxSettingByBoxId, findPatientByPatientId, patientCheckin, updateBoxSettings } from '../../../SCStationAPI';
import { formLayout, getDrawerWidth } from '../../../util/AntUtil';
import { Colors } from '../../../util/Colors';
import { Actions } from '../../Store/Reducer';
import { StoreContext } from '../../Store/Store';
import './PatientCheckinSubPane.scss';

const { confirm } = Modal;
const { Option } = Select;
const DEFAULT_CUSTOM_TIME = 120;
const DEFAULT_SETTINGS = {
    volume: 'Loud',
    led: 'Full',
    language: 'English',
    sitUpAudio: false,
    padSide: 'R',
    alertOn: true,
    stirring: true,
    sittingUp: true,
    leaving: true,
    reposition: true,
    timeToReposition: DEFAULT_CUSTOM_TIME,
};


function PatientCheckinSubPane({ boxId, onComplete, isVisible, isUpdate }) {
    const intl = useIntl();
    const screens = useBreakpoint();
    const [store, dispatch] = useContext(StoreContext);
    const [boxSetting, setBoxSetting] = useState(null);
    const [settingsUpdated, setSettingsUpdated] = useState(false);
    const [showUpdatedModal, setShowUpdatedModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [form,] = useState(Form.useForm()[0]); // isUpdate ? [null]    
    const [formFailed, setFormFailed] = useState(null);
    const [transferPatient, setTransferPatient] = useState(null);
    const [checkPatientId] = useDebouncedCallback(async () => {
        try {
            const patient = await findPatientByPatientId({ patientId: boxSetting.patientId, store, dispatch, intl })
            setTransferPatient(patient);
        } catch (error) {
            // ignore
        }
    }, 500);

    const bedNo = boxId && store.controlBoxIdToBox[boxId] ? store.controlBoxIdToBox[boxId].bedNo : null
    useEffect(() => {
        if (boxId) {
            form.resetFields();
            setError(null);
            if (isUpdate) {
                // lookup existing settings
                (async () => setBoxSetting(await findBoxSettingByBoxId({ boxId, store, dispatch, intl, setIsLoading, setError })))();
            } else {
                // new checkin                
                if (bedNo === null) {
                    // just in case we don't have a valid BedNo
                    setError(intl.formatMessage(Messages.Text_ErrorMessage));
                    return;
                }
                setBoxSetting({ ...DEFAULT_SETTINGS, bedNo: bedNo, patientId: null });
            }
        }
    }, [boxId]);

    // check if patient ID exists already
    useEffect(() => {
        if (boxSetting && boxSetting.patientId) checkPatientId();
    }, [boxSetting]);

    useEffect(() => {
        // lookup existing settings
        if (boxId && transferPatient) {
            const existingBoxId = store.patientSnToBox[transferPatient.patientSn].boxId;
            (async () => setBoxSetting(await findBoxSettingByBoxId({ boxId: existingBoxId, store, dispatch, intl, setIsLoading, setError })))();
        }
        // reset to default settings if transferPatient changed to nothing
        if (!transferPatient) setBoxSetting({ ...boxSetting, ...DEFAULT_SETTINGS });
    }, [transferPatient]);

    let submitButton = (
        <Button
            type="primary"
            className="modal-button"
            disabled={isLoading}
            onClick={checkin}>
            <FormattedMessage {...Messages.Text_Button_Patient_Login} />
        </Button>
    );

    // transfer changes
    let transferMessage = null;
    if (transferPatient) {
        transferMessage = (<Alert message={
            `${intl.formatMessage(Messages.Text_Patient_Checkin_PatientMessage)}; ${intl.formatMessage(Messages.Text_Patient_Checkin_PatientMessage2)}`.replace('XXX', transferPatient.bedNo)
        } type="warning" />);
        submitButton = (
            <Button
                type="primary"
                className="modal-button"
                disabled={isLoading}
                onClick={transfer}>
                <FormattedMessage {...Messages.Text_Button_Patient_Transfer} />
            </Button>
        );
    }

    let settingsForm;
    if (boxSetting) {
        const boxSettingsControls = getBoxSettingsControls();
        const dashboardAlertsControls = getDashboardAlertsControls();
        const repositionControls = getRepositionControls();
        settingsForm = isUpdate ? getUpdateLayout(boxSettingsControls, dashboardAlertsControls, repositionControls) :
            getNewCheckinLayout(boxSettingsControls, dashboardAlertsControls, repositionControls);
    } else if (error) {
        settingsForm = <Alert message={error} type='error' showIcon style={{ marginTop: '24px', marginBottom: '24px' }} />;
    } else {
        // just in case
        settingsForm = <div></div>
    }

    return (
        <Drawer
            placement="right"
            closable={true}
            onClose={completeAndReset}
            destroyOnClose={true}
            visible={isVisible}
            width={getDrawerWidth(screens)}
            className="drawer-mt">
            <div className="subpane">
                {!isUpdate && (
                    <h2 className="subpane-title">
                        <Space size="large">
                            {intl.formatMessage(Messages.Text_Patient_Checkin_Title)}
                            {bedNo ? (
                                <Space size="large">
                                    <Divider type="vertical" className="mt-divider" />
                                    <span className="mt-focus-text">{bedNo}</span>
                                </Space>
                            ) : null}
                        </Space>
                    </h2>
                )}
                {settingsForm}
            </div>
        </Drawer>
    );

    // ------------------------------------------------------------------------------------------------
    // Functions 
    // ------------------------------------------------------------------------------------------------
    function completeAndReset(updated) {
        if (isUpdate && updated !== true && settingsUpdated) {
            confirm({
                title: intl.formatMessage(Messages.Text_Message_Title),
                icon: <ExclamationCircleOutlined />,
                content: intl.formatMessage(Messages.Text_Message_Message1),
                okText: intl.formatMessage(Messages.Text_Button_Ok),
                cancelText: intl.formatMessage(Messages.Text_Button_Discard_Changes),
                onCancel() {
                    // reset to old patient settings
                    (async () => setBoxSetting(await findBoxSettingByBoxId({ boxId, store, dispatch, intl, setIsLoading, setError })))();
                    setSettingsUpdated(false);
                    completeAndReset(true);
                },
            });
            return false;
        } else {
            // reset form and state        
            setTransferPatient(null);
            setFormFailed(null);
            setError(null);
            onComplete();
        }
    }

    function isCustomReposition(time) {
        return [30, 60, 90, 120, 240].find((e) => e === time) === undefined;
    };

    function getRepositionValue() {
        if (!boxSetting.reposition) {
            return 'off';
        }
        if (!isCustomReposition(boxSetting.timeToReposition)) {
            return boxSetting.timeToReposition;
        } else {
            return 'custom';
        }
    }
    function setRepositionValue({ value, time }) {
        if (value === 'off') {
            setBoxSetting({ ...boxSetting, reposition: false, custom: false });
        } else {
            if (value === 'custom') {
                if (time === 'custom') time = DEFAULT_CUSTOM_TIME; // on first select custom
                setBoxSetting({ ...boxSetting, reposition: true, timeToReposition: time, custom: true });
            } else {
                setBoxSetting({ ...boxSetting, reposition: true, timeToReposition: time, custom: false });
            }
        }
    }

    async function checkin() {
        try {
            await form.validateFields();
        } catch {
            setFormFailed(true);
            return;
        }
        const checkedin = await patientCheckin({ boxSetting, store, dispatch, intl, setIsLoading, setError });
        if (checkedin) {
            // reload station boxes with new checked in patient.            
            const result = await findBoxsBySCStationId({ store, dispatch, intl });
            if (result) {
                dispatch({ type: Actions.SetControlBoxes, payload: result });
            }
            setBoxSetting({ ...DEFAULT_SETTINGS, patientId: null });
            completeAndReset();
            notification.open({
                message: intl.formatMessage(Messages.Text_Common_Success),
                description: intl.formatMessage(Messages.Text_Patient_Checkin_PatientMessage).replace('XXX ', bedNo),
                icon: <CheckCircleFilled style={{ color: Colors.Good }} />,
            });
        }
    }

    async function updateSettings() {
        try {
            await form.validateFields();
        } catch {
            setFormFailed(true);
            return;
        }
        const updated = await updateBoxSettings({ boxSetting, store, dispatch, intl, setIsLoading, setError });
        if (updated) {
            completeAndReset(true);
            notification.open({
                message: intl.formatMessage(Messages.Text_Common_Success),
                description: intl.formatMessage(Messages.Text_Settings_Updated_Success),
                icon: <CheckCircleFilled style={{ color: Colors.Good }} />,
            });
        }
    }

    async function transfer() {
        try {
            await form.validateFields();
        } catch {
            setFormFailed(true);
            return;
        }
        dispatch({ type: Actions.SetPatientTransfer, payload: { patient: transferPatient, boxSetting, boxNoFrom: bedNo } })
        setBoxSetting({ ...DEFAULT_SETTINGS, patientId: null });
        completeAndReset();
    }


    function getNewCheckinLayout(boxSettingsControls, dashboardAlertsControls, repositionControls) {
        return (
            <div>
                <Form
                    form={form}
                    {...formLayout}
                    onValuesChange={({ patientId }) => {
                        if (formFailed) setFormFailed(null);
                        setBoxSetting({ ...boxSetting, patientId });
                    }}>
                    <Form.Item
                        name="patientId"
                        className="mt-drawer-form"
                        label={intl.formatMessage(Messages.Text_Patient_Checkin_PatientNumber)}
                        rules={[
                            { required: true, message: intl.formatMessage(Messages.Text_ErrorMessage_E014) },
                            { min: 6, message: intl.formatMessage(Messages.Text_ErrorMessage_E003) },
                            { max: 20, message: intl.formatMessage(Messages.Text_ErrorMessage_E016) },
                            () => ({
                                validator(rule, value) {
                                    if (!value || value.match('^[a-zA-Z0-9]+$')) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(intl.formatMessage(Messages.Text_ErrorMessage_E012));
                                },
                            }),
                        ]}>
                        <Input />
                    </Form.Item>
                </Form>
                {transferPatient && (transferMessage)}
                <div><FormattedMessage {...Messages.Text_Patient_Checkin_BedSide_AlertNumber} />: {boxId}</div>
                <div><FormattedMessage {...Messages.Text_Patient_Checkin_BedSide_Type} />: Pad</div>
                <Divider className="mt-divider-horizontal" />
                {boxSettingsControls}
                <Divider className="mt-divider-horizontal" />
                {dashboardAlertsControls}
                {repositionControls}
                <Divider className="mt-divider-horizontal" />
                {error ? <Alert message={error} type='error' showIcon style={{ marginTop: '24px', marginBottom: '24px' }} /> : null}
                {formFailed ? <Alert message={intl.formatMessage(Messages.Text_ErrorMessage_E015)} type='error' showIcon /> : null}
                {submitButton}
            </div>
        );
    }

    function getUpdateLayout(boxSettingsControls, dashboardAlertsControls, repositionControls) {
        return (
            <div>
                {boxSettingsControls}
                <Divider className="mt-divider-horizontal" />
                {dashboardAlertsControls}
                {repositionControls}
                <Divider className="mt-divider-horizontal" />
                {error ? <Alert message={error} type='error' showIcon style={{ marginTop: '24px', marginBottom: '24px' }} /> : null}
                {formFailed ? <Alert message={intl.formatMessage(Messages.Text_ErrorMessage_E015)} type='error' showIcon /> : null}
                <Button
                    type="primary"
                    disabled={isLoading}
                    style={{ width: '100px' }}
                    onClick={updateSettings}>
                    <FormattedMessage {...Messages.Text_Button_ApplySettings} />
                </Button>
            </div>
        );
    }

    function getRepositionControls() {
        const repositionValue = getRepositionValue();
        const isCustom = boxSetting.custom || isCustomReposition(boxSetting.timeToReposition);
        return (
            <Row align="bottom">
                <Col className="settings-col" span={24}>
                    <div><FormattedMessage {...Messages.Text_BedSide_Settings_RepositionAlertTime1} /></div>
                    <div><FormattedMessage {...Messages.Text_BedSide_Settings_RepositionAlertTime2} /></div>
                    <Space>
                        <Select
                            value={repositionValue}
                            size="large"
                            disabled={!store.permissions.includes('patient_mgmt') || !boxSetting.alertOn}
                            onChange={(value) => {
                                setRepositionValue({ value, time: value });
                                setSettingsUpdated(true);
                            }}
                            style={{ minWidth: '120px' }}>
                            <Option value="off"><FormattedMessage {...Messages.Text_Common_Off} /></Option>
                            <Option value={30}>30 <FormattedMessage {...Messages.Text_Minutes} /></Option>
                            <Option value={60}>60 <FormattedMessage {...Messages.Text_Minutes} /></Option>
                            <Option value={90}>90 <FormattedMessage {...Messages.Text_Minutes} /></Option>
                            <Option value={120}>120 <FormattedMessage {...Messages.Text_Minutes} /></Option>
                            <Option value={240}>240 <FormattedMessage {...Messages.Text_Minutes} /></Option>
                            <Option value="custom"><FormattedMessage {...Messages.Text_Custom} /></Option>
                        </Select>
                        {isCustom ? (
                            <div>
                                <Space>
                                    <InputNumber
                                        min={1}
                                        max={240}
                                        size="large"
                                        disabled={!store.permissions.includes('patient_mgmt') || !boxSetting.alertOn}
                                        value={boxSetting.timeToReposition}
                                        onChange={(time) => {
                                            setRepositionValue({ value: 'custom', time });
                                            setSettingsUpdated(true);
                                        }} />
                                    <FormattedMessage {...Messages.Text_Minutes} />
                                </Space>
                            </div>
                        ) : (
                                <span style={{ color: Colors.Focus }}>
                                    {boxSetting.timeToReposition} <FormattedMessage {...Messages.Text_Minutes} />
                                </span>
                            )}
                    </Space>
                </Col>
                {isCustom ? (
                    <Col className="settings-col" span={24}>
                        <Slider
                            marks={{ 0: '0', 120: '120', 240: '240' }}
                            min={1}
                            max={240}
                            step={1}
                            disabled={!store.permissions.includes('patient_mgmt') || !boxSetting.alertOn}
                            value={boxSetting.timeToReposition}
                            onChange={(time) => {
                                setRepositionValue({ value: 'custom', time });
                                setSettingsUpdated(true);
                            }} />
                    </Col>
                ) : null}
            </Row>
        );
    }

    function getBoxSettingsControls() {
        return (
            <div>
                <Row align="bottom">
                    <Col className="settings-col">
                        <h3 className="subpane-sec-title">
                            <Space>
                                <FormattedMessage {...Messages.Text_BedSide_Settings_BedsideSettings} />
                            </Space>
                        </h3>
                        <div><FormattedMessage {...Messages.Text_BedSide_Settings_LightLevel1} /></div>
                        <div><FormattedMessage {...Messages.Text_BedSide_Settings_LightLevel2} /></div>
                        <Radio.Group
                            disabled={!store.permissions.includes('patient_mgmt') && !store.permissions.includes('patient_bedside_settings')}
                            size="large"
                            buttonStyle="solid"
                            value={boxSetting.led}
                            onChange={(e) => {
                                setBoxSetting({ ...boxSetting, led: e.target.value });
                                setSettingsUpdated(true);
                            }}>
                            <Radio.Button value="Close"><img src={boxSetting.led === 'Close' ? lightOffSelected : lightOff} className="image-radio" alt='' /></Radio.Button>
                            <Radio.Button value="Light"><img src={boxSetting.led === 'Light' ? lightLightSelected : lightLight} className="image-radio" alt='' /></Radio.Button>
                            <Radio.Button value="Full"><img src={boxSetting.led === 'Full' ? lightFullSelected : lightFull} className="image-radio" alt='' /></Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col className="settings-col">
                        <div><FormattedMessage {...Messages.Text_BedSide_Settings_AlertVolume1} /></div>
                        <div><FormattedMessage {...Messages.Text_BedSide_Settings_AlertVolume2} /></div>
                        <Radio.Group
                            disabled={!store.permissions.includes('patient_mgmt') && !store.permissions.includes('patient_bedside_settings')}
                            size="large"
                            buttonStyle="solid"
                            value={boxSetting.volume}
                            onChange={(e) => {
                                setBoxSetting({ ...boxSetting, volume: e.target.value });
                                setSettingsUpdated(true);
                            }}>
                            <Radio.Button value="No"><img src={boxSetting.volume === 'No' ? volumeOffSelected : volumeOff} className="image-radio" alt='' /></Radio.Button>
                            <Radio.Button value="Low"><img src={boxSetting.volume === 'Low' ? volumeLowSelected : volumeLow} className="image-radio" alt='' /></Radio.Button>
                            <Radio.Button value="Loud"><img src={boxSetting.volume === 'Loud' ? volumeLoudSelected : volumeLoud} className="image-radio" alt='' /></Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col className="settings-col">
                        <div><FormattedMessage {...Messages.Text_BedSide_Settings_SittingUpAlert1} /></div>
                        <div><FormattedMessage {...Messages.Text_BedSide_Settings_SittingUpAlert2} /></div>
                        <div style={{ marginTop: '6px', marginBottom: '10px' }}>
                            <Switch
                                disabled={!store.permissions.includes('patient_mgmt') && !store.permissions.includes('patient_bedside_settings')}
                                checked={boxSetting.sitUpAudio}
                                unCheckedChildren={intl.formatMessage(Messages.Text_Common_Off)}
                                checkedChildren={intl.formatMessage(Messages.Text_Common_On)}
                                onChange={() => {
                                    setBoxSetting({ ...boxSetting, sitUpAudio: !boxSetting.sitUpAudio });
                                    setSettingsUpdated(true);
                                }} />
                        </div>
                    </Col>
                    <Col className="settings-col" style={{ minWidth: '120px' }}>
                        <div><FormattedMessage {...Messages.Text_BedSide_Settings_VoiceLanguage1} /></div>
                        <div><FormattedMessage {...Messages.Text_BedSide_Settings_VoiceLanguage2} /></div>
                        <Select
                            disabled={!store.permissions.includes('patient_mgmt') && !store.permissions.includes('patient_bedside_settings')}
                            value={boxSetting.language}
                            style={{ minWidth: '120px' }}
                            onChange={(value) => {
                                setBoxSetting({ ...boxSetting, language: value });
                                setSettingsUpdated(true);
                            }}
                            size="large">
                            <Option value="English"><FormattedMessage {...Messages.Text_AlertMessage_Language_English} /></Option>
                            <Option value="Spanish"><FormattedMessage {...Messages.Text_AlertMessage_Language_Spanish} /></Option>
                            <Option value="Chinese"><FormattedMessage {...Messages.Text_AlertMessage_Language_Chinese} /></Option>
                            <Option value="Taiwanese"><FormattedMessage {...Messages.Text_AlertMessage_Language_Taiwanese} /></Option>
                            <Option value="Music"><FormattedMessage {...Messages.Text_AlertMessage_Language_Music} /></Option>
                        </Select>
                    </Col>
                    <Col className="pad-container settings-col">
                        <div className="pad-controls" style={{ backgroundImage: boxSetting.padSide === 'L' ? padL : padR }}>
                            <div><FormattedMessage {...Messages.Text_BedSide_Settings_CableOrientation1} /></div>
                            <div><FormattedMessage {...Messages.Text_BedSide_Settings_CableOrientation2} /></div>
                            <Radio.Group
                                disabled={!store.permissions.includes('patient_mgmt') && !store.permissions.includes('patient_bedside_settings')}
                                buttonStyle="solid"
                                value={boxSetting.padSide}
                                onChange={(e) => {
                                    setBoxSetting({ ...boxSetting, padSide: e.target.value });
                                    setSettingsUpdated(true);
                                }}>
                                <Radio.Button value="L"><FormattedMessage {...Messages.Text_BedSide_Settings_CableOrientationLeft} /></Radio.Button>
                                <Radio.Button value="R"><FormattedMessage {...Messages.Text_BedSide_Settings_CableOrientationRight} /></Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className="pad-image"><img src={boxSetting.padSide === 'L' ? padL : padR} alt='' /></div>
                    </Col>
                </Row>
            </div>
        );
    }

    function getDashboardAlertsControls() {
        return (
            <div>
                <h3 className="subpane-sec-title">
                    <Space>
                        <FormattedMessage {...Messages.Text_BedSide_Settings_AlertSettings} />
                        <Switch
                            disabled={!store.permissions.includes('patient_mgmt')}
                            checked={boxSetting.alertOn}
                            unCheckedChildren={intl.formatMessage(Messages.Text_Common_Off)}
                            checkedChildren={intl.formatMessage(Messages.Text_Common_On)}
                            onChange={() => setBoxSetting({ ...boxSetting, alertOn: !boxSetting.alertOn })} />
                        <span className="mt-general-ui"><FormattedMessage {...Messages.Text_BedSide_Settings_MainSwitch} /></span>
                    </Space>
                </h3>
                <div className="settings-col">
                    <Space size="large">
                        <div onClick={() => {
                            if (store.permissions.includes('patient_mgmt')) {
                                setBoxSetting({ ...boxSetting, stirring: !boxSetting.stirring });
                                setSettingsUpdated(true);
                            }
                        }}>
                            <div>
                                <img src={boxSetting.stirring ? boxSetting.alertOn ? stirringOn : stirringOnDisabled : boxSetting.alertOn ? stirringOff : stirringOffDisabled} alt='' />
                            </div>
                            <span className={boxSetting.alertOn ? "alerts-label-text" : "alerts-label-text-disabled"}>
                                <FormattedMessage {...Messages.Text_BedSide_Settings_Stirring} />
                            </span>
                        </div>
                        <div onClick={() => {
                            if (store.permissions.includes('patient_mgmt')) {
                                setBoxSetting({ ...boxSetting, sittingUp: !boxSetting.sittingUp });
                                setSettingsUpdated(true);
                            }
                        }}>
                            <div>
                                <img src={boxSetting.sittingUp ? boxSetting.alertOn ? sittingupOn : sittingupOnDisabled : boxSetting.alertOn ? sittingupOff : sittingupOffDisabled} alt='' />
                            </div>
                            <span className={boxSetting.alertOn ? "alerts-label-text" : "alerts-label-text-disabled"}>
                                <FormattedMessage {...Messages.Text_BedSide_Settings_SittingUp} />
                            </span>
                        </div>
                        <div onClick={() => {
                            if (store.permissions.includes('patient_mgmt')) {
                                setBoxSetting({ ...boxSetting, leaving: !boxSetting.leaving });
                                setSettingsUpdated(true);
                            }
                        }}>
                            <div>
                                <img src={boxSetting.leaving ? boxSetting.alertOn ? leavingOn : leavingOnDisabled : boxSetting.alertOn ? leavingOff : leavingOffDisabled} alt='' />
                            </div>
                            <span className={boxSetting.alertOn ? "alerts-label-text" : "alerts-label-text-disabled"}>
                                <FormattedMessage {...Messages.Text_BedSide_Settings_Leaving} />
                            </span>
                        </div>
                        <div onClick={() => {
                            if (store.permissions.includes('patient_mgmt')) {
                                setBoxSetting({ ...boxSetting, reposition: !boxSetting.reposition });
                                setSettingsUpdated(true);
                            }
                        }}>
                            <div>
                                <img src={boxSetting.reposition ? boxSetting.alertOn ? reposOn : reposOnDisabled : boxSetting.alertOn ? reposOff : reposOffDisabled} alt='' />
                            </div>
                            <span className={boxSetting.alertOn ? "alerts-label-text" : "alerts-label-text-disabled"}>
                                <FormattedMessage {...Messages.Text_BedSide_Settings_Reposition} />
                            </span>
                        </div>
                    </Space>
                </div>
            </div>
        );
    }
};

PatientCheckinSubPane.defaultProps = {
    isUpdate: false,
}

PatientCheckinSubPane.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    boxId: PropTypes.string,
    onComplete: PropTypes.func.isRequired,
    isUpdate: PropTypes.bool,
};

export default PatientCheckinSubPane;