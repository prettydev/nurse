import React, {createContext, useReducer, useEffect} from "react";
import Reducer, {Actions} from './Reducer'

export const clearStationState = {
    boxEvents: [],
    currentPressure: [],
    scStation: null,
    scStationError: null,
    controlBoxes: null,
    controlBoxIdToBox: {},
    patientSnToBox: {},
    controlBoxesError: null,
    boxSettings: null,
    controlBoxIdToSettings: {},
    dashboardView: null,  // { tab, sortBy, viewStyle, searchFilter }
    patientTransfer: null,
    disconnected: null,
    boxConfigurations: null,
    networkProfiles: null,
    networkProfilesById: null,
};

export const clearUserAndStationState = {
    ...clearStationState,
    loginUserId: null,  // Also known as "AccountName" or the user field on login.
    user: null,
    userTokenError: null,
    roles: [],
    permissions: [], // set directly from cognito:groups at login
    scStations: [],
    careUnits: [],
};

const initialState = {
    vars: null,
    varsLoading: false,
    varsError: null,
    cancelSubscriptions: false,
    ...clearUserAndStationState,
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {children}
        </StoreContext.Provider>
    )
};

export const StoreContext = createContext(initialState);
export default Store;
