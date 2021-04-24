import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space } from "antd";
import moment from 'moment';
import PropTypes from 'prop-types';
import React from "react";
import { Colors } from "../../util/Colors";

function TimeSelector({ date, onTimeChange }) {
    const minTime = date.clone().startOf('day');
    const maxTime = date.clone().endOf('day').subtract(1, 'minutes');
    return (
        <div>
            <Space>
                <Button type="link" disabled={date <= minTime} onClick={() => onTimeChange(date.clone().subtract(1, 'minutes'))}>
                    <MinusOutlined style={{ fontSize: 20 }} />
                </Button>
            </Space>
            <Space>
                <div style={{ color: Colors.Focus, fontSize: '24px', fontWeight: '500', top: '1px', position: 'relative' }}>{date.format('HH:mm')}</div>
            </Space>
            <Space>
                <Button type="link" disabled={date >= maxTime} onClick={() => onTimeChange(date.clone().add(1, 'minutes'))}>
                    <PlusOutlined style={{ fontSize: 20 }} />
                </Button>
            </Space>
        </div>
    );
};

TimeSelector.propTypes = {
    date: PropTypes.instanceOf(moment).isRequired,
    onTimeChange: PropTypes.func.isRequired,
}


export default TimeSelector;
