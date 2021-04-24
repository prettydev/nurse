import { Col, Grid, Row } from 'antd';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import patientMonitoring from '../../assets/patientMonitoring.png';
import Messages from '../../Messages';
import {StoreContext} from '../Store/Store';
import './BedNotificationsEmpty.scss';
const { useBreakpoint } = Grid;

const BedNotificationsEmpty = () => {
    const screens = useBreakpoint();
    const [store, dispatch] = useContext(StoreContext);
    let bedsInUse = 0;
    store.boxEvents.forEach(boxEvent => {
        if (boxEvent.patientId !== null && boxEvent.patientId !== '') bedsInUse++;
    });


    return (
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            <Row justify="center">
                <Col xs={{ order: 2 }} md={{ order: 1 }} style={{ margin: screens.xl ? '48px 100px' : '48px 24px' }}>
                    <img src={patientMonitoring} alt='Monitoring'></img>
                </Col>
                <Col xs={{ order: 1 }} md={{ order: 2 }} style={{ margin: '48px 24px' }}>
                    <Row>
                        <Col className="bigstat">0</Col>
                    </Row>
                    <Row>
                        <Col style={{ fontSize: 20 }}>
                            <FormattedMessage {...Messages.Text_Dashboard_Tab_Notifications} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="bigstat">{bedsInUse}</Col>
                    </Row>
                    <Row>
                        <Col style={{ fontSize: 20 }}>
                            <FormattedMessage {...Messages.Text_Dashboard_Text_PatientsMonitored} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

BedNotificationsEmpty.propTypes = {};

export default BedNotificationsEmpty;
