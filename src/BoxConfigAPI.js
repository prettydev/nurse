import { Auth } from 'aws-amplify';
import { Actions } from './components/Store/Reducer';
import Messages from './Messages';

const boxConfigAPI = async ({ api, method, params, body, store: { vars }, dispatch, intl, setIsLoading, setError }) => {
  if (setError) setError(null);
  if (setIsLoading) setIsLoading(true);

  try {
    const paramsUri = params === undefined ? '' : `?${params}`;
    const session = await Auth.currentSession();
    const jwt = session.getAccessToken().getJwtToken();
    const request = {
      method: method,

      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'UserPoolId': vars.Auth.CognitoUserPoolId,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',

    };
    if (body) {
      request.body = body;
    }
    const response = await fetch(`${api}${paramsUri}`, request);
    let json = null;
    try {
      json = await response.json();
    } catch (error) {
      // ignore empty
    }
    if (response.status && response.status >= 400) {
      if (response.status === 401) dispatch({ type: Actions.Logout, payload: null });
      if (response.status === 400 && json && json.service_error_code) {
        throwError(json.service_error_code, intl);
      } else {
        throw new Error(intl.formatMessage(Messages['Text_ErrorMessage']));
      }
    }
    if (setIsLoading) setIsLoading(false);
    return json ? json : true;
  } catch (error) {
    console.log(error);
    if (setError) setError(error.message);
    if (setIsLoading) setIsLoading(false);
  }
};

function throwError(errorCode, intl) {
  // Error codes defined in:
  // https://github.com/cognitohealth/Cloud/blob/master/src/services/box-config/box_config/exceptions.py
  if (errorCode && Messages[`Text_BoxConfigErrorMessage_${errorCode}`]) {
      throw new Error(intl.formatMessage(Messages[`Text_BoxConfigErrorMessage_${errorCode}`]))
  } else {
      throw new Error(intl.formatMessage(Messages['Text_ErrorMessage']));
  }
}


// Box Configurations
export const boxConfigGetBoxes = async ({ store, dispatch, intl, setIsLoading, setError }) => {
  const params = `Deployment=${store.vars.Meta.Deployment}`;
  const api = `https://${store.vars.BoxConfig.Hostname}/api/v1/boxes`;
  return await boxConfigAPI({ api, method: 'GET', params, store, dispatch, intl, setIsLoading, setError });
};

export const boxConfigSetBoxStatus = async ({ boxes, store, dispatch, intl, setIsLoading, setError }) => {
  const params = `Deployment=${store.vars.Meta.Deployment}`;
  const body = JSON.stringify({
    "Boxes": boxes
  });
  const api = `https://${store.vars.BoxConfig.Hostname}/api/v1/boxes`;
  return await boxConfigAPI({ api, method: 'PUT', body, params, store, dispatch, intl, setIsLoading, setError });
};

export const boxConfigDeleteBoxConfigurations = async ({ serialNumbers, store, dispatch, intl, setIsLoading, setError }) => {
  const params = `Deployment=${store.vars.Meta.Deployment}`;
  const body = JSON.stringify({
    "SerialNumbers": serialNumbers
  });
  const api = `https://${store.vars.BoxConfig.Hostname}/api/v1/boxes`;
  return await boxConfigAPI({ api, method: 'DELETE', body, params, store, dispatch, intl, setIsLoading, setError });
};

// Network Profiles
export const boxConfigGetNetworkProfiles = async ({ store, dispatch, intl, setIsLoading, setError }) => {
  const params = `Deployment=${store.vars.Meta.Deployment}`;
  const api = `https://${store.vars.BoxConfig.Hostname}/api/v1/network-profiles`;
  return await boxConfigAPI({ api, method: 'GET', params, store, dispatch, intl, setIsLoading, setError });
};

export const boxConfigGetNetworkProfile = async ({ profileId, store, dispatch, intl, setIsLoading, setError }) => {
  const params = `ProfileId=${profileId}`;
  const api = `https://${store.vars.BoxConfig.Hostname}/api/v1/network-profile`;
  return await boxConfigAPI({ api, method: 'GET', params, store, dispatch, intl, setIsLoading, setError });
};

export const boxConfigCreateNetworkProfile = async ({ networkProfile, store, dispatch, intl, setIsLoading, setError }) => {
  const params = ``;
  const body = JSON.stringify(networkProfile);
  const api = `https://${store.vars.BoxConfig.Hostname}/api/v1/network-profile`;
  return await boxConfigAPI({ api, method: 'POST', body, params, store, dispatch, intl, setIsLoading, setError });
};

export const boxConfigDeleteNetworkProfiles = async ({ networkProfileIds, store, dispatch, intl, setIsLoading, setError }) => {
  const params = `Deployment=${store.vars.Meta.Deployment}`;
  const body = JSON.stringify({
    "ProfileIds": networkProfileIds
  });
  const api = `https://${store.vars.BoxConfig.Hostname}/api/v1/network-profiles`;
  return await boxConfigAPI({ api, method: 'DELETE', body, params, store, dispatch, intl, setIsLoading, setError });
};