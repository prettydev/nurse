import '../../../App.scss';
import {Button} from 'antd';
import {FormattedMessage, useIntl} from "react-intl";
import Messages from '../../../Messages';
import React, {useContext, useEffect, useState} from 'react';
import SubPaneEditableTable from './SubPaneEditableTable';
import {
  getNameRow,
  getIdRow,
  getEmailRow,
  getChangePasswordButtonRow,
  getChangePasswordRows,
  getUserRoleRow,
  getExpirationDateRow,
  getCareUnitRow,
} from './accountDisplay';
import {authGetUserRole, authUpdatePassword, authUpdateUser} from "../../../AuthAPI";
import {StoreContext} from "../../Store/Store";

function AccountDetails({account: initialAccount}) {
  const intl = useIntl();
  const [editing, setEditing] = useState(false);
  const [store, dispatch] = useContext(StoreContext);
  const [editingPassword, setEditingPassword] = useState(false);
  const [error, setError] = useState(false);
  const [account, setAccount] = useState(initialAccount);

  useEffect(() => {
    if (account && account.role === undefined && !error) {
      (async () => {
        const { role } = await authGetUserRole({id: account.id, varsAuth: store.vars.Auth, intl});
        setAccount({
          role: role && role.name,
          ...account
        })
      })();
    }
  }, [account]);

  const onFinish = async (values) => {
    // Save new values.
    // Only change password if editingPassword is true.

    if (editingPassword) {
      authUpdatePassword({
          id: account.id,
          newPassword: values.newPassword,
          varsAuth: store.vars.Auth,
          dispatch,
          intl
        }).then(() => {
          setEditing(false);
          setEditingPassword(false)
      })
    } else {
      authUpdateUser({
        values: {
          ...account,
          ...values
        },
        varsAuth: store.vars.Auth,
        dispatch,
        intl
      }).then((user) => {
        setAccount({...user});
        setEditing(false);
        setEditingPassword(false);
      }).catch((err) => {
        setError(err)
      })
    }
  };

  let createdOn, updatedOn;
  if (account) {
    createdOn = account.createdOn && (new Date(account.createdOn)).toLocaleDateString();
    updatedOn = account.updatedOn && (new Date(account.updatedOn)).toLocaleDateString();
  }

  // show form elements based based on users intention
  // to edit the user, set the password, etc
  let rows;
  if (editingPassword) {
    rows = [
      getIdRow(account),
      ...account ? getChangePasswordRows(account, intl) : [],
    ]
  } else if (editing) {
    rows = [
      getNameRow(account),
      getIdRow(account),
      getEmailRow(account, intl),
      getUserRoleRow({account, accountRoles: store.roles}),
      getExpirationDateRow(account),
    ]
    if (store.vars.Auth.RoleSet === "taiwan") rows.push(getCareUnitRow(account, store.scStations))
  } else {
    rows = [
      getNameRow(account),
      getIdRow(account),
      getEmailRow(account, intl),
      getChangePasswordButtonRow({
        onClick: () => {
          setEditing(true);
          setEditingPassword(true);
        }
      }),
      getUserRoleRow({account, accountRoles: store.roles}),
      getExpirationDateRow(account),
    ]
    if (store.vars.Auth.RoleSet === "taiwan") rows.push(getCareUnitRow(account, store.scStations))
  }
  return (
    <div className="subpane">
      <h2 className="subpane-title">
          <span style={{marginRight: '32px'}}>
            {editing ? (
              <FormattedMessage {...Messages.Text_UserManagement_Detail_EditTitle} />
            ) : (
              <FormattedMessage {...Messages.Text_UserManagement_Detail_Title} />
            )}
          </span>
        <Button
          style={{
            display: editing ? 'none' : null,
            verticalAlign: 'text-bottom'
          }}
          onClick={() => setEditing(true)}
        >
          <FormattedMessage {...Messages.Text_UserManagement_Detail_EditTitle} />
        </Button>
      </h2>
      {account && account.role !== undefined ? <SubPaneEditableTable
        title={intl.formatMessage(Messages.Text_UserManagement_Detail_AccountInfo)}
        editing={editing}
        onFinish={onFinish}
        onCancel={() => {
          setAccount(initialAccount);
          setEditing(false);
          setEditingPassword(false);
        }}
        rows={rows}
      /> : null}
      {editing ? (
        null
      ) : (
        <SubPaneEditableTable
          title={intl.formatMessage(Messages.Text_UserManagement_Detail_UseHistory)}
          editing={false}
          rows={[
            {
              key: 'updatedOn',
              label: intl.formatMessage(Messages.Text_UserManagement_Detail_LastModify),
              value: updatedOn,
            },
            {
              key: 'createdOn',
              label: intl.formatMessage(Messages.Text_UserManagement_Detail_CreateDate),
              value: createdOn,
            }
          ]}
        />
      )}
    </div>
  );
};

export default AccountDetails;
