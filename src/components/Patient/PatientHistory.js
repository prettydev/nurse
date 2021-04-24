import ActivityRecord from './ActivityRecord';
import {
    calculateActivityData,
    calculateTotalActivityPercentages,
    calculateEventData
} from './calculatePatientHistory';
import { Col, Row } from "antd";
import EventRecord from './EventRecord';
import {
    findScBoxEventsByActivityState,
    findScBoxEventsBySensorLevel,
    findBoxEvents,
    findBoxSettingsByPatientSnAndCreationDate,
} from '../../SCStationAPI';
import Last24Hours from './Last24Hours';
import moment from 'moment';
import "./PatientHistory.scss";
import PressureRecord from './PressureRecord';
import React, { useContext, useState, useEffect, useMemo } from "react";
import { StoreContext } from '../Store/Store';
import { useIntl } from 'react-intl';
import Loading from '../Loading/Loading';


const PatientHistory = function PatientHistory({ patientSn }) {
    // Activity data
    const [selectedDate, setSelectedDate] = useState(moment());
    const [isLoading, setIsLoading] = useState(false);
    const {
        boxEventsByActivityState = [],
        boxEventsBySensorLevel = [],
    } = useActivityData(patientSn, selectedDate, setIsLoading);
    const [activityData, totalActivityPercentages, activityEventsByHourAndMinute, sensorEventsByHourAndMinute] = useMemo(() => {
        if (selectedDate) {
            const [activityData, activityEventsByHourAndMinute, sensorEventsByHourAndMinute] = calculateActivityData(
                selectedDate,
                boxEventsByActivityState,
                boxEventsBySensorLevel,
            );
            return [activityData, calculateTotalActivityPercentages(activityData), activityEventsByHourAndMinute, sensorEventsByHourAndMinute];
        } else {
            return [[], []];
        }
    }, [selectedDate, boxEventsByActivityState, boxEventsBySensorLevel])

    // Event data

    const {
        boxEvents = [],
        boxSettings = [],
    } = useEventData(patientSn, selectedDate);
    const eventData = useMemo(() => {
        if (selectedDate) {
            return calculateEventData(
                selectedDate,
                boxEvents,
                boxSettings,
            );
        } else {
            return {};
        }
    }, [boxEvents, boxSettings, selectedDate]);

    return (
        <Row className="patient-history" justify="center" gutter={[8, 8]} >
            <Col flex="auto" xl={16} xs={24} >
                <Row gutter={[8, 8]} >
                    <Col flex="auto" md={18} xs={24} >
                        <ActivityRecord
                            date={selectedDate}
                            onDateChange={setSelectedDate}
                            activityData={activityData}
                        />
                    </Col>
                    <Col flex="auto" md={6} xs={24} >
                        <Last24Hours
                            totalActivityPercentages={totalActivityPercentages}
                        />
                    </Col>
                </Row>
                <Row gutter={[8, 0]} >
                    <Col flex="auto" xs={24} >
                        <EventRecord
                            date={selectedDate}
                            onDateChange={setSelectedDate}
                            eventData={eventData}
                        />
                    </Col>
                </Row>
            </Col>
            <Col flex="auto" xl={8} xs={24}>
                <PressureRecord
                    patientSn={patientSn}
                    date={selectedDate.subtract(1, 'minutes')}
                    sensorEventsByHourAndMinute={sensorEventsByHourAndMinute}
                    onDateChange={setSelectedDate}
                />
            </Col>
            {isLoading && (
                <div style={{ position: 'absolute', top: '91px' }}>
                    <Loading />
                </div>
            )}
        </Row>
    );
};

function useActivityData(patientSn, activityDate, setIsLoading) {
    const [store, dispatch] = useContext(StoreContext);
    const intl = useIntl();
    const [data, setData] = useState({
        boxEventsByActivityState: [],
        boxEventsBySensorLevel: [],
    });

    useEffect(() => {
        if (activityDate) {
            setIsLoading(true);
            const createDateStart = (
                activityDate.clone().subtract(1, 'days').utc().format('YYYY-MM-DD')
            );
            const createDateEnd = (
                activityDate.clone().add(1, 'days').utc().format('YYYY-MM-DD')
            );
            Promise.all([
                findScBoxEventsByActivityState({
                    patientSn,
                    createDateStart,
                    createDateEnd,
                    store: { vars: store.vars, user: store.user },
                    dispatch,
                    intl,
                }),
                findScBoxEventsBySensorLevel({
                    patientSn,
                    createDateStart,
                    createDateEnd,
                    store: { vars: store.vars, user: store.user },
                    dispatch,
                    intl,
                })
            ]).then(([boxEventsByActivityState, boxEventsBySensorLevel]) => {
                if (boxEventsByActivityState && boxEventsBySensorLevel) {
                    setData({ boxEventsByActivityState, boxEventsBySensorLevel });
                }
                setIsLoading(false)
            });
        }
    }, [activityDate, dispatch, intl, patientSn, store.user, store.vars]);

    return {
        boxEventsByActivityState: data.boxEventsByActivityState,
        boxEventsBySensorLevel: data.boxEventsBySensorLevel,
    };
};

function useEventData(patientSn, selectedDate) {
    const [store, dispatch] = useContext(StoreContext);
    const intl = useIntl();
    const [data, setData] = useState({
        boxEvents: [],
        boxSettings: [],
    });

    useEffect(() => {
        if (selectedDate) {
            const createDateStart = (
                selectedDate.clone().subtract(1, 'days').utc().format('YYYY-MM-DD')
            );
            const createDateEnd = (
                selectedDate.clone().add(1, 'days').utc().format('YYYY-MM-DD')
            );
            Promise.all([
                findBoxEvents({
                    patientSn,
                    createDateStart,
                    createDateEnd,
                    store: { vars: store.vars, user: store.user },
                    dispatch,
                    intl,
                }),
                findBoxSettingsByPatientSnAndCreationDate({
                    patientSn,
                    creationDate: selectedDate.clone().utc().format('YYYY-MM-DD'),
                    store: { vars: store.vars, user: store.user },
                    dispatch,
                    intl,
                })
            ]).then(([boxEvents, boxSettings]) => {
                if (boxEvents && boxSettings) {
                    setData({ boxEvents, boxSettings });
                }
            });
        }
    }, [dispatch, selectedDate, intl, patientSn, store.user, store.vars]);

    return {
        boxEvents: data.boxEvents,
        boxSettings: data.boxSettings,
    };

};

export default PatientHistory;
