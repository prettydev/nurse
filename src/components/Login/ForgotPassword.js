import { MailOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import Messages from '../../Messages';

const ForgotPassword = ({ onReset, isLoading, error }) => {
    const intl = useIntl();
    return (
        <div >
            <Form
                name="resetPassword"
                initialValues={{
                    remember: true,
                }}
                onFinish={onReset}>
                <Form.Item
                    name="email"
                    rules={[{
                        required: true,
                        message: intl.formatMessage(Messages.Text_UserLogin_Reset_PWD_Email_Required),
                    }]}>
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder={intl.formatMessage(Messages.Text_UserLogin_Reset_PWD_Email)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={isLoading}>
                        <FormattedMessage {...Messages.Text_Button_Reset_PWD} />
                    </Button>
                </Form.Item>
            </Form>
            {error ? <Alert message={error} type='error' showIcon style={{ marginTop: '24px' }} /> : null}
        </div>
    );
};

ForgotPassword.propTypes = {
    onReset: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
};

export default ForgotPassword;
