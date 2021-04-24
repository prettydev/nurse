import { LockOutlined, NumberOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import Messages from '../../Messages';

const SetPassword = ({ onSetPassword, email, requireCode, isLoading, error }) => {
    const intl = useIntl();
    const [isMatch, setIsMatch] = useState(true);
    const onFinish = (values) => {
        if (values.newPassword !== values.confirmPassword) {
            setIsMatch(false);
        } else {
            onSetPassword(values);
        }
    };

    return (
        <div >
            <Form
                name="setPassword"
                initialValues={{
                    email
                }}
                onFinish={onFinish}>
                {requireCode ?
                    <Form.Item
                        name="email"
                        rules={[{
                            required: true,
                            message: intl.formatMessage(Messages.Text_UserLogin_Reset_PWD_Email_Required),
                        }]}>
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder={intl.formatMessage(Messages.Text_UserLogin_Reset_PWD_Email)} />
                    </Form.Item> : null}
                {requireCode ?
                    <Form.Item
                        name="code"
                        rules={[{
                            required: true,
                            message: intl.formatMessage(Messages.Text_ChangePassword_PWDResetCod_Required),
                        }]}>
                        <Input
                            prefix={<NumberOutlined className="site-form-item-icon" />}
                            placeholder={intl.formatMessage(Messages.Text_ChangePassword_PWDResetCode)} />
                    </Form.Item> : null}
                <Form.Item
                    name="newPassword"
                    rules={[
                        {
                            required: true,
                            message: intl.formatMessage(Messages.Text_ErrorMessage_E006),
                        },
                        { min: 8, message: intl.formatMessage(Messages.Text_ErrorMessage_E004) },
                    ]}
                    hasFeedback>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder={intl.formatMessage(Messages.Text_UserSetting_NewPWD)} />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[{
                        required: true,
                        message: intl.formatMessage(Messages.Text_UserSetting_ConfirmNewPWD),
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(intl.formatMessage(Messages.Text_ErrorMessage_E005));
                        },
                    })]}
                    hasFeedback>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder={intl.formatMessage(Messages.Text_UserSetting_ConfirmNewPWD)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={isLoading}>
                        <FormattedMessage {...requireCode ? Messages.Text_Button_Reset_PWD : Messages.Text_ChangePassword_Title} />
                    </Button>
                </Form.Item>
            </Form>
            {error ? <Alert message={error} type='error' showIcon style={{ marginTop: '24px' }} /> : null}
        </div>
    );
};

SetPassword.propTypes = {
    onSetPassword: PropTypes.func.isRequired,
    email: PropTypes.string,
    requireCode: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
};

export default SetPassword;
