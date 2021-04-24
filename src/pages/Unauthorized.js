import { Button, Col, Result, Row } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import TopBarSelectStation from '../components/TopBar/TopBarSelectStation';
import Messages from '../Messages';
import { useHistory } from 'react-router-dom';

function Unauthorized() {
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
                            status="403"
                            title={intl.formatMessage(Messages.Text_Title_NotRole)}
                            subTitle={intl.formatMessage(Messages.Text_Common_NotRole)}
                            extra={homeButton} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Unauthorized;
