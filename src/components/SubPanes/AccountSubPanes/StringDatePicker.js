import { DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';

function StringDatePicker({value, format, onChange = value => {}, ...props}) {
  const newProps = {
    ...props,
    value: value ? moment(value, format) : null,
    onChange: (date, dateString) => onChange(dateString)
  }
  return <DatePicker {...newProps} />
}

export default StringDatePicker;
