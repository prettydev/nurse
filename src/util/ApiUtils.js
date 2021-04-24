import { Actions } from '../components/Store/Reducer';
import Messages from '../Messages';
import { findBoxsBySCStationId, findBoxSettingsBySCStationId } from '../SCStationAPI';

export function throwError(errorCode, intl) {
    if (errorCode && Messages[`Text_ErrorMessage_${errorCode}`]) {
        throw new Error(intl.formatMessage(Messages[`Text_ErrorMessage_${errorCode}`]))
    } else {
        throw new Error(intl.formatMessage(Messages['Text_ErrorMessage']));
    }
}

export async function loadControlBoxesAndSettings({ store, dispatch, intl, setIsLoading, setError }) {
    if (!store || !store.scStation || !store.scStation.scStationId) return;
    const boxes = await findBoxsBySCStationId({ store, dispatch, intl, setIsLoading, setError });
    const settings = await findBoxSettingsBySCStationId({ store, dispatch, intl, setIsLoading, setError });
    if (boxes) {
        dispatch({ type: Actions.SetControlBoxes, payload: boxes });
    }
    if (settings) {
        dispatch({ type: Actions.SetBoxSettings, payload: settings });
    }
}
