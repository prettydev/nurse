import { Card, Col, Divider, Result, Row, Slider } from "antd";
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import '../../App.scss';
import bodyBlackLarge from '../../assets/img/img-ptwin-bodyoutline-180-black.png';
import Messages from "../../Messages";
import { Colors } from "../../util/Colors";
import { ALarge, BedSize } from "../Beds/displayConstants";
import SensorDisplay from "../Beds/SensorDisplay";
import { StoreContext } from '../Store/Store';
import DaySelector from "./DaySelector";
import TimeSelector from "./TimeSelector";

const MARKS = {
    1440: { label: <span>24:00</span>, style: { color: Colors.Focus } },
    1320: { label: <span>22:00</span>, style: { color: Colors.Focus } },
    1200: { label: <span>20:00</span>, style: { color: Colors.Focus } },
    1080: { label: <span>18:00</span>, style: { color: Colors.Focus } },
    960: { label: <span>16:00</span>, style: { color: Colors.Focus } },
    840: { label: <span>14:00</span>, style: { color: Colors.Focus } },
    720: { label: <span>12:00</span>, style: { color: Colors.Focus } },
    600: { label: <span>10:00</span>, style: { color: Colors.Focus } },
    480: { label: <span>8:00</span>, style: { color: Colors.Focus } },
    360: { label: <span>6:00</span>, style: { color: Colors.Focus } },
    240: { label: <span>4:00</span>, style: { color: Colors.Focus } },
    120: { label: <span>2:00</span>, style: { color: Colors.Focus } },
    0: { label: <span>0:00</span>, style: { color: Colors.Focus } },
};

const sliderStyle = {
    height: '350px',
};

const pressureBoxStyle = {
    height: '20px',
    textAlign: 'center',
};

function PressureRecord({ sensorEventsByHourAndMinute, date, onDateChange }) {
    const intl = useIntl();
    const [store, dispatch] = useContext(StoreContext);
    const [viewTime, setViewTime] = useState(date.clone());
    const [error, setError] = useState();

    // update time when date changes
    useEffect(() => setViewTime(date.clone()), [date]);

    const sliderChange = (minutesFromMidnight) => setViewTime(date.clone().startOf('day').minutes(minutesFromMidnight));
    const onTimeChange = (date) => setViewTime(date);


    const hmm = getHoursMinutesSinceMidnight(viewTime);

    let data = null;
    if (sensorEventsByHourAndMinute[hmm.hour] && sensorEventsByHourAndMinute[hmm.hour][hmm.minute]) {
        try {
            const rawData = JSON.parse(sensorEventsByHourAndMinute[hmm.hour][hmm.minute].EventValue);
            data = (
                <div style={{ position: 'absolute', top: 88, left: 29 }}>
                    <SensorDisplay rawData={rawData} size={BedSize.Large} />
                </div>
            );
        } catch (error) {
            // do nothing if malformed
        }
    } else {
        data = (
            <div style={{ position: 'absolute', left: 14 }}>
                <Result
                    icon={<ClockCircleOutlined />}
                    title={intl.formatMessage(Messages.Text_PatientDetail_ActBlock_NoData)} />
            </div>
        );
    }
        
    // NOTE: to limit max slider you can use moment().diff(date, 'days') === 0 ? getMinutesFromTime(moment()): 1439;
    // but this causes the slider to adjust in height between today and previous days. Can't seem to control this.
    const maxSlider = 1439;

    return (
        <Card style={{ height: "100%" }} title={`${intl.formatMessage(Messages.Text_PatientDetail_PressureBlock_PRESSURE)} ${intl.formatMessage(Messages.Text_PatientDetail_PressureBlock_RECORDS)}`}>
            <Row style={{ height: "100%" }} justify="center">
                <Col span={18}>
                    <Row justify="center">
                        <Col>
                            <DaySelector date={date} onDateChange={onDateChange} />
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <TimeSelector date={viewTime} onTimeChange={onTimeChange} />
                        </Col>
                    </Row>
                    <Row style={{ height: 385 }} justify="center">
                        <Col>
                            <div>
                                {data}
                            </div>
                            <div>
                                <div>
                                    <img src={bodyBlackLarge} width={ALarge} alt="body" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={3} style={{ ...pressureBoxStyle, background: Colors.Over_1 }}> </Col>
                        <Col span={3} style={{ ...pressureBoxStyle, background: Colors.Over_5 }}> </Col>
                        <Col span={3} style={{ ...pressureBoxStyle, background: Colors.Over_10 }}> </Col>
                        <Col span={3} style={{ ...pressureBoxStyle, background: Colors.Over_30 }}> </Col>
                        <Col span={3} style={{ ...pressureBoxStyle, background: Colors.Over_60 }}> </Col>
                        <Col span={3} style={{ ...pressureBoxStyle, background: Colors.Over_90 }}> </Col>
                        <Col span={4} style={{ ...pressureBoxStyle, background: Colors.Over_120 }}> </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={3} style={pressureBoxStyle}>1</Col>
                        <Col span={3} style={pressureBoxStyle}>5</Col>
                        <Col span={3} style={pressureBoxStyle}>10</Col>
                        <Col span={3} style={pressureBoxStyle}>30</Col>
                        <Col span={3} style={pressureBoxStyle}>60</Col>
                        <Col span={3} style={pressureBoxStyle}>90</Col>
                        <Col span={4} style={pressureBoxStyle}>120</Col>
                    </Row>
                    <Row justify="center">
                        <Divider className="mt-divider-horizontal" />
                        <FormattedMessage {...Messages.Text_PatientDetail_PressureBlock_Bottom_Minutes} />
                    </Row>
                </Col>
                <Col flex="auto" style={sliderStyle}>
                    <Slider height={350} vertical reverse value={getMinutesFromTime(viewTime)} marks={MARKS} min={0} max={maxSlider} tooltipVisible={false} onChange={sliderChange} />
                </Col>
            </Row>
        </Card>
    );

    function getHoursMinutesSinceMidnight(when) {
        var midnight = when.clone().startOf('day');
        return {
            hour: when.diff(midnight, 'hours'),
            minute: when.minutes(),
        }
    }

    function getHoursMinutesFromMinutes(minutesSinceMidnight) {
        const hour = Math.round(minutesSinceMidnight / 60);
        return {
            hour,
            minute: minutesSinceMidnight - (60 * hour),
        }
    }

    function getMinutesFromTime(viewTime) {
        var hmm = getHoursMinutesSinceMidnight(viewTime);
        return hmm.hour * 60 + hmm.minute;
    }
};

PressureRecord.propTypes = {
    patientSn: PropTypes.string.isRequired,
    sensorEventsByHourAndMinute: PropTypes.object.isRequired,
    date: PropTypes.instanceOf(moment).isRequired,
    onDateChange: PropTypes.func.isRequired,
}


export default PressureRecord;
