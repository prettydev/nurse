import { Alert, Button } from 'antd';
import { Auth } from 'aws-amplify';
import React, { useContext, useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory, useLocation } from "react-router-dom";
import MTLogo from '../assets/logo.svg';
import ForgotPassword from '../components/Login/ForgotPassword';
import LoginForm from '../components/Login/LoginForm';
import SetPassword from '../components/Login/SetPassword';
import { Actions } from '../components/Store/Reducer';
import { StoreContext } from '../components/Store/Store';
import Messages from '../Messages';
import './Login.scss';


Auth.configure({
    storage: sessionStorage,
});

const WorkflowState = {
    ForgotPassword: 'ForgotPassword',
    ForgotPasswordSubmit: 'ForgotPasswordSubmit',
    CompleteNewPassword: 'ForceNewPassword',
    PasswordChangedLogin: 'PasswordChangedLogin',
}
if (Object.freeze) { Object.freeze(WorkflowState) };

const Login = () => {
    const intl = useIntl();
    const [store, dispatch] = useContext(StoreContext);
    const [workflow, setWorkflow] = useState(null);
    const [email, setEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [checkedExistingLogin, setCheckedExistingLogin] = useState(false);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (checkedExistingLogin) {
            if (store.user) loginComplete(location, history);
        } else {
            (async () => {
                try {
                    const user = await Auth.currentAuthenticatedUser();
                    dispatch({ type: Actions.SetUser, payload: user });
                } catch {
                    // no existing user login
                }
                setCheckedExistingLogin(true);
            })();
        }
    }, [checkedExistingLogin]);

    let form = null;
    let topMessage = null;
    if (workflow === WorkflowState.ForgotPassword) {
        topMessage = <FormattedMessage {...Messages.Text_ForgotPassword_Title} />;
        form = <ForgotPassword
            onReset={({ email }) => forgotPassword({ email, setWorkflow, setEmail, setIsLoading, setError, intl })}
            isLoading={isLoading}
            error={error} />;
    } else if (workflow === WorkflowState.ForgotPasswordSubmit) {
        topMessage = <FormattedMessage {...Messages.Text_ChangePassword_CodeSent} />;
        form = <SetPassword
            onSetPassword={({ email, code, newPassword }) => forgotPasswordSubmit({ email, code, newPassword, setWorkflow, setIsLoading, setError, intl })}
            email={email}
            requireCode={true}
            isLoading={isLoading}
            error={error} />;
    } else if (workflow === WorkflowState.CompleteNewPassword) {
        topMessage = <FormattedMessage {...Messages.Text_ChangePassword_Message} />;
        form = <SetPassword
            onSetPassword={({ newPassword }) => completeNewPassword({ user: store.user, newPassword, setWorkflow, setIsLoading, setError, intl })}
            requireCode={false}
            isLoading={isLoading}
            error={error} />;
    } else if (workflow === WorkflowState.PasswordChangedLogin) {
        form = <LoginForm
            onLogin={({ username, password }) => signIn({ username, password, setWorkflow, setIsLoading, setError, dispatch, intl, history, location })}
            onForgotPassword={() => setWorkflow(WorkflowState.ForgotPassword)}
            isLoading={isLoading}
            error={error} />;
    } else {
        if (checkedExistingLogin) {
            if (!store.user) {
                form = <LoginForm
                    onLogin={({ username, password }) => signIn({ username, password, setWorkflow, setIsLoading, setError, dispatch, intl, history, location })}
                    onForgotPassword={() => setWorkflow(WorkflowState.ForgotPassword)}
                    isLoading={isLoading}
                    error={error} />;
            }
        }
    }

    return (
        <div className="login-container">
            <div className="login-lang">
                {/* <SelectLang /> */}
            </div>
            <div className="login-content">
                <div className="login-top">
                    <div className="login-header">
                        <div className="login-logo login-header" >
                            <Button onClick={() => setWorkflow(null)} type="link">
                                <img src={MTLogo} alt='' width={300} height={133} />
                            </Button>
                        </div>
                        {topMessage ? <div className="login-desc">{topMessage}</div> : null}
                    </div>
                </div>
                <div className="login-main">
                    {form}
                    {workflow === WorkflowState.PasswordChangedLogin ? <Alert message={intl.formatMessage(Messages.Text_ChangePassword_ConfirmOK)} type="success" showIcon /> : null}
                </div>
            </div>
        </div>
    );
};

export default Login;



// Amplify Cognito SDK calls
async function forgotPassword({ email, setWorkflow, setEmail, setIsLoading, setError, intl }) {
    setEmail(email);
    setIsLoading(true);
    setError(null);
    try {
        await Auth.forgotPassword(email);
        setWorkflow(WorkflowState.ForgotPasswordSubmit);
    } catch (error) {
        setError(intl.formatMessage(Messages.Text_ErrorMessage_E011));
        setWorkflow(null);
    }
    setIsLoading(false);
}

async function forgotPasswordSubmit({ email, code, newPassword, setWorkflow, setIsLoading, setError, intl }) {
    setIsLoading(true);
    setError(null);
    try {
        await Auth.forgotPasswordSubmit(email, code, newPassword);
        setWorkflow(WorkflowState.PasswordChangedLogin);
    } catch (error) {
        setError(intl.formatMessage(Messages.Text_ErrorMessage_E011));
        setWorkflow(null);
    }
    setIsLoading(false);
}

async function completeNewPassword({ user, newPassword, setWorkflow, setIsLoading, setError, intl }) {
    setIsLoading(true);
    setError(null);
    try {
        await Auth.completeNewPassword(user, newPassword);
        setWorkflow(WorkflowState.PasswordChangedLogin);
    } catch (error) {
        if (error && error.code === 'NotAuthorizedException') setError(intl.formatMessage(Messages.Text_ErrorMessage_E020));
        else setError(intl.formatMessage(Messages.Text_ErrorMessage_E011));
        setWorkflow(null);
    }
    setIsLoading(false);
}

async function signIn({ username, password, setWorkflow, setIsLoading, setError, dispatch, intl, history, location }) {
    setIsLoading(true);
    setError(null);
    try {
        const user = await Auth.signIn(username, password);
        setIsLoading(false);
        dispatch({ type: Actions.SetUser, payload: user });
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            setWorkflow(WorkflowState.CompleteNewPassword);
        } else {
            loginComplete(location, history);
        }
    } catch (error) {
        if (error && error.code === 'PasswordResetRequiredException') setWorkflow(WorkflowState.ForgotPassword);
        else setError(intl.formatMessage(Messages.Text_ErrorMessage_101));
    }
    setIsLoading(false);
}

function loginComplete(location, history) {
    // redirect to previous state or root
    const { from } = location.state || { from: { pathname: "/" } };
    history.replace(from);
}