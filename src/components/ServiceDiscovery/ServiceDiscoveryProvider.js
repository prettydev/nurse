import { Alert } from 'antd';
import Amplify from 'aws-amplify';
import React, { useContext, useEffect } from 'react';
import { useIntl } from "react-intl";
import FullScreenLayout from '../../layouts/FullScreenLayout';
import Messages from '../../Messages';
// import { loadVarsJson } from '../../SCStationAPI';
import Loading from '../Loading/Loading';
import { Actions } from '../Store/Reducer';
import { StoreContext } from '../Store/Store';
import AWS from 'aws-sdk';
import axios from "axios";
import {throwError} from "../../util/ApiUtils";

export const loadVarsJson = async ({ intl, setIsLoading, setError }) => {
  if (setError) setError(null);
  if (setIsLoading) setIsLoading(true);
  let result;
  try {
    const response = await axios(`/vars.json`);
    if (!response.data.SCStation) throwError(null, intl);
    result = response.data;
  } catch (error) {
    if (setError) setError(error.message);
  }
  if (setIsLoading) setIsLoading(false);
  return result;
};

const ServiceDiscoveryProvider = ({ children }) => {
    const storectx = useContext(StoreContext);
    const [store, dispatch] = storectx;
    const intl = useIntl();
    const configureAuth = (vars) => {

        // Set the region where identity pool exists
        AWS.config.region = vars.Meta.Region;

        // Configure the credentials provider to use your identity pool
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: vars.Auth.CognitoIdentityPoolId,
        });

        Amplify.configure({
            "aws_appsync_graphqlEndpoint": vars.Data.APIEndpoint,
            "aws_appsync_region": vars.Meta.Region,
            "aws_appsync_authenticationType": "API_KEY",
            "aws_appsync_apiKey": vars.Data.APIKey,
            Auth: {
                region: vars.Meta.Region,
                userPoolId: vars.Auth.CognitoUserPoolId,
                userPoolWebClientId: vars.Auth.CognitoWebUIClientId,
                identityPoolId: vars.Auth.CognitoIdentityPoolId,
                mandatorySignIn: false,
                // no expiration in cookie to force login after browser exit
                // cookieStorage: {
                //   domain: '.medicustek.io',
                //   path: '/',
                //   secure: true
                // },
            }
        });

        dispatch({ type: Actions.SetVars, payload: vars });
    };
    const setIsLoading = (isLoading) => dispatch({ type: Actions.SetVarsLoading, payload: isLoading });
    const setIsError = (error) => dispatch({ type: Actions.SetVarsError, payload: error });



    // load vars.json for service discovery
    useEffect(() => {
        (async () => configureAuth(await loadVarsJson({ store, dispatch, intl, setIsLoading, setIsError })))();
    }, []);

    let contents = children;
    if (store.vars === null || store.varsLoading) {
        contents = (
            <FullScreenLayout>
                <div></div>
            </FullScreenLayout>
        );
    }
    if (store.varsError) {
        contents = (
            <FullScreenLayout>
                <Alert message={intl.formatMessage(Messages.Text_System_ErrorMessage_ServiceDiscovery)} type='error' showIcon />
            </FullScreenLayout>
        );
    }
    return (
        <div>
            {contents}
        </div>
    )
};

export default ServiceDiscoveryProvider;
