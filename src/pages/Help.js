import { Button, Carousel, Col, message, Row, Steps, Pagination } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';
import En_1_1_DashboardOverview_GridView from '../assets/img/En/En_1-1_DashboardOverview_GridView.png';
import En_1_2_DashboardOverview_ListView from '../assets/img/En/En_1-2_DashboardOverview_ListView.png';
import En_1_DashboardOverview from '../assets/img/En/En_1_DashboardOverview.png';
import En_2_1_AddaNewPatient from '../assets/img/En/En_2-1_AddaNewPatient.png';
import En_2_AddingPatients from '../assets/img/En/En_2_AddingPatients.png';
import En_3_1_PatientCheck_out from '../assets/img/En/En_3-1_PatientCheck-out.png';
import En_3_RemovingPatients from '../assets/img/En/En_3_RemovingPatients.png';
import En_4_1_BoxManagement from '../assets/img/En/En_4-1_BoxManagement.png';
import En_4_ManagingControlBoxes from '../assets/img/En/En_4_ManagingControlBoxes.png';
import En_5_1_TransferringPatientsTransfer from '../assets/img/En/En_5-1_TransferringPatientsTransfer.png';
import En_5_2_TransferringPatientsCheck_in from '../assets/img/En/En_5-2_TransferringPatientsCheck-in.png';
import En_5_TransferringPatients from '../assets/img/En/En_5_TransferringPatients.png';
import En_6_1_PatientSettings from '../assets/img/En/En_6-1_PatientSettings.png';
import En_6_PatientSettings from '../assets/img/En/En_6_PatientSettings.png';
import En_7_1_ManagingUserAccounts_Add from '../assets/img/En/En_7-1_ManagingUserAccounts_Add.png';
import En_7_2_ManagingUserAccounts_Edit from '../assets/img/En/En_7-2_ManagingUserAccounts_Edit.png';
import En_7_ManagingUserAccounts from '../assets/img/En/En_7_ManagingUserAccounts.png';
import En_8_1_ChangePassword from '../assets/img/En/En_8-1_ChangerPassword_Usersetting.png';
import En_8_2_ChangePassword from '../assets/img/En/En_8-2_ChangePassword_temporary.png';
import En_8_ChangePassword from '../assets/img/En/En_8_NewUserPassword.png';
import Zh_1_1_DashboardOverview_GridView from '../assets/img/Zh/Zh_1-1_DashboardOverview_GridView.png';
import Zh_1_2_DashboardOverview_ListView from '../assets/img/Zh/Zh_1-2_DashboardOverview_ListView.png';
import Zh_1_DashboardOverview from '../assets/img/Zh/Zh_1_DashboardOverview.png';
import Zh_2_1_AddaNewPatient from '../assets/img/Zh/Zh_2-1_AddaNewPatient.png';
import Zh_2_AddingPatients from '../assets/img/Zh/Zh_2_AddingPatients.png';
import Zh_3_1_PatientCheck_out from '../assets/img/Zh/Zh_3-1_PatientCheck-out.png';
import Zh_3_RemovingPatients from '../assets/img/Zh/Zh_3_RemovingPatients.png';
import Zh_4_1_BoxManagement from '../assets/img/Zh/Zh_4-1_BoxManagement.png';
import Zh_4_ManagingControlBoxes from '../assets/img/Zh/Zh_4_ManagingControlBoxes.png';
import Zh_5_1_TransferringPatientsTransfer from '../assets/img/Zh/Zh_5-1_TransferringPatientsTransfer.png';
import Zh_5_2_TransferringPatientsCheck_in from '../assets/img/Zh/Zh_5-2_TransferringPatientsCheck-in.png';
import Zh_5_TransferringPatients from '../assets/img/Zh/Zh_5_TransferringPatients.png';
import Zh_6_1_PatientSettings from '../assets/img/Zh/Zh_6-1_PatientSettings.png';
import Zh_6_PatientSettings from '../assets/img/Zh/Zh_6_PatientSettings.png';
import Zh_7_1_ManagingUserAccounts_Add from '../assets/img/Zh/Zh_7-1_ManagingUserAccounts_Add.png';
import Zh_7_2_ManagingUserAccounts_Edit from '../assets/img/Zh/Zh_7-2_ManagingUserAccounts_Edit.png';
import Zh_7_ManagingUserAccounts from '../assets/img/Zh/Zh_7_ManagingUserAccounts.png';
import Zh_8_1_ChangePassword from '../assets/img/Zh/Zh_8-1_ChangerPassword_Usersetting.png';
import Zh_8_2_ChangePassword from '../assets/img/Zh/Zh_8-2_ChangePassword_temporary.png';
import Zh_8_ChangePassword from '../assets/img/Zh/Zh_8_NewUserPassword.png';
import TopBarMainMenu from '../components/TopBar/TopBarMainMenu';
import Messages from '../Messages';
import './Help.scss';
const { Step } = Steps;

const contentStyle = { marginTop: 24, marginLeft: 32 };

function Help() {
    const intl = useIntl();
    const { helpId } = useParams();
    const history = useHistory();
    const [current, setCurrent] = useState(0);
    const helpIdStyle = { margin: '16px' };
    const helpIdWidth = 320;
    let content;
    let details = [];

    const gotoHelp = (id) => {
        setCurrent(0);
        history.push(`/help/${id}`);
    };

    if (intl.locale === 'zh-TW') {
        if (helpId === '1') details = [Zh_1_1_DashboardOverview_GridView, Zh_1_2_DashboardOverview_ListView];
        else if (helpId === '2') details = [Zh_2_1_AddaNewPatient];
        else if (helpId === '3') details = [Zh_3_1_PatientCheck_out];
        else if (helpId === '4') details = [Zh_4_1_BoxManagement];
        else if (helpId === '5') details = [Zh_5_1_TransferringPatientsTransfer, Zh_5_2_TransferringPatientsCheck_in];
        else if (helpId === '6') details = [Zh_6_1_PatientSettings];
        else if (helpId === '7') details = [Zh_7_1_ManagingUserAccounts_Add, Zh_7_2_ManagingUserAccounts_Edit];
        else if (helpId === '8') details = [Zh_8_1_ChangePassword, Zh_8_2_ChangePassword];
        else {
            content = (
                <>
                    <h2 style={{ fontSize: '28px', fontWeight: '200', ...contentStyle }}><FormattedMessage {...Messages.Text_Help_Theme} /></h2>
                    <Row>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(1)}>
                                <img width={helpIdWidth} src={Zh_1_DashboardOverview} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(2)}>
                                <img width={helpIdWidth} src={Zh_2_AddingPatients} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(3)}>
                                <img width={helpIdWidth} src={Zh_3_RemovingPatients} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(4)}>
                                <img width={helpIdWidth} src={Zh_4_ManagingControlBoxes} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(5)}>
                                <img width={helpIdWidth} src={Zh_5_TransferringPatients} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(6)}>
                                <img width={helpIdWidth} src={Zh_6_PatientSettings} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(7)}>
                                <img width={helpIdWidth} src={Zh_7_ManagingUserAccounts} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(8)}>
                                <img width={helpIdWidth} src={Zh_8_ChangePassword} alt='' />
                            </div>
                        </Col>
                    </Row>
                </>
            );
        }
    }
    else {
        if (helpId === '1') details = [En_1_1_DashboardOverview_GridView, En_1_2_DashboardOverview_ListView];
        else if (helpId === '2') details = [En_2_1_AddaNewPatient];
        else if (helpId === '3') details = [En_3_1_PatientCheck_out];
        else if (helpId === '4') details = [En_4_1_BoxManagement];
        else if (helpId === '5') details = [En_5_1_TransferringPatientsTransfer, En_5_2_TransferringPatientsCheck_in];
        else if (helpId === '6') details = [En_6_1_PatientSettings];
        else if (helpId === '7') details = [En_7_1_ManagingUserAccounts_Add, En_7_2_ManagingUserAccounts_Edit];
        else if (helpId === '8') details = [En_8_1_ChangePassword, En_8_2_ChangePassword];
        else {
            content = (
                <>
                    <h2 style={{ fontSize: '28px', fontWeight: '200', ...contentStyle }}><FormattedMessage {...Messages.Text_Help_Theme} /></h2>
                    <Row>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(1)}>
                                <img width={helpIdWidth} src={En_1_DashboardOverview} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(2)}>
                                <img width={helpIdWidth} src={En_2_AddingPatients} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(3)}>
                                <img width={helpIdWidth} src={En_3_RemovingPatients} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(4)}>
                                <img width={helpIdWidth} src={En_4_ManagingControlBoxes} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(5)}>
                                <img width={helpIdWidth} src={En_5_TransferringPatients} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(6)}>
                                <img width={helpIdWidth} src={En_6_PatientSettings} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(7)}>
                                <img width={helpIdWidth} src={En_7_ManagingUserAccounts} alt='' />
                            </div>
                        </Col>
                        <Col className={helpIdStyle}>
                            <div className="help-topic" onClick={() => gotoHelp(8)}>
                                <img width={helpIdWidth} src={En_8_ChangePassword} alt='' />
                            </div>
                        </Col>
                    </Row>
                </>
            );
        }
    }
    if (details.length > 0) {
        content = (
            <div style={contentStyle}>
                <div>
                    <Pagination defaultPageSize={1} defaultCurrent={current + 1} total={details.length} onChange={page => setCurrent(page - 1)} />
                </div>
                <div><img style={{ maxWidth: '100%' }} src={details[current]} alt='' /></div>
            </div>
        );
    }
    return (
        <div>
            <TopBarMainMenu
                title={intl.formatMessage(Messages.Text_Help_Title)}
                showBack={true}
                isBackHistory={helpId > 0} />
            <div className="mt-content">
                {content}
            </div>
        </div>
    );
}

export default Help;
