import { CheckCircleFilled } from '@ant-design/icons';
import { Alert, Button, Col, Drawer, notification, Row, Select, Space } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from 'react-router-dom';
import '../../../App.scss';
import arrow from '../../../assets/img/diag-arrow.png';
import Messages from '../../../Messages';
import { patientTransfer } from '../../../SCStationAPI';
import { getDrawerWidth } from '../../../util/AntUtil';
import { loadControlBoxesAndSettings } from '../../../util/ApiUtils';
import { Colors } from '../../../util/Colors';
import { BoxEventType, BoxEventValue } from '../../Beds/BoxEvents';
import DataContext from '../../DataContext/DataContext';
import { StoreContext } from '../../Store/Store';

const { Option } = Select;

function PatientTransferSubPane({ patient, onComplete, isVisible }) {
    const intl = useIntl();
    let history = useHistory();
    const screens = useBreakpoint();
    const { boxEvents } = useContext(DataContext);
    const [store, dispatch] = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bedNoTo, setBedNoTo] = useState(store.patientTransfer && (store.patientTransfer.boxNoFrom)); // null otherwise

    const boxId = patient && store.patientSnToBox[patient.patientSn] ? store.patientSnToBox[patient.patientSn].boxId : null;
    useEffect(() => {
        loadControlBoxesAndSettings({ store, dispatch, intl, setIsLoading, setError });
    }, [patient]);

    const transfer = async () => {
        if (boxId) {
            const boxSetting = store.patientTransfer && store.patientTransfer.boxSetting ? store.patientTransfer.boxSetting : store.controlBoxIdToSettings[boxId];
            const bedNoFrom = patient.bedNo;
            const result = await patientTransfer({ bedNoFrom, bedNoTo, boxSetting, store, dispatch, intl, setIsLoading, setError });
            if (result) {
                onComplete();
                const bedToBed = intl.formatMessage(Messages.Text_Patient_Transfer_Bed).replace('XXXBed1', bedNoFrom).replace('XXXBed2', bedNoTo);
                notification.open({
                    message: intl.formatMessage(Messages.Text_Common_Success),
                    description: `${intl.formatMessage(Messages.Text_Patient_Transfer_OK)} ${bedToBed}`,
                    icon: <CheckCircleFilled style={{ color: Colors.Good }} />,
                    duration: 10,  // extra long for this one. 
                });
                history.push(`/dashboard`);
            }
        }
    };

    const availableBeds = [];
    if (store.boxEvents) {
        boxEvents.forEach(boxEvent => {
            if (boxEvent.Type === BoxEventType.PatientState && boxEvent.Value === BoxEventValue.NoCheckIn) {
                availableBeds.push(store.controlBoxIdToBox[boxEvent.BoxID]);
            }
        });
    }
    const isReadyToTransfer = !isLoading && availableBeds.length > 0 && boxId && store.controlBoxIdToSettings[boxId] && bedNoTo;

    return (
        <Drawer
            placement="right"
            closable={true}
            onClose={() => onComplete()}
            visible={isVisible}
            width={getDrawerWidth(screens)}
            className="drawer-mt">
            <div className="subpane">
                <h2 className="subpane-title">{intl.formatMessage(Messages.Text_Patient_Transfer_Title)}</h2>
                <h3 className="subpane-sec-title"><FormattedMessage {...Messages.Text_Patient_Transfer_Selected} /></h3>
                <Row className="mt-row">
                    <Col>
                        <FormattedMessage {...Messages.Text_Patient_Transfer_PatientNumber} /> <span className="mt-focus-text">{patient.patientMaskId}</span>
                    </Col>
                </Row>
                <Row className="mt-row">
                    <Col>
                        <h3><FormattedMessage {...Messages.Text_Patient_Transfer_NowBed} /></h3>
                        <div style={{ border: `2px solid ${Colors.UILine}`, padding: '3px 16px', fontSize: '20px', width: 150, textAlign: 'center' }}>
                            {patient.bedNo}
                        </div>
                    </Col>
                    <Col style={{ paddingTop: '29px' }}>
                        <img src={arrow} alt="to" />
                    </Col>
                    <Col style={{ width: '150px' }}>
                        <h3><FormattedMessage {...Messages.Text_Patient_Transfer_BookBed} /></h3>
                        {availableBeds.length > 0 ?
                            <div>
                                <Select
                                    size="large"
                                    showSearch
                                    style={{ width: 150 }}
                                    defaultValue={bedNoTo}
                                    placeholder={intl.formatMessage(Messages.Text_Patient_Transfer_BookBed)}
                                    optionFilterProp="children"
                                    onChange={setBedNoTo}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }>
                                    {availableBeds.map(box => <Option key={`toBed${box.bedNo}`} value={box.bedNo}>{box.bedNo}</Option>)}
                                </Select>
                            </div>
                            : <FormattedMessage {...Messages.Text_Patient_Transfer_NoBed} />
                        }
                    </Col>
                </Row>
                <Row className="mt-row">
                    <Col>
                        <Space>
                            <Button className="modal-button" htmlType="button" disabled={isLoading} onClick={() => onComplete()}>
                                <FormattedMessage {...Messages.Text_Button_Cancel} />
                            </Button>
                            <Button className="modal-button" type="primary" disabled={!isReadyToTransfer} onClick={() => transfer()}>
                                <FormattedMessage {...Messages.Text_Button_Transfer} />
                            </Button>
                        </Space>
                        {error ? <Alert message={error} type='error' showIcon style={{ marginTop: '24px' }} /> : null}
                    </Col>
                </Row>
            </div>
        </Drawer>
    );
};

PatientTransferSubPane.propTypes = {
    patient: PropTypes.shape({
        patientSn: PropTypes.string.isRequired,
        bedNo: PropTypes.string.isRequired,
        patientMaskId: PropTypes.string.isRequired,
    }).isRequired,
    onComplete: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
};

export default PatientTransferSubPane;