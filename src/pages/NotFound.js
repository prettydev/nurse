import { Button, Col, Result, Row } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import TopBarSelectStation from '../components/TopBar/TopBarSelectStation';
import Messages from '../Messages';
import { useHistory } from 'react-router-dom';

function Error() {
    const intl = useIntl();
    const history = useHistory();
    const homeButton = (
        <Button type="primary" onClick={() => {
            history.push('/');
        }}>
            <FormattedMessage {...Messages.Text_Topbar_PageTitle_Back} />
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
                            status="404"
                            title={intl.formatMessage(Messages.Text_ErrorMessage_E017)}
                            subTitle={intl.formatMessage(Messages.Text_ErrorMessage_E018)}
                            extra={homeButton} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Error;
