import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Button, Space } from "antd";
import moment from 'moment';
import PropTypes from 'prop-types';
import React from "react";
import { Colors } from "../../util/Colors";

function DaySelector({ date, onDateChange }) {
    const maxDay = moment().startOf('day');
    const minDay = maxDay.clone().subtract(5, 'days');  // Show 7 days total
    return (
        <div>
            <Space>
                <Button type="link" disabled={date <= minDay} onClick={() => onDateChange(date.clone().subtract(1, 'days'))}>
                    <LeftCircleOutlined style={{ fontSize: 24 }} />
                </Button>
            </Space>
            <Space>
                <div style={{ color: Colors.Focus, fontSize: '18px', top: '-3px', position: 'relative' }}>{date.format('MMM. D')}</div>
            </Space>
            <Space>
                <Button type="link" disabled={date >= maxDay} onClick={() => onDateChange(date.clone().add(1, 'days'))}>
                    <RightCircleOutlined style={{ fontSize: 24 }} />
                </Button>
            </Space>
        </div>
    );
};

DaySelector.propTypes = {
    date: PropTypes.instanceOf(moment).isRequired,
    onDateChange: PropTypes.func.isRequired,
}


export default DaySelector;
