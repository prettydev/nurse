import _countBy from 'lodash/countBy';
import _every from 'lodash/every';
import _filter from 'lodash/filter';
import _findLast from 'lodash/findLast';
import _flow from 'lodash/flow'
import _groupBy from 'lodash/groupBy';
import _keyBy from 'lodash/keyBy';
import _map from 'lodash/map';
import _mapValues from 'lodash/mapValues';
import moment from 'moment';
import _orderBy from 'lodash/orderBy';
import _partialRight from 'lodash/partialRight';
import _sortedUniqBy from 'lodash/sortedUniqBy';

import { EventImg } from './eventDisplay';

/**
 * @param date momentjs date representing the day (local time) to calculate
 *     activity for
 * @param boxEventsByActivityState array of objects with 'EventValue' and
 *     'EventTime' keys. 'EventValue' is one of 'Static', 'Minor', 'Major'.
 * @param boxEventsBySensorLevel array of objects with 'EventValue' and
 *     'EventTime' keys. 'EventValue' is an array of numbers representing
 *     pressure point data.
 *
 * @return an array of objects with 'hour', 'moving', 'resting', 'offBed',
 *     'unknown' keys where each entry represents the amount of time spent in
 *     each state for that hour of the day.
 */
function calculateActivityData(
    date,
    boxEventsByActivityState,
    boxEventsBySensorLevel
) {
    const dayOfYear = date.dayOfYear();
    const activityEventsByHourAndMinute = groupByHourAndMinute(
        boxEventsByActivityState,
        dayOfYear,
    );
    const sensorEventsByHourAndMinute = groupByHourAndMinute(
        boxEventsBySensorLevel,
        dayOfYear,
    );

    const activityData = _map(
        [...Array(24).keys()],
        hour => {
            const activityEventsByMinute = activityEventsByHourAndMinute[hour] || {};
            const sensorEventsByMinute = sensorEventsByHourAndMinute[hour] || {};
            const counts = {
                moving: 0,
                resting: 0,
                offBed: 0,
                unknown: 0,
                ..._countBy(
                    [...Array(60).keys()],
                    minute => {
                        const activityEvent = activityEventsByMinute[minute] || {};
                        const sensorEvent = sensorEventsByMinute[minute] || {};
                        return classifyActivity(
                            activityEvent.EventValue,
                            sensorEvent.EventValue
                        );
                    }
                )
            }
            return {hour, ...counts}
        }
    )
    return [ activityData, activityEventsByHourAndMinute, sensorEventsByHourAndMinute ];
};

/**
 * @param events array of objects with 'EventTime' and 'EventValue' keys, where
 *     'EventTime' is an iso8601 formatted string.
 * @param dayOfYear day of the year that events should be filtered to
 *
 * @return an object of the form
 * {
 *     <EventTime hour>: {
 *         <EventTime minute>: {EventTime: <moment(EventTime)>, EventValue: <EventValue>}
 *         ...
 *     },
 *     ...
 * }
 * where only only the first event for each minute is kept.
 */
function groupByHourAndMinute(events, dayOfYear) {
    return (
        _flow([
            _partialRight(_orderBy, ['EventTime']),
            _partialRight(_map, ({EventValue, EventTime}) => (
                {EventValue, EventTime: moment(EventTime)}
            )),
            _partialRight(_filter, ({EventTime}) => (
                EventTime.dayOfYear() === dayOfYear
            )),
            _partialRight(
                _groupBy,
                ({EventTime}) => EventTime.hour()
            ),
            _partialRight(
                _mapValues,
                events => _flow([
                    _partialRight(_sortedUniqBy, ({EventTime}) => EventTime.minute()),
                    _partialRight(_keyBy, ({EventTime}) => EventTime.minute()),
                ])(events)
            ),
        ])
        (events)
    );
}

function classifyActivity(activityEventValue, sensorEventValue) {
    if (
        sensorEventValue &&
        _every(JSON.parse(sensorEventValue), value => value === 255)
    ) {
        return 'offBed';
    } else if (activityEventValue === 'Major') {
        return 'moving';
    } else if (activityEventValue === 'Minor' || activityEventValue === 'Static') {
        return 'resting';
    } else {
        return 'unknown';
    }
};

/**
 * @param activityData an array of objects with 'hour', 'moving', 'resting',
 *     'offBed', 'unknown' keys where each entry represents the amount of time
 *     spent in each state for that hour of the day.
 * @return array of objects with keys 'activity' and 'percentage'
 */
function calculateTotalActivityPercentages(activityData) {
    const totals = activityData.reduce(
        (totals, entry) => ({
            moving: totals.moving + entry.moving,
            resting: totals.resting + entry.resting,
            offBed: totals.offBed + entry.offBed,
        }),
        {moving: 0, resting: 0, offBed: 0}
    )
    const overallTotal = totals.moving + totals.resting + totals.offBed;
    return ['moving', 'resting', 'offBed'].map(activity => (
        {activity, percentage: (totals[activity] / overallTotal) || 0}
    ));
};

/**
 * @param date momentjs date representing the day (local time) to calculate
 *     event data for
 * @param boxEvents array of objects with 'EventValue', 'EventType', and
 *     'EventTime' keys. 'EventValue' is one of 'Static', 'Minor', 'Major'.
 * @param allBoxSettings array of box settings objects.
 *
 * @return an object of the form
 *     {
 *         '0:00': {
 *             // <event key> matches to a row in the EventRecord component
 *             // e.g. 'stirring'
 *             <event key>: {
 *                 key: <event key>,
 *                 img: <event img>,
 *             }
 *         },
 *         '0:20': {
 *         }
 *         //... and so on for every twenty minutes of the day
 *     }
 */
function calculateEventData(date, boxEvents, allBoxSettings) {
    const dayOfYear = date.dayOfYear();
    const orderedAllBoxSettings = (
        _flow([
            _partialRight(_orderBy, ['creationDate']),
            _partialRight(_map, settings => (
                {...settings, creationDate: moment.utc(settings.creationDate)}
            ))
        ])
        (allBoxSettings)
    );
    return (
        _flow([
            _partialRight(_orderBy, ['EventTime']),
            _partialRight(_map, event => (
                {...event, EventTime: moment(event.EventTime)}
            )),
            _partialRight(_filter, ({EventTime}) => (
                EventTime.dayOfYear() === dayOfYear
            )),
            _partialRight(_groupBy, ({EventTime}) => {
                const hour = EventTime.hour();
                const minute = EventTime.minute();
                if (0 <= minute && minute < 20) {
                    return `${hour}:00`;
                } else if (20 <= minute && minute < 40) {
                    return `${hour}:20`;
                } else if (40 <= minute && minute < 60) {
                    return `${hour}:40`;
                }
            }),
            _partialRight(_mapValues, boxEvents => {
                return (
                    _flow([
                        _partialRight(_map, boxEvent => {
                            const boxSettings = _findLast(
                                orderedAllBoxSettings,
                                ({creationDate}) => creationDate < boxEvent.EventTime,
                            ) || {};
                            return classifyEvent(boxEvent, boxSettings);
                        }),
                        _partialRight(_filter, value => value !== null),
                        _partialRight(_keyBy, 'key'),
                    ])
                    (boxEvents)
                );
            }),
        ])
        (boxEvents)
    );
}

const LOOKUP_EVENT_DATA = {
    PatientState: {
        Stirring: {
            key: 'stirring',
            getImage: boxSettings => (
                boxSettings.stirring ? EventImg.stirring : EventImg.mute
            )
        },
        SittingUp: {
            key: 'sittingUp',
            getImage: boxSettings => (
                boxSettings.sittingUp ? EventImg.sittingUp : EventImg.mute
            )
        },
        Leaving: {
            key: 'leaving',
            getImage: boxSettings => (
                boxSettings.leaving ? EventImg.leaving : EventImg.mute
            )
        },
        OutOfBed: {
            key: 'outOfBed',
            getImage: boxSettings => (
                boxSettings.leaving ? EventImg.outOfBed : EventImg.mute
            )
        },
        Return: {
            key: 'return',
            getImage: boxSettings => EventImg.return,
        },
        Immobilization: {
            key: 'immobilization',
            getImage: boxSettings => EventImg.immobilization,
        },
    },
    NurseMode: {
        Response: {
            key: 'nurseModeResponse',
            getImage: boxSettings => EventImg.nurseModeResponse,
        },
        On: {
            key: 'nurseModeOn',
            getImage: boxSettings => EventImg.nurseModeOn,
        },
    },
    RepositionRequest: {
        On: {
            key: 'repositionOn',
            getImage: boxSettings => (
                boxSettings.reposition ? EventImg.repositionOn : EventImg.mute
            ),
        },
    },
    RepositionLevel: {
        2: {
            key: 'repositionMinor',
            getImage: boxSettings => EventImg.repositionMinor,
        },
        3: {
            key: 'repositionMajor',
            getImage: boxSettings => EventImg.repositionMajor,
        },
    }
};

function classifyEvent(boxEvent, boxSettings) {
    const lookupByValue = LOOKUP_EVENT_DATA[boxEvent.EventType] || {};
    const classification = lookupByValue[boxEvent.EventValue];
    if (classification) {
        return {
            key: classification.key,
            img: classification.getImage(boxSettings),
        }
    } else {
        return null;
    }
}


// Export these just for tests
const _ = {
    classifyActivity,
    groupByHourAndMinute,
    classifyEvent,
}

export {
    calculateActivityData,
    calculateTotalActivityPercentages,
    calculateEventData,
    _,
}
