import { CheckCircleFilled } from '@ant-design/icons';
import { Alert, Button, Col, Drawer, notification, Row, Space } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from 'react-router-dom';
import '../../../App.scss';
import Messages from '../../../Messages';
import { patientCheckout } from '../../../SCStationAPI';
import { getDrawerWidth } from '../../../util/AntUtil';
import { Colors } from '../../../util/Colors';
import { StoreContext } from '../../Store/Store';
import './PatientCheckoutSubPane.scss';


function PatientCheckoutSubPane({ patient, onComplete, isVisible }) {
    const intl = useIntl();
    let history = useHistory();
    const screens = useBreakpoint();
    const [store, dispatch] = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const checkout = async () => {
        const result = await patientCheckout({ patientSn: patient.patientSn, store, dispatch, intl, setIsLoading, setError });
        if (result) {
            onComplete();
            notification.open({
                message: intl.formatMessage(Messages.Text_Common_Success),
                description: intl.formatMessage(Messages.Text_ErrorMessage_913),
                icon: <CheckCircleFilled style={{ color: Colors.Good }} />,
            });            
            history.push(`/dashboard`);
        }
    };

    return (
        <Drawer
            placement="right"
            closable={true}
            onClose={() => onComplete()}
            visible={isVisible}
            width={getDrawerWidth(screens)}
            className="drawer-mt">
            <div className="subpane">
                <h2 className="subpane-title">{intl.formatMessage(Messages.Text_Patient_CheckOut_Title)}</h2>
                <h3 className="subpane-sec-title"><FormattedMessage {...Messages.Text_Patient_CheckOut_Message} /></h3>
                <Row className="mt-row">
                    <Col>
                        <FormattedMessage {...Messages.Text_Patient_CheckOut_PatientBedNo} />: <span className="mt-focus-text">{patient.bedNo}</span>
                    </Col>
                </Row>
                <Row className="mt-row-content">
                    <Col>
                        <FormattedMessage {...Messages.Text_Patient_CheckOut_PatientNumber} />: <span className="mt-focus-text">{patient.patientMaskId}</span>
                    </Col>
                </Row>
                <Row className="mt-row">
                    <Col>
                        <Space>
                            <Button className="modal-button" htmlType="button" disabled={isLoading} onClick={() => onComplete()}>
                                <FormattedMessage {...Messages.Text_Button_Cancel} />
                            </Button>
                            <Button className="modal-button" type="primary" disabled={isLoading} onClick={() => checkout()}>
                                <FormattedMessage {...Messages.Text_Button_Patient_Logout} />
                            </Button>
                        </Space>
                        {error ? <Alert message={error} type='error' showIcon /> : null}
                    </Col>
                </Row>
            </div>
        </Drawer>
    );
};

PatientCheckoutSubPane.propTypes = {
    patient: PropTypes.shape({
        patientSn: PropTypes.string.isRequired,
        bedNo: PropTypes.string.isRequired,
        patientMaskId: PropTypes.string.isRequired,
    }).isRequired,
    onComplete: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
};

export default PatientCheckoutSubPane;