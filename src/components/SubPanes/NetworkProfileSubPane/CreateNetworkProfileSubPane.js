import { Alert, Button, Form, Input, notification, Select, Space } from 'antd';
import PropTypes from 'prop-types';
import { CheckCircleFilled } from '@ant-design/icons';
import React, { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import '../../../App.scss';
import Messages from '../../../Messages';
import { StoreContext } from '../../Store/Store';
import { Colors } from '../../../util/Colors';
import { boxConfigCreateNetworkProfile, boxConfigGetNetworkProfiles } from '../../../BoxConfigAPI';
import { Actions } from '../../Store/Reducer';
const { Option } = Select;

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 }
}
const tailLayout = {
    wrapperCol: { offset: 5, span: 10 }
}

const REQUIRES_IDENTITY = {
    "EAP-PEAP": true,
    "EAP-FAST": true,
    "EAP-TLS": true,
}

// Users must choose a wifi band
const ALLOWED_ENCRYPTION_VALUES = ["WPA2 PSK", "WPA PSK"];

// Users must choose a wifi band
const ALLOWED_BAND_VALUES = ["5Ghz", "2.4Ghz"];

// For either band, can either choose "Auto" or select a wifi protocol (like 802.11a + the bit rate)
const ALLOWED_DATARATE_VALUES_2_4GHZ_AUTO = ["Auto"];
const ALLOWED_DATARATE_VALUES_2_4GHZ_802_11b = ["1Mbps", "2Mbps", "5.5Mbps", "11Mbps"];
const ALLOWED_DATARATE_VALUES_2_4GHZ_802_11g = ["6Mbps", "9Mbps", "12Mbps", "18Mbps", "24Mbps", "36Mbps", "48Mbps", "54Mbps"];
const ALLOWED_DATARATE_VALUES_2_4GHZ_802_11n = ["MSC0", "MSC1", "MSC2", "MSC3", "MSC4", "MSC5", "MSC6", "MSC7"];

const ALLOWED_DATARATE_VALUES_5GHZ_AUTO = ["Auto"]
const ALLOWED_DATARATE_VALUES_5GHZ_802_11a = ["6Mbps", "9Mbps", "12Mbps", "18Mbps", "24Mbps", "36Mbps", "48Mbps", "54Mbps"];
const ALLOWED_DATARATE_VALUES_5GHZ_802_11n = ["MSC0", "MSC1", "MSC2", "MSC3", "MSC4", "MSC5", "MSC6", "MSC7"];

// Users must also select a wifi country
const ALLOWED_COUNTRY_VALUES = ["US", "EU", "JP"];

const ALLOWED_5G = [...ALLOWED_DATARATE_VALUES_5GHZ_AUTO, ...ALLOWED_DATARATE_VALUES_5GHZ_802_11a, ...ALLOWED_DATARATE_VALUES_5GHZ_802_11n];
const ALLOWED_2_4G = [...ALLOWED_DATARATE_VALUES_2_4GHZ_AUTO, ...ALLOWED_DATARATE_VALUES_2_4GHZ_802_11b, ...ALLOWED_DATARATE_VALUES_2_4GHZ_802_11g, ...ALLOWED_DATARATE_VALUES_2_4GHZ_802_11n];

function CreateNetworkProfileSubPane({ onComplete }) {
    const intl = useIntl();
    const [store, dispatch] = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentBand, setCurrentBand] = useState(null);
    const [encryption, setEncryption] = useState(null);
    const [form] = Form.useForm();

    async function createProfile({ profileName, ssid, encryption, band, datarate, country, identity, password }) {
        const networkProfile = {
            Deployment: store.vars.Meta.Deployment,
            ProfileName: profileName,
            ProfileType: 'WiFi',
            WiFi: {
                SSID: ssid,
                Encryption: encryption,
                Band: band,
                Datarate: datarate,
                Country: country,
                Identity: identity,
                Password: password,
            }
        };
        const success = await boxConfigCreateNetworkProfile({ networkProfile, store, dispatch, intl, setIsLoading, setError });
        if (success) {
            notification.open({
                message: intl.formatMessage(Messages.Text_Common_Success),
                description: intl.formatMessage(Messages.Text_BoxConfig_Text_ProfileCreated),
                icon: <CheckCircleFilled style={{ color: Colors.Good }} />,
            });
            form.resetFields();
            onComplete();
            dispatch({ type: Actions.SetNetworkProfiles, payload: await boxConfigGetNetworkProfiles({ store, dispatch, intl }) });
        }
    }

    return (
        <div className="drawer-mt">
            <div className="subpane">
                <h2 className="subpane-title">{intl.formatMessage(Messages.Text_BoxConfig_Text_CreateProfile)}</h2>
                <h3 className="subpane-sec-title"><FormattedMessage {...Messages.Text_BoxConfig_Text_Wifi} /></h3>
                <Form {...layout}
                    form={form}
                    onFinish={createProfile}>
                    {createFormInput('profileName', Messages.Text_BoxConfig_Text_ProfileName)}
                    {createFormInput('ssid', Messages.Text_BoxConfig_Text_SSID)}
                    {createSelectInput('encryption', Messages.Text_BoxConfig_Text_Encryption, ALLOWED_ENCRYPTION_VALUES, false, (value) => {
                        form.setFieldsValue({ identity: null }); // clear possibly invalid values
                        setEncryption(value);
                    })}
                    <Form.Item
                        name='band'
                        label={intl.formatMessage(Messages.Text_BoxConfig_Text_Band)}
                        className="mt-drawer-form"
                        rules={[
                            { required: true, message: intl.formatMessage(Messages.Text_ErrorMessage_E014) },
                        ]}>
                        <Select
                            onChange={(value) => {
                                form.setFieldsValue({ datarate: null }); // clear possibly invalid values
                                setCurrentBand(value);
                            }}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {ALLOWED_BAND_VALUES.map(value => <Option value={value} key={value}>{value}</Option>)}
                        </Select>
                    </Form.Item>
                    {currentBand === "5Ghz" ?
                        createSelectInput('datarate', Messages.Text_BoxConfig_Text_DataRate, ALLOWED_5G, currentBand === null) :
                        createSelectInput('datarate', Messages.Text_BoxConfig_Text_DataRate, ALLOWED_2_4G, currentBand === null)}
                    {createSelectInput('country', Messages.Text_BoxConfig_Text_Country, ALLOWED_COUNTRY_VALUES)}
                    {REQUIRES_IDENTITY[encryption] && (createFormInput('identity', Messages.Text_BoxConfig_Text_Identity))}
                    <Form.Item
                        name='password'
                        className="mt-drawer-form"
                        label={intl.formatMessage(Messages.Text_BoxConfig_Text_Password)}
                        rules={[
                            { required: true, message: intl.formatMessage(Messages.Text_ErrorMessage_E014) },
                            { min: 8, message: intl.formatMessage(Messages.Text_ErrorMessage_E004) },
                            () => ({
                                validator(rule, value) {
                                    if (!value || value.match('^[0-9a-zA-Z@!&^-_.]+$')) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(intl.formatMessage(Messages.Text_BoxConfig_Text_InvalidPassword));
                                },
                            }),    
                        ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button htmlType="button" disabled={isLoading} onClick={() => form.resetFields()}>
                                <FormattedMessage {...Messages.Text_BoxConfig_Text_Clear} />
                            </Button>
                            <Button type="primary" htmlType="submit" disabled={isLoading}>
                                <FormattedMessage {...Messages.Text_BoxConfig_Text_CreateProfile} />
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
                {error && (<Alert message={error} type='error' showIcon />)}
            </div>
        </div>
    );

    function createFormInput(name, label) {
        return (
            <Form.Item
                name={name}
                className="mt-drawer-form"
                label={intl.formatMessage(label)}
                rules={[
                    { required: true, message: intl.formatMessage(Messages.Text_ErrorMessage_E014) },
                ]}>
                <Input />
            </Form.Item>
        );
    }

    function createSelectInput(name, label, options, disabled, onChange) {
        if (disabled === undefined) disabled = false;
        return (
            <Form.Item
                name={name}

                label={intl.formatMessage(label)}
                className="mt-drawer-form"
                rules={[
                    { required: true, message: intl.formatMessage(Messages.Text_ErrorMessage_E014) },
                ]}>
                <Select
                    disabled={disabled}
                    onChange={onChange}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {options.map(value => <Option value={value} key={value}>{value}</Option>)}
                </Select>
            </Form.Item>
        );
    }
};

CreateNetworkProfileSubPane.propTypes = {
    onComplete: PropTypes.func.isRequired,
};

export default CreateNetworkProfileSubPane;