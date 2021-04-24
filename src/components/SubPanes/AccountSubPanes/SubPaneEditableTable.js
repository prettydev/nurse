import { Button, Form } from 'antd';
import { FormattedMessage } from "react-intl";
import Messages from '../../../Messages';
import React from 'react';

function SubPaneEditableTable({
  title,
  rows,
  editing,
  onFinish=() => {},
  onCancel=() => {},
  saveButtonMessage=<FormattedMessage {...Messages.Text_Button_Updated} />,
}) {
  const tableRows = rows.map(row => {
    if (!editing && row.editOnlyRow || !row) {
      return null
    } else {
      return (
        <tr key={row.key} className="subpane-compact-item">
          <td className="subpane-label-col">{row.label}</td>
          <td className="subpane-value-col">
            {editing && row.editValue ? (
              <Form.Item
                name={row.key}
                rules={row.rules}
                style={{margin: 0}}
              >
                {row.editValue}
              </Form.Item>
            ) : (
              (row.key !== 'careUnits') ? row.value : row.displayValue
            )}
          </td>
        </tr>
      );
    }
  });
  const buttons = (
    <tr key="buttons" className="subpane-compact-item">
      <td className="subpane-label-col"></td>
      <td className="subpane-value-col">
        <Form.Item>
          <Button
            htmlType="button"
            onClick={onCancel}
            style={{marginTop: '10px', marginRight: '10px'}}
          >
            <FormattedMessage {...Messages.Text_Button_Cancel} />
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            style={{marginTop: '10px'}}
          >
            {saveButtonMessage}
          </Button>
        </Form.Item>
      </td>
    </tr>
  );

return (
    <>
    {title ?
      <h3 className="subpane-sec-title">{title}</h3>
      : null}
    <Form
      initialValues={Object.fromEntries(rows.map(row => ([row.key, row.value])))}
      onFinish={onFinish}
    >
      <table style={{width: '100%'}}>
        <tbody>
          {tableRows}
          {editing ? buttons : null}
        </tbody>
      </table>
    </Form>
    </>
  );
}

export default SubPaneEditableTable;
