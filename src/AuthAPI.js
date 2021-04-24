import { Auth } from 'aws-amplify';
import { Actions } from './components/Store/Reducer';
import Messages from './Messages';

const authAPI = async ({ api, method, params, body, varsAuth, dispatch, intl, setIsLoading, setError }) => {
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
        'UserPoolId': varsAuth.CognitoUserPoolId,
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
  // https://github.com/cognitohealth/Cloud/blob/master/src/services/auth/auth/exceptions.py
  if (errorCode && Messages[`Text_AuthErrorMessage_${errorCode}`]) {
    throw new Error(intl.formatMessage(Messages[`Text_AuthErrorMessage_${errorCode}`]))
  } else {
    throw new Error(intl.formatMessage(Messages['Text_ErrorMessage']));
  }
}


// Roles
export const authGetRoles = async ({ varsAuth, dispatch, intl, setIsLoading, setError }) => {
  const api = `https://${varsAuth.Hostname}/api/v1/roles`;
  return await authAPI({ api, method: 'GET', varsAuth, dispatch, intl, setIsLoading, setError }).then(data => {
    if(data) dispatch({type: Actions.SetRoles, payload: data.roles})
  });
};

// Users
export const authGetUsers = async({ varsAuth, dispatch, intl, setIsLoading, setError}) => {
  const api = `https://${varsAuth.Hostname}/api/v1/users`;
  return await authAPI({ api, method: 'GET', varsAuth, dispatch, intl, setIsLoading, setError }).then(data => {
    if(data) dispatch({type: Actions.SetAccounts, payload: data.users})
  });
};

export const authCreateUser = async({ values, varsAuth, dispatch, intl, setIsLoading, setError}) => {
  const body = JSON.stringify({
    "user": values
  });
  const api = `https://${varsAuth.Hostname}/api/v1/users`;
  return await authAPI({ api, method: 'POST', body, varsAuth, dispatch, intl, setIsLoading, setError }).then(data => {
    if(data) dispatch({type: Actions.SetAccount, payload: data.user})
    return data
  });
};

export const authUpdateUser = async({ values, varsAuth, dispatch, intl, setIsLoading, setError}) => {
  const params = `id=${values.id}`;
  const body = JSON.stringify({
    "user": values
  });
  const api = `https://${varsAuth.Hostname}/api/v1/users`;
  return await authAPI({ api, method: 'POST', params, body, varsAuth, dispatch, intl, setIsLoading, setError }).then(() => {
    dispatch({type: Actions.SetAccount, payload: values});
    return values
  });
};

export const authGetUserRole = async({ id, varsAuth, dispatch, intl, setIsLoading, setError}) => {
  const params = `id=${id}`;
  const api = `https://${varsAuth.Hostname}/api/v1/userRole`;
  return await authAPI({ api, method: 'GET', params, varsAuth, dispatch, intl, setIsLoading, setError });
};

// Password mgmt
export const authUpdatePassword = async({ id, newPassword, varsAuth, dispatch, intl, setIsLoading, setError}) => {
  const params = `id=${id}`;
  const body = JSON.stringify({password: newPassword});
  const api = `https://${varsAuth.Hostname}/api/v1/userPassword`;
  return await authAPI({ api, method: 'PUT', params, body, varsAuth, dispatch, intl, setIsLoading, setError });
};


