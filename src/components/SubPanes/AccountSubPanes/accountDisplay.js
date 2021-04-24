import {Button, Checkbox, Input, Select, Popover} from 'antd';
import {Colors} from '../../../util/Colors';
import {FormattedMessage} from "react-intl";
import {LockOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import Messages from '../../../Messages';
import React from 'react';
import StringDatePicker from './StringDatePicker';

const {Option} = Select;

export function getNameRow(account) {
  return {
    key: 'name',
    label: <FormattedMessage {...Messages.Text_UserManagement_Detail_Name} />,
    value: account && account.name,
    editValue: <Input/>,
    rules: [
      {
        required: true,
        message: <FormattedMessage {...Messages.Text_ErrorMessage_E014} />,
      },
    ]
  };
}

export function getEmailRow(account, intl) {
  return {
    key: 'email',
    label: (
      <span>
        <span style={{marginRight: '5px'}}>
          <FormattedMessage {...Messages.Text_UserManagement_Detail_Email} />
        </span>
        <Popover
          placement="bottom"
          content={[
            <div>{intl.formatMessage(Messages.Text_UserManagement_EmailDesc1)}</div>,
            <div>{intl.formatMessage(Messages.Text_UserManagement_EmailDesc2)}</div>
          ]
          }
          trigger="hover"
        >
          <QuestionCircleOutlined style={{color: Colors.Focus}}/>
        </Popover>
      </span>
    ),
    value: account && account.email,
    editValue: <Input/>
  };
}


export function getIdRow(account) {
  return {
    key: 'id',
    label: <FormattedMessage {...Messages.Text_UserManagement_Detail_LoginAccount} />,
    value: account && account.id,
  };
}

export function getChangePasswordButtonRow({onClick}) {
  return {
    key: 'loginPassword',
    label: <FormattedMessage {...Messages.Text_UserManagement_Detail_LoginPWD} />,
    value: (
      <Button onClick={onClick}>
        <FormattedMessage {...Messages.Text_Button_Change} />
      </Button>
    )
  };
}

export function getChangePasswordRows(account, intl) {
  return [
    {
      key: 'newPassword',
      label: intl.formatMessage(Messages.Text_UserManagement_Detail_LoginPWD),
      editOnlyRow: true,
      editValue: (
        <Input
          prefix={<LockOutlined className="site-form-item-icon"/>}
          type="password"
          placeholder={intl.formatMessage(Messages.Text_UserSetting_NewPWD)}
        />
      ),
      rules: [
        {
          required: true,
          message: intl.formatMessage(Messages.Text_ErrorMessage_E006),
        },
        {min: 8, message: intl.formatMessage(Messages.Text_ErrorMessage_E004)},
      ],
    },
    {
      key: 'confirmPassword',
      label: intl.formatMessage(Messages.Text_UserManagement_Detail_ConfirmPassword),
      editOnlyRow: true,
      editValue: (
        <Input
          prefix={<LockOutlined className="site-form-item-icon"/>}
          type="password"
          placeholder={intl.formatMessage(Messages.Text_UserSetting_ConfirmNewPWD)}
        />
      ),
      rules: [
        {
          required: true,
          message: intl.formatMessage(Messages.Text_UserSetting_ConfirmNewPWD),
        },
        ({getFieldValue}) => ({
          validator(rule, value) {
            if (!value || getFieldValue('newPassword') === value) {
              return Promise.resolve();
            }
            return Promise.reject(intl.formatMessage(Messages.Text_ErrorMessage_E005));
          },
        }),
      ],
    },
    {
      key: 'changePasswordMessage',
      value: [
        intl.formatMessage(Messages.Text_UserManagement_Detail_Message1),
        intl.formatMessage(Messages.Text_UserManagement_Detail_Message2),
      ].join(' ')
    }
  ];
}

// export function getUnitRow(account) {
//   const careUnits = [
//     '1S',
//     '2S',
//     '3S',
//     '4S',
//     '5S',
//     '6S',
//   ];
//
//   return {
//     key: 'unit',
//     label: <FormattedMessage {...Messages.Text_UserManagement_Detail_NursingStation} />,
//     value: account.unit,
//     editValue: (
//       <Select>
//         {careUnits.map(careUnit => (
//           <Option key={careUnit} value={careUnit}>{careUnit}</Option>
//         ))}
//       </Select>
//     ),
//   };
// }

export function getUserRoleRow({account, accountRoles}) {
  return {
    key: 'role',
    label: (
      <span>
        <span style={{marginRight: '5px'}}>
          <FormattedMessage {...Messages.Text_UserManagement_Detail_AccountType} />
        </span>
        <Popover
          placement="bottom"
          content={
            accountRoles.map(role => (
              <dl>
                <dt>{role.name}</dt>
                <dd>{role.description}</dd>
              </dl>
            ))
          }
          trigger="hover"
        >
          <QuestionCircleOutlined style={{color: Colors.Focus}}/>
        </Popover>
      </span>
    ),
    rules: [
      {
        required: true,
        message: <FormattedMessage {...Messages.Text_ErrorMessage_E014} />,
      },
    ],
    value: account && account.role,
    editValue: (
      <Select value={account && account.role}>
        {accountRoles.map(role => (
          <Option key={role.name} value={role.name}>{role.name}</Option>
        ))}
      </Select>
    ),
  };
}

export function getExpirationDateRow(account) {
  return {
    key: 'expirationDate',
    label: <FormattedMessage {...Messages.Text_UserManagement_Detail_UsePeriod} />,
    value: account && account.expirationDate,
    rules: [
      {
        required: true,
        message: <FormattedMessage {...Messages.Text_ErrorMessage_E014} />,
      },
    ],
    editValue: <StringDatePicker format='YYYY-MM-DD'/>
  };
}

export function getCareUnitRow(account, stations, isNewAccount) {
  let careUnitsName = [];
  if (account.careUnits) {
    stations.map(station => { if (account.careUnits.includes(station.scStationId)) careUnitsName.push(station.scStationName) });
  };

  return {
    key: 'careUnits',
    label: <FormattedMessage {...Messages.Text_UserManagement_Detail_NursingStation} />,
    value: account && !isNewAccount ? account.careUnits : [],
    displayValue: careUnitsName.join(', '),
    rules: [
      {
        required: true,
        message: <FormattedMessage {...Messages.Text_ErrorMessage_E014} />,
      },
    ],
    editValue: (
      <Checkbox.Group>
        {stations.map(station => (
          <Checkbox
            key={`station${station.scStationId}`}
            value={station.scStationId}
            style={{marginLeft: '0px'}}
          >
            {station.scStationName}
          </Checkbox>
        ))}
      </Checkbox.Group>
    ),
  };
}
