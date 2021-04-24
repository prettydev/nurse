import { Button, Col, Divider, Drawer, Row, Select, Alert, Form } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import '../../../App.scss';
import Messages from '../../../Messages';
import { getDrawerWidth } from '../../../util/AntUtil';
import { StoreContext } from '../../Store/Store';
import ChangePassword from '../../Login/ChangePassword';


const { Option } = Select;

function UserSettingsSubPane({ patient, onComplete, isVisible }) {
    const intl = useIntl();
    const screens = useBreakpoint();
    const [store, dispatch] = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loginTimeout, setLoginTimeout] = useState(null);

    const saveTimeout = () => {
        console.log(loginTimeout);
    }

    // TODO : implement idle timeout later
    //const idleTimeoutSetting = createIdleTimeoutSetting();

    return (
        <Drawer
            placement="right"
            closable={true}
            onClose={() => onComplete()}
            visible={isVisible}
            width={getDrawerWidth(screens)}
            className="drawer-mt">
            <div className="subpane">
                <h2 className="subpane-title">{intl.formatMessage(Messages.Text_UserSetting_Title)}</h2>
                {/* {idleTimeoutSetting} */}
                <h3 className="subpane-sec-title"><FormattedMessage {...Messages.Text_UserSetting_ChangePWD} /></h3>
                <Row className="mt-row">
                    <Col span={24}>
                        <ChangePassword onComplete={onComplete} />
                    </Col>
                </Row>
            </div>
        </Drawer>
    );

    function createIdleTimeoutSetting() {
        return (
            <div>
                <h3 className="subpane-sec-title"><FormattedMessage {...Messages.Text_UserSetting_AutoLogoutTile} /></h3>
                <Row className="mt-row">
                    <Col>
                        <Form
                            onValuesChange={(changedValue) => saveTimeout(changedValue)}>
                            <Form.Item
                                name="loginTiming"
                                label={intl.formatMessage(Messages.Text_UserSetting_AutoLogoutTime)}>
                                <Select defaultValue="10" style={{ width: 200 }} onChange={setLoginTimeout}>
                                    <Option value="10">10 <FormattedMessage {...Messages.Text_Minutes} /></Option>
                                    <Option value="30">30 <FormattedMessage {...Messages.Text_Minutes} /></Option>
                                    <Option value="60">60 <FormattedMessage {...Messages.Text_Minutes} /></Option>
                                    <Option value="120">120 <FormattedMessage {...Messages.Text_Minutes} /></Option>
                                </Select>
                            </Form.Item>
                        </Form>
                        {error ? <Alert message={error} type='error' showIcon style={{ marginTop: '24px' }} /> : null}
                    </Col>
                </Row>
                <Button
                    type="primary"
                    className="modal-button"
                    disabled={isLoading}
                    onClick={saveTimeout}>
                    <FormattedMessage {...Messages.Text_Button_Save} />
                </Button>
                <Divider className="mt-divider-horizontal" />
            </div>
        );
    }
};

UserSettingsSubPane.propTypes = {
    onComplete: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
};

export default UserSettingsSubPane;