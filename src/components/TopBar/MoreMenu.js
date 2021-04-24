import { Dropdown, Grid, Menu, } from "antd";
import { AreaChartOutlined, WifiOutlined } from "@ant-design/icons";
import React, { useContext, useState } from 'react';
import { Auth } from 'aws-amplify';
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory, useLocation } from "react-router-dom";

import aboutIcon from '../../assets/img/icon-about.png';
import helpIcon from '../../assets/img/icon-help.png';
import moreMenuIcon from '../../assets/img/icon-moremenu.png';
import langIcon from '../../assets/img/icon-lang-disable.png';
import Messages from "../../Messages";
import { StoreContext } from '../Store/Store';

import './TopBarMainMenu.scss';
import StationSettingsSubPane from "../SubPanes/StationSettingsSubPane/StationSettingsSubPane";


const { useBreakpoint } = Grid;


const MoreMenuItems = {
  Help: 'Help',
  About: 'About',
  Language: 'Language',
  Settings: 'Settings',
  KPIDashboard: 'KPIDashboard',
  BoxConfiguration: 'BoxConfiguration',
}
if (Object.freeze) Object.freeze(MoreMenuItems);

function MoreMenu() {
  const history = useHistory();
  const [store, dispatch] = useContext(StoreContext);
  const [current, setCurrent] = useState(false);
  const location = useLocation();
  const screens = useBreakpoint();
  const intl = useIntl();
  const [showSettings, setShowSettings] = useState(false);

  const click = key => {
    if (key.key === MoreMenuItems.Help) {
      history.push('/help');
    } else if (key.key === MoreMenuItems.About) {
      history.push('/about');
    } else if (key.key === MoreMenuItems.KPIDashboard) {
      // send the user to the KPI dashboard within this tab
      Auth.currentSession()
        .then(data => {
          const accessToken = data['accessToken']['jwtToken'];
          const dashboardHostname = store.vars['KPIDashboard']['Hostname'];
          window.open(`https://${dashboardHostname}/login?token=${accessToken}`, '_blank')
        })
        .catch(err => console.log(err));
    } else if (key.key === MoreMenuItems.Settings) {
      setShowSettings(true);
    } else if (key.keyPath[1] === MoreMenuItems.Language) {
      const query = new URLSearchParams(location.search);
      query.set('locale', key.key);
      history.push({
        ...location,
        search: query.toString()
      });
      window.location.reload();
    } else if (key.key === MoreMenuItems.BoxConfiguration) {
      history.push('/boxconfig');
    }
  };

  const langIconImg = (
    <img src={langIcon} alt={MoreMenuItems.Language} className="menu-icon" />
  );
  const menu = (
    <Menu onClick={click} style={{ width: 250 }} placement="bottomRight">
      <Menu.Item key={MoreMenuItems.Help}>
        <img src={helpIcon} alt={MoreMenuItems.Help} className="menu-icon" /><FormattedMessage {...Messages.Text_More_Help} />
      </Menu.Item>
      <Menu.Divider key="d1" />
      {store.permissions.includes('kpi') ?
        ([<Menu.Item key={MoreMenuItems.KPIDashboard}>
          <AreaChartOutlined style={{ fontSize: '24px', padding: '4px' }} />
          <FormattedMessage {...Messages.Text_KPI_Dashboard} />
        </Menu.Item>,
        <Menu.Divider key={`divider${MoreMenuItems.KPIDashboard}`} />
        ]) : null
      }
      <Menu.Item key={MoreMenuItems.About}>
        <img src={aboutIcon} alt={MoreMenuItems.About} className="menu-icon" /><FormattedMessage {...Messages.Text_More_About} />
      </Menu.Item>
      <Menu.Divider />
      <Menu.SubMenu
        key={MoreMenuItems.Language}
        icon={langIconImg}
        title={intl.formatMessage(Messages.Text_More_Language)}
      >
        <Menu.Item key='en-US'>
          <FormattedMessage {...Messages.Text_AlertMessage_Language_English} />
        </Menu.Item>
        <Menu.Item key='zh-TW'>
          <FormattedMessage {...Messages.Text_AlertMessage_Language_Chinese} />
        </Menu.Item>
      </Menu.SubMenu>
      
      { store.permissions.includes('box_config') && (
        <Menu.Item key={MoreMenuItems.BoxConfiguration}>
          <WifiOutlined style={{ fontSize: '24px', padding: '4px' }} />
          <FormattedMessage {...Messages.Text_Box_Configuration} />
        </Menu.Item>
      )}
    </Menu>
  );

  // TODO : add settings back in when there is more to it
  // <Menu.Divider />
  // <Menu.Item key={MoreMenuItems.Settings}>
  //   <img src={settingsIcon} alt={MoreMenuItems.Settings} className="menu-icon" /><FormattedMessage {...Messages.Text_Title_Setting} />
  // </Menu.Item>

  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']} size='large' placement="bottomRight" onVisibleChange={(visible) => setCurrent(visible)}>
        <div className={`main-menu-moremenu ${current ? 'main-menu-box-current' : ''}`} style={{ width: screens.xxl ? 48 : 36 }}>
          <img src={moreMenuIcon} alt='' />
        </div>
      </Dropdown>
      <StationSettingsSubPane isVisible={showSettings} onComplete={() => setShowSettings(false)} />
    </div>
  );
};

export default MoreMenu;
