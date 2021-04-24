import { Auth } from 'aws-amplify';
import axios from 'axios';
import { throwError } from './util/ApiUtils';
import { Actions } from './components/Store/Reducer';



const scStationPOST = async ({ apiPath, params, form, store: { vars, user }, dispatch, intl, setIsLoading, setError }) => {
    if (setError) setError(null);
    if (setIsLoading) setIsLoading(true);
    let result;
    // format parameters
    const postParams = new URLSearchParams();
    if (form !== undefined && form) {
        for (const [key, value] of Object.entries(form)) {
            postParams.append(key, value);
        }
    }

    try {
        const API_BASE = `https://${vars.SCStation.Hostname}`;
        const paramsUri = params === undefined ? '' : `?${params}`;
        const session = await Auth.currentSession();
        const jwt = session.getAccessToken().getJwtToken();

        const response = await fetch(`${API_BASE}${apiPath}${paramsUri}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: postParams
        });
        const json = await response.json();
        if (!json.success || json.errorCode) {
            if (json.errorCode === '001')  // expired token
                dispatch({ type: Actions.Logout, payload: null });
            throwError(json.errorCode, intl);
        }
        result = json.datas;
        if (setIsLoading) setIsLoading(false);
        return result ? result : true;
    } catch (error) {
        if (setError) setError(error.message);
        if (setIsLoading) setIsLoading(false);
    }
};

export const findBoxsBySCStationId = async ({ store, dispatch, intl, setIsLoading, setError }) => {
    const params = `scStationId=${store.scStation.scStationId}`;
    const apiPath = '/sc/api/box/findBoxsBySCStationId.do';
    return await scStationPOST({ apiPath, params, store, dispatch, intl, setIsLoading, setError });
}

// Update Box Pairing
export const boxUpdateBedNo = async ({ bedNo, boxId, store, dispatch, intl, setIsLoading, setError }) => {
    const params = `SCStationId=${store.scStation.scStationId}&boxId=${boxId}&bedNo=${bedNo}&loginUserId=${store.loginUserId}`;
    const apiPath = '/sc/api/box/updateBedNo.do';
    return await scStationPOST({ apiPath, params, store, dispatch, intl, setIsLoading, setError });
};

// Clear Box Pairing
export const boxRemove = async ({ boxId, store, dispatch, intl, setIsLoading, setError }) => {
    const params = `boxId=${boxId}&loginUserId=${store.loginUserId}`;
    const apiPath = '/sc/api/box/remove.do';
    return await scStationPOST({ apiPath, params, store, dispatch, intl, setIsLoading, setError });
};

// Find Patient
export const patientFindPatientByPatientSn = async ({ patientSn, store, dispatch, intl, setIsLoading, setError }) => {
    const params = `patientSn=${patientSn}`;
    const apiPath = '/sc/api/patient/findPatientByPatientSn.do';
    return await scStationPOST({ apiPath, params, store, dispatch, intl, setIsLoading, setError });
};

// Patient Checkin
export const patientCheckin = async ({ bedNo, boxSetting, store, dispatch, intl, setIsLoading, setError }) => {
    const form = {
        bedNo,
        ...boxSetting,
        loginUserId: store.loginUserId
    }
    const apiPath = '/sc/api/patient/checkin.do';
    return await scStationPOST({ apiPath, form, store, dispatch, intl, setIsLoading, setError });
};

// Patient Transfer
export const patientTransfer = async ({ bedNoFrom, bedNoTo, ehrBedUrn, ehrBedDisplay, boxSetting, store, dispatch, intl, setIsLoading, setError }) => {
    const form = {
        patientSn: boxSetting.patientSn,
        bedNoFrom,
        bedNoTo,
        volume: boxSetting.volume,
        led: boxSetting.led,
        language: boxSetting.language,
        sitUpAudio: boxSetting.sitUpAudio,
        padSide: boxSetting.padSide,
        alertOn: boxSetting.alertOn,
        stirring: boxSetting.stirring,
        sittingUp: boxSetting.sittingUp,
        leaving: boxSetting.leaving,
        reposition: boxSetting.reposition,
        timeToReposition: boxSetting.timeToReposition,
        loginUserId: store.loginUserId,
        ehrBedUrn,
        ehrBedDisplay,
    }
    const apiPath = '/sc/api/patient/changeBed.do';
    return await scStationPOST({ apiPath, form, store, dispatch, intl, setIsLoading, setError });
};

// Patient Checkout
export const patientCheckout = async ({ patientSn, store, dispatch, intl, setIsLoading, setError }) => {
    const params = `patientSn=${patientSn}&loginUserId=${store.loginUserId}`;
    const apiPath = '/sc/api/patient/checkout.do';
    return await scStationPOST({ apiPath, params, store, dispatch, intl, setIsLoading, setError });
};

// Find Box Settings
export const findBoxSettingByBoxId = async ({ boxId, store, dispatch, intl, setIsLoading, setError }) => {
    const form = {
        boxId: boxId
    };
    const apiPath = '/sc/api/box/findBoxSettingByBoxId.do';
    return await scStationPOST({ apiPath, form, store, dispatch, intl, setIsLoading, setError });
};

// get all box settings
export const findBoxSettingsBySCStationId = async ({ store, dispatch, intl, setIsLoading, setError }) => {
    const form = {
        scStationId: store.scStation.scStationId
    };
    const apiPath = '/sc/api/box/findBoxSettingsBySCStationId.do';
    return await scStationPOST({ apiPath, form, store, dispatch, intl, setIsLoading, setError });
};

// Update Box Settings
export const updateBoxSettings = async ({ boxSetting, store, dispatch, intl, setIsLoading, setError }) => {
    const form = {
        patientSn: boxSetting.patientSn,
        boxId: boxSetting.boxId,
        volume: boxSetting.volume,
        led: boxSetting.led,
        language: boxSetting.language,
        sitUpAudio: boxSetting.sitUpAudio,
        padSide: boxSetting.padSide,
        alertOn: boxSetting.alertOn,
        stirring: boxSetting.stirring,
        sittingUp: boxSetting.sittingUp,
        leaving: boxSetting.leaving,
        reposition: boxSetting.reposition,
        timeToReposition: boxSetting.timeToReposition,
        loginUserId: store.loginUserId,
    };
    const apiPath = '/sc/api/box/updateBoxSetting.do';
    return await scStationPOST({ apiPath, form, store, dispatch, intl, setIsLoading, setError });
};

// List SCStations
export const listStations = async ({ erpId, store, dispatch, intl, setIsLoading, setError }) => {
    const apiPath = '/sc/api/scStation/findSCStationsByErpId.do';
    const form = { erpid: erpId };
    return await scStationPOST({ apiPath, form, store, dispatch, intl, setIsLoading, setError });
};

// Set SCStation
export const setSCStation = async ({ scId, store, dispatch, intl, setIsLoading, setError }) => {
    const apiPath = '/sc/api/scStation/setSCStationId.do';
    const form = { scid: scId };
    return await scStationPOST({ apiPath, form, store, dispatch, intl, setIsLoading, setError });
};

// Find Boxes not assigned to a care unit
export const findBoxsNonCareUnit = async ({ store, dispatch, intl, setIsLoading, setError }) => {
    const apiPath = '/sc/api/box/findBoxsNonCareUnit.do';
    return await scStationPOST({ apiPath, store, dispatch, intl, setIsLoading, setError });
};

// Find Boxes not assigned to a care unit
export const assignBoxToStation = async ({ boxId, scStationId, store, dispatch, intl, setIsLoading, setError }) => {
    const params = `boxId=${boxId}&scstationId=${scStationId}&loginUserId=${store.loginUserId}`;
    const apiPath = '/sc/api/box/updateCareUnitByBoxId.do';
    return await scStationPOST({ apiPath, params, store, dispatch, intl, setIsLoading, setError });
};

// Find checked in Patient by Patient Id
export const findPatientByPatientId = async ({ patientId, store, dispatch, intl, setIsLoading, setError }) => {
    const form = { patientId };
    const apiPath = '/sc/api/patient/findPatient.do';
    return await scStationPOST({ apiPath, form, store, dispatch, intl, setIsLoading, setError });
};

export const findScBoxEventsByActivityState = async ({ patientSn, createDateStart, createDateEnd, store: { vars, user }, dispatch, intl, setIsLoading, setError }) => {
    const form = { patientSn, createDateStart, createDateEnd };
    const apiPath = '/sc/api/box/findScBoxEventsByActivityState.do';
    return await scStationPOST({ apiPath, form, store: { vars, user }, dispatch, intl, setIsLoading, setError });
};

export const findScBoxEventsBySensorLevel = async ({ patientSn, createDateStart, createDateEnd, store: { vars, user }, dispatch, intl, setIsLoading, setError }) => {
    const form = { patientSn, createDateStart, createDateEnd };
    const apiPath = '/sc/api/box/findScBoxEventsBySensorLevel.do';
    return await scStationPOST({ apiPath, form, store: { vars, user }, dispatch, intl, setIsLoading, setError });
};

export const findBoxEvents = async ({ patientSn, createDateStart, createDateEnd, store: { vars, user }, dispatch, intl, setIsLoading, setError }) => {
    const form = { patientSn, createDateStart, createDateEnd };
    const apiPath = '/sc/api/box/findBoxEvents.do';
    return await scStationPOST({ apiPath, form, store: { vars, user }, dispatch, intl, setIsLoading, setError });
};

export const findBoxSettingsByPatientSnAndCreationDate = async ({ patientSn, creationDate, store: { vars, user }, dispatch, intl, setIsLoading, setError }) => {
    const form = { patientSn, creationDate };
    const apiPath = '/sc/api/box/findBoxSettingsByPatientSnAndCreationDate.do';
    return await scStationPOST({ apiPath, form, store: { vars, user }, dispatch, intl, setIsLoading, setError });
};
