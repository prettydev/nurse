import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import Messages from '../../Messages';
import './LoginForm.scss';
import { setupSoundsBasedOnUserInteraction } from '../../util/Sounds';

const LoginForm = ({ onLogin, onForgotPassword, isLoading, error }) => {
    const intl = useIntl();
    return (
        <div >
            <Form
                name="normal_login"
                initialValues={{
                    remember: true,
                }}
                onFinish={values => onLogin({username: values.username, password: values.password})}>
                <Form.Item
                    name="username"
                    rules={[{
                        required: true,
                        message: intl.formatMessage(Messages.Text_UserLogin_ID_Required),
                    }]}>
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder={intl.formatMessage(Messages.Text_UserLogin_ID)} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{
                        required: true,
                        message: intl.formatMessage(Messages.Text_UserLogin_PWD_Required),
                    }]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder={intl.formatMessage(Messages.Text_UserLogin_PWD)} />
                </Form.Item>
                <Form.Item>
                    <Button type="link" className="login-form-forgot" onClick={onForgotPassword}>
                        <FormattedMessage {...Messages.Text_UserLogin_Forgot_PWD} />
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" disabled={isLoading} onClick={setupSoundsBasedOnUserInteraction}>
                        <FormattedMessage {...Messages.Text_Button_Login} />
                    </Button>
                </Form.Item>
            </Form>
            {error ? <Alert message={error} type='error' showIcon style={{ marginTop: '24px' }} /> : null}
        </div>
    );
};

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onForgotPassword: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
};

export default LoginForm;
