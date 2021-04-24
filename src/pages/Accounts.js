import TopBarMainMenu, {Current} from '../components/TopBar/TopBarMainMenu';
import {SettingOutlined} from '@ant-design/icons';
import _orderBy from 'lodash/orderBy';
import {Button, Drawer, Grid, Popover, Space, Table} from 'antd';
import {FormattedMessage, useIntl} from "react-intl";
import {getDrawerWidth, lexicalSort} from '../util/AntUtil';
import Messages from '../Messages';
import React, {useContext, useEffect, useState} from 'react';
import AccountDetails from '../components/SubPanes/AccountSubPanes/AccountDetailSubPane';
import CreateAccount from '../components/SubPanes/AccountSubPanes/CreateAccountSubPane';
import {StoreContext} from "../components/Store/Store";

import {authGetUsers, authGetRoles} from "../AuthAPI";

const {useBreakpoint} = Grid;

function Accounts() {
  const intl = useIntl();
  const screens = useBreakpoint();
  const [store, dispatch] = useContext(StoreContext);
  const [showCreateAccountDrawer, setShowCreateAccountDrawer] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [accountsError, setAccountsError] = useState(null);
  const [account, setAccount] = useState(null);

  // accounts are in store
  // We use store to trigger re-render after the store is populated via
  // an API call to Cognito
  const accounts = store.accounts;
  const roles = store.roles;

  useEffect(() => {
    if (!accounts && accountsError === null) {
      (async () => {
        authGetUsers({varsAuth: store.vars.Auth, dispatch, intl, setError: setAccountsError});
      })();
    }
  }, []);

  useEffect(() => {
    if (!roles || roles.length === 0) {
      (async () => {authGetRoles({varsAuth: store.vars.Auth, dispatch, intl})})();
    }
  }, []);

  const columns = [
    {
      title: intl.formatMessage(Messages.Text_UserManagement_Account),
      dataIndex: 'id',
      sorter: (a, b) => lexicalSort(a, b, 'id'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage(Messages.Text_UserManagement_Name),
      dataIndex: 'name',
      sorter: (a, b) => lexicalSort(a, b, 'name'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: intl.formatMessage(Messages.Text_UserManagement_Email),
      dataIndex: 'email',
      sorter: (a, b) => lexicalSort(a, b, 'email'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '',
      key: 'details',
      render: account => (
        <Button
          type="link"
          onClick={(event) => {
            setAccount(account);
          }}
        >
          <FormattedMessage {...Messages.Text_UserManagement_Detail} />
        </Button>
      ),
    },
  ];

  const addAccountButton = (
    <Button
      key="addAccountButton"
      onClick={() => {
        setShowSettingsMenu(false);
        setShowCreateAccountDrawer(true);
      }}
    >
      <FormattedMessage {...Messages.Text_UserManagement_Detail_AddTitle} />
    </Button>
  );
  let headerButtons = [addAccountButton];
  if (!screens.lg && screens.md) {
    headerButtons = [
      <Popover
        key="settings"
        placement="bottom"
        content={<Space>{addAccountButton}</Space>}
        trigger="click"
        visible={showSettingsMenu}
        onVisibleChange={() => setShowSettingsMenu(!showSettingsMenu)}>
        <Button type="link"><SettingOutlined style={{fontSize: 24}}/></Button>
      </Popover>
    ];
  }

  const sortedAccounts = _orderBy(accounts, ['id'], ['asc']);
  return (
    <div>
      <TopBarMainMenu
        className="mt-header"
        title={intl.formatMessage(Messages.Text_UserManagement_Title)}
        showBack={true}
        current={Current.UserAccounts}
        buttons={headerButtons}
      />
      <div className="mt-content">
        <div className={!screens.sm ? null : 'content-detail-mt'}>
          <Table
            tableLayout='fixed'
            size='small'
            className="mt-list-table"
            dataSource={sortedAccounts}
            columns={columns}
            pagination={false}
            loading={accounts === null}
            rowKey='id'/>
          <Drawer
            placement="right"
            closable={true}
            onClose={() => setAccount(null)}
            visible={account !== null}
            width={getDrawerWidth(screens)}
            className="drawer-mt">
            {account ? <AccountDetails account={account}/> : null}
          </Drawer>
          <Drawer
            placement="right"
            closable={true}
            onClose={() => setShowCreateAccountDrawer(false)}
            visible={showCreateAccountDrawer}
            width={getDrawerWidth(screens)}
            className="drawer-mt">
            {showCreateAccountDrawer ? (
              <CreateAccount onClose={() => setShowCreateAccountDrawer(false)}/>
            ) : (
              null
            )}
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
