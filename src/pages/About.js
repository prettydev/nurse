import React, { useContext } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import TopBarMainMenu from '../components/TopBar/TopBarMainMenu';
import Messages from '../Messages';
import { Col, Row } from 'antd';
import { StoreContext } from '../components/Store/Store';
import './About.scss';

function About() {
    const intl = useIntl();
    const [store] = useContext(StoreContext);
    const version = store.vars && store.vars.Meta && store.vars.Meta.ReleaseVersion ? store.vars.Meta.ReleaseVersion : '';
    return (
        <div>
            <TopBarMainMenu
                title={intl.formatMessage(Messages.Text_More_About)}
                showBack={true} />
            <div className="mt-content">
                <Row style={{ marginTop: 64 }}>
                    <Col push={6} span={12}>
                        <h2 className="about-title"><FormattedMessage {...Messages.Text_About_Title} /></h2>
                        <h3><FormattedMessage {...Messages.Text_Abour_Company} /><br />
                            {version}</h3>
                        <div style={{ marginTop: 24 }}>
                            <FormattedMessage {...Messages.Text_Abour_Context} />
                        </div>
                        <div style={{ marginTop: 24 }}>
                            <FormattedMessage {...Messages.Text_Abour_SystemConfigurationTitle} /><br />
                            {intl.formatMessage(Messages.Text_Abour_SystemConfiguration).replace(' |', ': ').replace(';', ',').replace(' |', ': ')}
                        </div>
                        <div style={{ marginTop: 24 }}>
                            <FormattedMessage {...Messages.Text_Abour_OfficialWebsite} /><br />
                            <a href={intl.formatMessage(Messages.Text_Abour_OfficialWebsite_URL)} target="_blank" rel="noopener noreferrer"><FormattedMessage {...Messages.Text_Abour_OfficialWebsite_URL} /></a>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default About;
