import {clearStationState, clearUserAndStationState} from './Store'
import {Auth} from 'aws-amplify';

const Actions = {
    SetVars: 'SetVars',
    SetVarsLoading: 'SetVarsLoading',
    SetUser: 'SetUser',
    SetBoxEvents: 'SetBoxEvents',
    UpdateBoxEvents: 'UpdateBoxEvents',
    SetCurrentPressure: 'SetCurrentPressure',
    UpdateCurrentPressure: 'UpdateCurrentPressure',
    SetSCStation: 'SetSCStation',
    SetSCStations: 'SetSCStations',
    SetControlBoxes: 'SetControlBoxes',
    SetBoxSettings: 'SetBoxSettings',
    Logout: 'Logout',
    SetCancelSubscriptions: 'SetCancelSubscriptions',
    SetDashboardView: 'SetDashboardView',
    SetPatientTransfer: 'SetPatientTransfer',
    SetDisconnected: 'SetDisconnected',
    SetAccounts: 'SetAccounts',
    SetAccount: 'SetAccount',
    SetAccountDetails: 'SetAccountDetails',  // {'account': 'the account', 'role': 'the role from cognito'}
    SetAccountDetailsAccount: 'SetAccountDetailsAccount',
    SetAccountDetailsRole: 'SetAccountDetailsRole',
    CreateOrUpdateAccount: 'CreateOrUpdateAccount',
    SetBoxConfigurations: 'SetBoxConfigurations',
    SetNetworkProfiles: 'SetNetworkProfiles',
    SetRoles: 'SetRoles',
};

// Add Actions here that simply map to setting a value in the store
// The value of entry is the key to set in the store.
const setValueActions = {
    [Actions.SetVars]: 'vars',
    [Actions.SetBoxEvents]: 'boxEvents',
    [Actions.SetCurrentPressure]: 'currentPressure',
    [Actions.SetVarsLoading]: 'varsLoading',
    [Actions.SetCancelSubscriptions]: 'cancelSubscriptions',
    [Actions.SetDashboardView]: 'dashboardView',
    [Actions.SetPatientTransfer]: 'patientTransfer',
    [Actions.SetDisconnected]: 'disconnected',
    [Actions.SetAccounts]: 'accounts',
    [Actions.SetAccountDetails]: 'accountDetails',
    [Actions.SetSCStations]: 'scStations',
    [Actions.SetRoles]: 'roles',
};

const Reducer = (state, action) => {
    if (Actions[action.type]) {
        // Process simple set-value Actions
        if (action.type in setValueActions) {
            return {
                ...state,
                [setValueActions[action.type]]: action.payload
            }
        }
        if (action.type === Actions.SetUser) {
            const user = action.payload;
            const sessionInfo = {};
            if (user.signInUserSession) {
                sessionInfo.loginUserId = user.signInUserSession.accessToken.payload.username;
                sessionInfo.careUnits = user.attributes['custom:care_units'] ? user.attributes['custom:care_units'].split(',') : ['default'];
                // set the permissions for the user based on groups in cognito:groups
                // each group in cognito:groups represents a permission that the user has
                // the possible values are the collective set of values of the group_name
                // field in https://github.com/cognitohealth/Cloud/pull/436/files#diff-7f683b47f08aa8d5679a632792702d010f490c9c1457cd91f1d22f5d2bb8ec36R28,
                // for example:
                //    https://github.com/cognitohealth/Cloud/pull/436/files#diff-7f683b47f08aa8d5679a632792702d010f490c9c1457cd91f1d22f5d2bb8ec36R31
                sessionInfo.permissions = user.signInUserSession.accessToken.payload['cognito:groups'] ? user.signInUserSession.accessToken.payload['cognito:groups'] : [];
            }
            return {
                ...state,
                user,
                ...sessionInfo,
            }
        }

        if (action.type == Actions.UpdateBoxEvents) {
            // action.payload is an event
            // update the event in the store for which there is a new event
            if (action.payload) {
                let boxEvents;
                const index = state.boxEvents.findIndex(event => event.boxId == action.payload.boxId);
                if (index === -1) {
                    boxEvents = state.boxEvents.concat(action.payload);
                } else {
                    boxEvents = [...state.boxEvents];
                    boxEvents[index] = action.payload;
                }
                return {
                    ...state,
                    boxEvents
                }
            }
            return;
        }

        if (action.type == Actions.UpdateCurrentPressure) {
            // action.payload is an event
            // update the event in the store for which there is a new event
            if (action.payload) {
                let currentPressure;
                const index = state.boxEvents.findIndex(pressureData => pressureData.boxId == action.payload.boxId);
                if (index === -1) {
                    currentPressure = state.currentPressure.concat(action.payload);
                } else {
                    currentPressure = [...state.currentPressure];
                    currentPressure[index] = action.payload;
                }
                return {
                    ...state,
                    currentPressure
                }
            }
            return;
        }

        if (action.type === Actions.SetControlBoxes) {
            // transform into map also
            const controlBoxIdToBox = {};
            const patientSnToBox = {};
            action.payload.forEach(box => {
                controlBoxIdToBox[box.boxId] = box;
                if (box.patientSn) patientSnToBox[box.patientSn] = box;
            });
            return {
                ...state,
                controlBoxes: action.payload,
                controlBoxIdToBox,
                patientSnToBox,
            }
        }
        if (action.type === Actions.SetBoxSettings) {
            // transform settings into map also
            const controlBoxIdToSettings = {};
            action.payload.forEach(boxSetting => {
                controlBoxIdToSettings[boxSetting.boxId] = boxSetting;
            });
            return {
                ...state,
                boxSettings: action.payload,
                controlBoxIdToSettings,
            }
        }
        if (action.type === Actions.SetSCStation) {
            action.payload.onActionComplete();
            return {
                ...state,
                ...clearStationState,
                scStation: action.payload.station,
            }
        }
        if (action.type === Actions.SetCareUnitAlerts) {
            action.payload.onActionComplete();
            return {
                ...state,
                ...clearStationState,
                scStation: action.payload.station,
            }
        }
        if (action.type === Actions.Logout) {
            (async () => await Auth.signOut())();
            return {
                ...state,
                ...clearUserAndStationState,
                closeSockets: true,
            }
        }
        if (action.type === Actions.SetAccount) {
            // must return a new array to cause the state update
            let accounts;
            if (action.payload) {
                const index = state.accounts.findIndex(account => account.id == action.payload.id);
                if (index === -1) {
                    accounts = state.accounts.concat(action.payload);
                } else {
                    accounts = [...state.accounts];
                    accounts[index] = action.payload;
                }
            }
            return {
                ...state,
                accounts
            }
        }
        if (action.type === Actions.SetBoxConfigurations) {
            if (action.payload && action.payload.Boxes) {
                return {
                    ...state,
                    boxConfigurations: action.payload.Boxes,
                };
            }
        }
        if (action.type === Actions.SetNetworkProfiles) {
            const map = {};
            if (action.payload && action.payload.NetworkProfiles) {
                action.payload.NetworkProfiles.forEach(profile => {
                    if (profile.ProfileId) map[profile.ProfileId] = profile;
                });
            }
            return {
                ...state,
                networkProfiles: action.payload.NetworkProfiles,
                networkProfilesById: map,
            }
        }
        throw new Error(`action type not handled: ${action.type}`)
    } else {
        console.log(`unknown action type: ${action.type}`)
    }
    // Other custom Action logic can go here.
    return state;
};
export {Actions};
export default Reducer;