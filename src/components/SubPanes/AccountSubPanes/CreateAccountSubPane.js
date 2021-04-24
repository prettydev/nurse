import '../../../App.scss';
import {FormattedMessage, useIntl} from "react-intl";
import {Input, Alert} from 'antd';
import Messages from '../../../Messages';
import React, {useContext, useState} from 'react';
import SubPaneEditableTable from './SubPaneEditableTable';
import {
  getNameRow,
  getIdRow,
  getEmailRow,
  getChangePasswordRows,
  // getUnitRow,
  getUserRoleRow,
  getExpirationDateRow,
  getCareUnitRow,
} from './accountDisplay';
import {authCreateUser} from "../../../AuthAPI";
import {StoreContext} from "../../Store/Store";


function AccountCreate({onClose}) {
  const intl = useIntl();
  const [store, dispatch] = useContext(StoreContext);
  const [authError, setAuthError] = useState(null);
  const accountDetails = {};


  const onSubmit = (values) => {
    authCreateUser({values, varsAuth: store.vars.Auth, dispatch, intl, setError: setAuthError}
    ).then((data) => {
      if(data) onClose();
    });
  };

  let createAcountRows = [
    getNameRow(accountDetails),
    {
      ...getIdRow(accountDetails),
      editValue: <Input/>,
      rules: [
        {
          required: true,
          message: <FormattedMessage {...Messages.Text_ErrorMessage_E014} />,
        },
        {
          pattern: new RegExp(/^[a-zA-Z0-9_-]*$/),
          message: <FormattedMessage {...Messages.Text_AuthErrorMessage_12} />,
        },
      ]
    },
    getEmailRow(accountDetails, intl),
    ...getChangePasswordRows(accountDetails, intl),
    getUserRoleRow({accountDetails, accountRoles: store.roles}),
    getExpirationDateRow(accountDetails),
  ]
  if (store.vars.Auth.RoleSet === "taiwan") createAcountRows.push(getCareUnitRow(accountDetails, store.scStations, true))

  return (
    <div className="subpane">
      <h2 className="subpane-title">
        <span style={{marginRight: '32px'}}>
          <FormattedMessage {...Messages.Text_UserManagement_Detail_AddTitle} />
        </span>
      </h2>
      <SubPaneEditableTable
        title={intl.formatMessage(Messages.Text_UserManagement_Detail_AccountInfo)}
        editing={true}
        saveButtonMessage={intl.formatMessage(Messages.Text_Button_Add)}
        onFinish={onSubmit}
        onCancel={onClose}
        rows={createAcountRows}
      />
      {authError && (<Alert message={authError} type='error' showIcon style={{marginTop: '24px', marginBottom: '24px'}}/>)}
    </div>
  );
}

export default AccountCreate;
