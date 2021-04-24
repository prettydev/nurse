import loadable from '@loadable/component';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';
import FullScreenLayout from './layouts/FullScreenLayout';
import Messages from './Messages';
import Login from './pages/Login';
import ErrorBoundary from './util/ErrorBoundary';
import { Groups } from './util/Groups';
import PrivateRoute from './util/PrivateRoute';
import { setupSoundsBasedOnUserInteraction } from './util/Sounds';

// Code Split components
const ResponsiveLayout = loadable(() => import('./layouts/ResponsiveLayout'));
const StationSelection = loadable(() => import('./pages/StationSelection'));
const Dashboard = loadable(() => import('./pages/Dashboard'));
const AlertSidebar = loadable(() => import('./components/Sidebars/AlertsSidebar'));
const BoxPairing = loadable(() => import('./pages/BoxPairing'));
const BoxConfiguration = loadable(() => import('./pages/BoxConfiguration'));
const PatientDetail = loadable(() => import('./pages/PatientDetail'));
const Help = loadable(() => import('./pages/Help'));
const About = loadable(() => import('./pages/About'));
const Accounts = loadable(() => import('./pages/Accounts'));
const NotFound = loadable(() => import('./pages/NotFound'));

const App = () => {
  const intl = useIntl();

  // Assure sounds can play
  useEffect(() => {
    try {
      setupSoundsBasedOnUserInteraction();
    } catch (error) {
      // just to be safe
    }
  }, []);

  useEffect(() => {
    window.onbeforeunload = function (evt) {
      // NOTE: nearly all modern browsers ignore this message now
      var message = intl.formatMessage(Messages.Text_SystemLogout_Message);
      if (typeof evt == 'undefined') {
        evt = window.event;
      }
      if (evt) {
        evt.returnValue = message;
      }
      return message;
    }
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <Switch>
          <PrivateRoute exact path="/">
            <FullScreenLayout children={<StationSelection />} />
          </PrivateRoute>
          <Route path="/login">
            <FullScreenLayout children={<Login />} />
          </Route>
          <PrivateRoute path="/dashboard" requireStation>
            <ResponsiveLayout sidebar={<AlertSidebar />} main={<Dashboard />} />
          </PrivateRoute>
          <PrivateRoute path="/patient/:patientSn" requireStation>
            <ResponsiveLayout sidebar={<AlertSidebar />} main={<PatientDetail />} />
          </PrivateRoute>
          <PrivateRoute path="/boxpairing" requireStation restrictTo="box_pairing">
            <ResponsiveLayout sidebar={<AlertSidebar />} main={<BoxPairing />} />
          </PrivateRoute>
          <PrivateRoute path="/boxconfig" requireStation restrictTo="box_config">
            <ResponsiveLayout sidebar={<AlertSidebar />} main={<BoxConfiguration />} />
          </PrivateRoute>
          <PrivateRoute path="/accounts" requireStation restrictTo="user_mgmt">
            <ResponsiveLayout sidebar={<AlertSidebar />} main={<Accounts />} />
          </PrivateRoute>
          <PrivateRoute path="/help/:helpId" requireStation>
            <ResponsiveLayout sidebar={<AlertSidebar />} main={<Help />} />
          </PrivateRoute>
          <PrivateRoute path="/help" requireStation>
            <ResponsiveLayout sidebar={<AlertSidebar />} main={<Help />} />
          </PrivateRoute>
          <PrivateRoute path="/about" requireStation>
            <ResponsiveLayout sidebar={<AlertSidebar />} main={<About />} />
          </PrivateRoute>

          <Route>
            <FullScreenLayout children={<NotFound />} />
          </Route>
        </Switch>
      </ErrorBoundary>
    </Router >
  );
};

export default App;
