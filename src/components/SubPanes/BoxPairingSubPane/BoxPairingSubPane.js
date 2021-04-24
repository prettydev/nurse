import { CheckCircleFilled } from '@ant-design/icons';
import { Alert, Button, Divider, Form, Input, notification, Popconfirm, Space } from 'antd';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import '../../../App.scss';
import imgDevice96Box from '../../../assets/img/img-device96-box.png';
import imgDevice96Pad from '../../../assets/img/img-device96-pad.png';
import Messages from '../../../Messages';
import { boxRemove, boxUpdateBedNo, findBoxsBySCStationId } from '../../../SCStationAPI';
import { Colors } from '../../../util/Colors';
import { Actions } from '../../Store/Reducer';
import { StoreContext } from '../../Store/Store';
import './BoxPairingSubPane.scss';


const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 }
}
const tailLayout = {
    wrapperCol: { offset: 5, span: 10 }
}

function BoxPairingDetails({ boxId, onComplete }) {
    const intl = useIntl();
    const [store, dispatch] = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [removeError, setRemoveError] = useState(null);
    const [bedNoErrorMsg, setBedNoErrorMsg] = useState(null);
    const [formFailed, setFormFailed] = useState(null);

    // find this control box
    let controlBox = store.controlBoxes.find(box => box.boxId === boxId);
    if (!controlBox) controlBox = {};
    const initialValues = {
        bedNo: controlBox.bedNo
    }

    const updateStationBoxes = async () => {
        const boxes = await findBoxsBySCStationId({ store, dispatch, intl });
        if (boxes) dispatch({ type: Actions.SetControlBoxes, payload: boxes });
    }

    const onUpdateBedNo = async ({ bedNo }) => {
        setError(null);
        setRemoveError(null);
        const success = await boxUpdateBedNo({ bedNo, boxId, store, dispatch, intl, setIsLoading, setError });
        if (success) {
            await updateStationBoxes();
            notification.open({
                message: intl.formatMessage(Messages.Text_Common_Success),
                description: intl.formatMessage(Messages.Text_BoxManagement_Pairing_Success),
                icon: <CheckCircleFilled style={{ color: Colors.Good }} />,
            });
            onComplete();
        }
    }
    const onClearPairing = () => {
        setError(null);
        setRemoveError(null);
        onUpdateBedNo({ bedNo: '', boxId, store, dispatch, intl, setIsLoading, setError });
    }
    const onBoxRemove = async () => {
        setError(null);
        setRemoveError(null);
        const success = await boxRemove({ boxId, store, dispatch, intl, setIsLoading, setError: setRemoveError });
        if (success) {
            // refetch boxes            
            await updateStationBoxes();
            notification.open({
                message: intl.formatMessage(Messages.Text_Common_Success),
                description: intl.formatMessage(Messages.Text_BoxManagement_Detail_RemoveSuccess),
                icon: <CheckCircleFilled style={{ color: Colors.Good }} />,
            });
            onComplete();
        }
    }

    return (
        <div className="subpane">
            <h2 className="subpane-title">{intl.formatMessage(Messages.Text_BoxManagement_Detail_Title)}</h2>
            <h3 className="subpane-sec-title"><FormattedMessage {...Messages.Text_BoxManagement_Detail_BedMatching} /></h3>
            <Form {...layout}
                onFinish={onUpdateBedNo}
                onFinishFailed={setFormFailed}
                initialValues={initialValues}
                onValuesChange={() => formFailed ? setFormFailed(null) : null}>
                <Form.Item
                    name="bedNo"
                    className="mt-drawer-form"
                    label={intl.formatMessage(Messages.Text_Patient_CheckOut_PatientBedNo)}
                    rules={[
                        { required: true, message: intl.formatMessage(Messages.Text_ErrorMessage_E014) },
                        { max: 9, message: intl.formatMessage(Messages.Text_ErrorMessage_E013) },
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
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button htmlType="button" disabled={isLoading} onClick={onClearPairing}>
                            <FormattedMessage {...Messages.Text_Button_ClearMatching} />
                        </Button>
                        <Button type="primary" htmlType="submit" disabled={isLoading}>
                            <FormattedMessage {...Messages.Text_Button_UpdateMatching} />
                        </Button>
                    </Space>
                </Form.Item>
                {error ? <Alert message={error} type='error' showIcon /> : null}
                {formFailed ? <Alert message={intl.formatMessage(Messages.Text_ErrorMessage_E015)} type='error' showIcon /> : null}
            </Form>
            <h3 className="subpane-sec-title"><FormattedMessage {...Messages.Text_BoxManagement_Detail_HardwareInfo} /></h3>
            <table>
                <tbody>
                    <tr>
                        <td className="image-col">
                            <img src={imgDevice96Box} alt={intl.formatMessage(Messages.Text_BoxManagement_Box)} />
                        </td>
                        <td>
                            <h4><FormattedMessage {...Messages.Text_BoxManagement_Box} /></h4>
                            <table>
                                <tbody>
                                    <tr className="subpane-compact-item">
                                        <td className="subpane-label-col"><FormattedMessage {...Messages.Text_BoxManagement_Detail_HardwareID} /></td>
                                        <td className="subpane-value-col">{controlBox.boxId}</td>
                                    </tr>
                                    <tr className="subpane-compact-item">
                                        <td className="subpane-label-col"><FormattedMessage {...Messages.Text_BoxManagement_Detail_IP} /></td>
                                        <td className="subpane-value-col">{controlBox.boxIP}</td>
                                    </tr>
                                    <tr className="subpane-compact-item">
                                        <td className="subpane-label-col"><FormattedMessage {...Messages.Text_BoxManagement_Detail_ConnectionMethod} /></td>
                                        <td className="subpane-value-col">{controlBox.connectionInterface}</td>
                                    </tr>
                                    <tr className="subpane-compact-item">
                                        <td className="subpane-label-col"><FormattedMessage {...Messages.Text_BoxManagement_Detail_FirmwareVersion} /></td>
                                        <td className="subpane-value-col">{controlBox.boxFWVer}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h3 className="subpane-sec-title"><FormattedMessage {...Messages.Text_BoxManagement_Detail_SensableSensorPad} /></h3>
            <table>
                <tbody>
                    <tr>
                        <td className="image-col">
                            <img src={imgDevice96Pad} alt={intl.formatMessage(Messages.Text_BoxManagement_Detail_SensableSensorPad)} />
                        </td>
                        <td>
                            <h4><FormattedMessage {...Messages.Text_BoxManagement_Detail_SensableSensorPad} /></h4>
                            <table>
                                <tbody>
                                    <tr className="subpane-compact-item">
                                        <td className="subpane-label-col"><FormattedMessage {...Messages.Text_BoxManagement_Detail_HardwareID2} /></td>
                                        <td className="subpane-value-col">{controlBox.padId}</td>
                                    </tr>
                                    <tr className="subpane-compact-item">
                                        <td className="subpane-label-col"><FormattedMessage {...Messages.Text_BoxManagement_Detail_FirmwareVersion} /></td>
                                        <td className="subpane-value-col">{controlBox.padFWVer}</td>
                                    </tr>
                                    <tr className="subpane-compact-item">
                                        <td className="subpane-label-col"><FormattedMessage {...Messages.Text_SensorLifeWarning_Lifetime} /></td>
                                        <td className="subpane-value-col">
                                            {controlBox.padUsageTime >= 0 ? `${Math.floor(controlBox.padUsageTime / 6)} ${intl.formatMessage(Messages.Text_Dashboard_Text_Hours)}` : ''}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Divider />
            <Space size='large'>
                <FormattedMessage {...Messages.Text_BoxManagement_Detail_Remove} />
                <Popconfirm
                    title={intl.formatMessage(Messages.Text_BoxManagement_Detail_RemoveConfirm)}
                    onConfirm={onBoxRemove}
                    okText="Yes"
                    cancelText="No">
                    <Button disabled={isLoading}><FormattedMessage {...Messages.Text_Button_Delete} /></Button>
                </Popconfirm>
            </Space>
            {removeError ? <Alert message={removeError} type='error' showIcon style={{ marginTop: '24px' }} /> : null}
        </div>
    );
};

BoxPairingDetails.propTypes = {
    boxId: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
};

export default BoxPairingDetails;