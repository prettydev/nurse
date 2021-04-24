import { CheckCircleFilled, LockOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, notification } from 'antd';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import Messages from '../../Messages';
import { Colors } from '../../util/Colors';
import { Actions } from '../Store/Reducer';
import { StoreContext } from '../Store/Store';

const ChangePassword = ({ onComplete }) => {
    const intl = useIntl();
    const [store, dispatch] = useContext(StoreContext);
    const [isMatch, setIsMatch] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onFinish = async (values) => {
        if (values.newPassword !== values.confirmPassword) {
            setIsMatch(false);
        } else {
            Auth.currentAuthenticatedUser()
                .then(user => {
                    return Auth.changePassword(user, values.oldPassword, values.newPassword);
                })
                .then(data => {
                    notification.open({
                        message: intl.formatMessage(Messages.Text_Common_Success),
                        description: intl.formatMessage(Messages.Text_ChangePassword_ConfirmOK),
                        icon: <CheckCircleFilled style={{ color: Colors.Good }} />,
                        duration: 10,
                    });
                    dispatch({ type: Actions.Logout, payload: null });
                    onComplete();
                })
                .catch(err => {
                    let msg = Messages.Text_ErrorMessage_106;
                    if (err) {
                        if (err.code === 'NotAuthorizedException') {
                            msg = Messages.Text_ErrorMessage_101;
                        } else if (err.code === 'InvalidParameterException') {
                            if (err.message.includes('previousPassword')) {
                                msg = Messages.Text_ErrorMessage_101;
                            } else if (err.message.includes('must have length greater than or equal to')) {
                                msg = Messages.Text_ErrorMessage_E003;
                            }
                        }
                    }
                    setError(intl.formatMessage(msg));
                });
        }
    };
    return (
        <div >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                name="changePassword"
                onFinish={onFinish}>
                <Form.Item
                    name="oldPassword"
                    className="mt-drawer-form"
                    label={intl.formatMessage(Messages.Text_UserSetting_OldPWD)}
                    rules={[{
                        required: true,
                        message: intl.formatMessage(Messages.Text_ErrorMessage_105),
                    }]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder={intl.formatMessage(Messages.Text_UserSetting_OldPWD)} />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    className="mt-drawer-form"
                    label={intl.formatMessage(Messages.Text_UserSetting_NewPWD)}
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
                    className="mt-drawer-form"
                    label={intl.formatMessage(Messages.Text_UserSetting_ConfirmNewPWD)}
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
                    <Button type="primary" className="modal-button" htmlType="submit" style={{ width: '100%' }} disabled={isLoading}>
                        <FormattedMessage {...Messages.Text_ChangePassword_Title} />
                    </Button>
                </Form.Item>
            </Form>
            {error ? <Alert message={error} type='error' showIcon style={{ marginTop: '24px' }} /> : null}
        </div>
    );
};

ChangePassword.propTypes = {
    onComplete: PropTypes.func,
};

export default ChangePassword;
