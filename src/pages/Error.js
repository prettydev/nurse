import { Button, Col, Result, Row } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import TopBarSelectStation from '../components/TopBar/TopBarSelectStation';
import Messages from '../Messages';

function Error() {
    const intl = useIntl();
    const reloadButton = (
        <Button type="primary" onClick={() => {
            window.location.reload();
            return false;
        }}>
            <FormattedMessage {...Messages.Text_Button_Reload} />
        </Button>
    );

    return (
        <div>
            <TopBarSelectStation
                className="mt-header"
                title="" />
           <div className="mt-content">
                <Row style={{ marginTop: 64 }}>
                    <Col push={6} span={12}>
                        <Result
                            status="500"
                            title={intl.formatMessage(Messages.Text_ErrorMessage)}
                            subTitle={intl.formatMessage(Messages.Text_System_ErrorMessage_ServiceDiscovery)}
                            extra={reloadButton} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Error;
