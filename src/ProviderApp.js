import React, { Component } from 'react';
import { IntlProvider } from "react-intl";
import App from "./App";
import ServiceDiscoveryProvider from './components/ServiceDiscovery/ServiceDiscoveryProvider';
import SocketProvider from "./components/DataContext/DataProvider";
import Store from './components/Store/Store';
import translations from "./i18n/locales";

class ProviderApp extends Component {
  render() {

    // Intl based on https://medium.com/@shalkam/create-react-app-i18n-the-easy-way-b05536c594cb
    // get locale from navigator language, with override via locale url parameter 
    let locale = navigator.language || 'en-US';
    locale = window.location.search.replace("?locale=", "") || locale;
    const messages = translations[locale];
    return (
      <Store>
        <IntlProvider locale={locale} key={locale} messages={messages}>
          <ServiceDiscoveryProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </ServiceDiscoveryProvider>
        </IntlProvider>
      </Store>
    );
  }
}

export default ProviderApp;