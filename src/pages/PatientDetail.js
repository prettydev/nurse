import { SettingOutlined } from '@ant-design/icons';
import { Button, Grid, Popover, Space } from "antd";
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import { useParams } from 'react-router-dom';
import PatientHistory from '../components/Patient/PatientHistory';
import { StoreContext } from '../components/Store/Store';
import PatientCheckinSubPane from '../components/SubPanes/PatientCheckinSubPane/PatientCheckinSubPane';
import PatientCheckoutSubPane from '../components/SubPanes/PatientCheckoutSubPane/PatientCheckoutSubPane';
import PatientTransferSubPane from '../components/SubPanes/PatientTransferSubPane/PatientTransferSubPane';
import TopBarMainMenu from '../components/TopBar/TopBarMainMenu';
import Messages from '../Messages';
import { patientFindPatientByPatientSn } from '../SCStationAPI';
import { loadControlBoxesAndSettings } from '../util/ApiUtils';
import './PatientDetail.scss';
const { useBreakpoint } = Grid;

export default function PatientDetail() {
    const intl = useIntl();
    const screens = useBreakpoint();
    const { patientSn } = useParams();
    const [store, dispatch] = useContext(StoreContext);
    const [patient, setPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showCheckoutDrawer, setShowCheckoutDrawer] = useState(false);
    const [showTransferDrawer, setShowTransferDrawer] = useState(false);
    const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
    const [isSettingsMenuVisible, setIsSettingsMenuVisible] = useState(false);

    // load Patient
    useEffect(() => {
        if (patientSn && patient === null) {
            (async () => {
                await loadControlBoxesAndSettings({ store, dispatch, intl, setIsLoading, setError });
                setPatient(await patientFindPatientByPatientSn({ patientSn, store, dispatch, intl, setIsLoading, setError }))
            })();
        }
    }, [dispatch, intl, patient, patientSn, store]);

    const transferBtn = (
        <Button key='transferBtn' onClick={() => {
            setIsSettingsMenuVisible(false);
            setShowTransferDrawer(true);
        }} disabled={isLoading}><FormattedMessage {...Messages.Text_Patient_Transfer_Title} /></Button>
    );

    const checkoutBtn = (
        <Button key='checkoutBtn' onClick={() => {
            setIsSettingsMenuVisible(false);
            setShowCheckoutDrawer(true);
        }} disabled={isLoading}><FormattedMessage {...Messages.Text_Patient_CheckOut_Title} /></Button>
    );

    const settingsBtn = (
        <Button key='settingsBtn' onClick={() => {
            setIsSettingsMenuVisible(false);
            setShowSettingsDrawer(true);
        }} disabled={isLoading}><FormattedMessage {...Messages.Text_Help_Theme_6} /></Button>
    );

    let headerButtons = [];
    if (store.permissions.includes('patient_mgmt')) {
        headerButtons = [transferBtn, checkoutBtn];
    }
    headerButtons.push(settingsBtn);
    if (!screens.xxl && screens.md) {
        headerButtons = [
            <Popover
                key="popover"
                placement="bottom"
                content={<Space>{headerButtons}</Space>}
                trigger="click"
                visible={isSettingsMenuVisible}
                onVisibleChange={() => setIsSettingsMenuVisible(!isSettingsMenuVisible)} >
                <Button type="link"><SettingOutlined style={{ fontSize: 24 }} /></Button>
            </Popover>
        ];
    }

    const historyCmp = (
        <div style={{margin: '79px 12px 12px 12px', }}>
            <PatientHistory patientSn={patientSn} />
        </div>
    );

    let detail;
    let bedNo = '';
    let maskId = '';
    let boxId = null;
    if (patient) {
        if (store.patientSnToBox[patient.patientSn]) {
            boxId = store.patientSnToBox[patient.patientSn].boxId;
            bedNo = store.patientSnToBox[patient.patientSn].bedNo;
            maskId = patient.patientMaskId;
        }
        detail = (
            <div>
                {store.permissions.includes('patient_records') ? historyCmp : null}
                <PatientTransferSubPane patient={patient} isVisible={showTransferDrawer} onComplete={() => setShowTransferDrawer(false)} />
                <PatientCheckoutSubPane patient={patient} isVisible={showCheckoutDrawer} onComplete={() => setShowCheckoutDrawer(false)} />
                <PatientCheckinSubPane boxId={boxId} isUpdate isVisible={showSettingsDrawer} onComplete={() => setShowSettingsDrawer(false)} />
            </div>
        );
    }

    return (
        <>
            <TopBarMainMenu
                title={bedNo}
                titleSecond={maskId}
                showBack={true}
                buttons={headerButtons} />
            {detail}
        </>
    )
};
