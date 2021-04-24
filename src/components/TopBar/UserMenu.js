import { Dropdown, Grid, Menu } from "antd";
import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import userConfigIcon from '../../assets/img/icon-user-config.png';
import logoutIcon from '../../assets/img/icon-user-logout.png';
import userActiveIcon from '../../assets/img/icon-useractive.png';
import Messages from "../../Messages";
import './TopBarMainMenu.scss';
import UserSettingsSubPane from "../SubPanes/UserSettingsSubPane/UserSettingsSubPane";
import { Auth } from 'aws-amplify';
import { StoreContext } from "../Store/Store";
import { Actions } from "../Store/Reducer";
const { useBreakpoint } = Grid;

const ATTRIBUTE_FIRST_NAME = 'custom:custom:first_name';
const ATTRIBUTE_LAST_NAME = 'custom:custom:last_name';


const UserMenuItems = {
  Settings: 'Settings',
  Logout: 'Logout',
}
if (Object.freeze) Object.freeze(UserMenuItems);

function UserMenu({ menuBoxStyle, menuBoxIconStyle }) {
  const history = useHistory();
  const screens = useBreakpoint();
  const [store, dispatch] = useContext(StoreContext);
  const [current, setCurrent] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        // Auth.updateUserAttributes(user, { ATTRIBUTE_FIRST_NAME: 'Dave', ATTRIBUTE_LAST_NAME: 'Burdick' });
        if(username === null) setUsername(user.username);
        return Auth.userAttributes(user);
      })
      .then(data => {
        if (data) {
          let firstName = null;
          let lastName = null;
          data.forEach(attr => {
            if (attr.Name === ATTRIBUTE_FIRST_NAME) firstName = attr.Value;
            if (attr.Name === ATTRIBUTE_LAST_NAME) lastName = attr.Value;
          });
          const name = `${firstName || ''} ${lastName || ''}`.trim();
          if(name !== '') setUsername(name);
        }
      })
      .catch(err => { });
  }, []);

  const click = async key => {
    if (key.key === UserMenuItems.Settings) {
      setShowUserSettings(true);
    } else if (key.key === UserMenuItems.Logout) {
      dispatch({ type: Actions.Logout, payload: null })
      history.push('/');
    }
  };

  const menu = (
    <Menu onClick={click} style={{ width: 250 }} placement="bottomRight">
      <Menu.Item key={UserMenuItems.Settings}>
        <img src={userConfigIcon} alt={UserMenuItems.Help} className="menu-icon" /><FormattedMessage {...Messages.Text_PauLine_UserSettings} />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key={UserMenuItems.Logout}>
        <img src={logoutIcon} alt={UserMenuItems.Logout} className="menu-icon" /><FormattedMessage {...Messages.Text_PauLine_UserLogout} />
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']} size='large' placement="bottomRight" onVisibleChange={(visible) => setCurrent(visible)}>
        <div className={`main-menu-box ${current ? 'main-menu-box-current' : ''}`} style={menuBoxStyle}>
          <div style={menuBoxIconStyle}><img src={userActiveIcon} alt='' /></div>
          { screens.xl ? <div className="main-menu-box-text">{username}</div> : null }
        </div>
      </Dropdown>
      <UserSettingsSubPane onComplete={() => setShowUserSettings(false)} isVisible={showUserSettings} />
    </div>
  );
};

UserMenu.defaultProps = {
  menuBoxStyle: {
    width: 112
  },
  menuBoxIconStyle: {
    paddingTop: '10px'
  }
}

UserMenu.propTypes = {  
  menuBoxStyle: PropTypes.object,
  menuBoxIconStyle: PropTypes.object,
}

export default UserMenu;
