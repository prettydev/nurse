import { EventImg } from './eventDisplay.js';
import moment from "moment";
import {
    calculateActivityData,
    calculateTotalActivityPercentages,
    calculateEventData,
    _,
} from "./calculatePatientHistory";

// Force all calls to moment() to return times in utc.
jest.mock('moment', () => {
    const realMoment = jest.requireActual('moment');
    const mockMoment = value => realMoment.utc(value);
    Object.assign(mockMoment, realMoment);
    return {
        __esModule: true,
        ...realMoment,
        default: mockMoment,
    };
});

describe("calculateActivityData", () => {
    const date = moment("2020-08-13T00:00:00+00:00");
    const boxEventsByActivityState = [
        {EventValue: "Static", EventTime: "2020-08-13T21:57:02.068718+00:00"},
        {EventValue: "Static", EventTime: "2020-08-13T21:58:02.068718+00:00"},
    ];
    const boxEventsBySensorLevel = [
        {
            EventValue: JSON.stringify(Array(36).fill(0)),
            EventTime: "2020-08-13T21:56:42.073454+00:00"
        },
        {
            EventValue: JSON.stringify(Array(36).fill(0)),
            EventTime: "2020-08-13T21:57:42.070688+00:00"
        },
    ];
    const actual = calculateActivityData(
        date,
        boxEventsByActivityState,
        boxEventsBySensorLevel
    );

    it("returns 24 hours of totals", () => {
        expect(actual.length).toBe(24);
    });
    it("adds up to 60 minutes in each hour", () => {
        for (const entry of actual) {
            const total = entry.moving + entry.resting + entry.offBed + entry.unknown;
            expect(total).toBe(60)
        }
    });
});

describe("groupByHourAndMinute", () => {
    it('groups by hour and minute', () => {
        const dayOfYear = moment("2020-08-13T00:00:00+00:00").dayOfYear();
        const events = [
            {EventTime: "2020-08-13T21:57:02.068718+00:00", EventValue: 1},
            {EventTime: "2020-08-13T21:58:02.068718+00:00", EventValue: 2},
        ];
        const actual = _.groupByHourAndMinute(events, dayOfYear);
        const expected = {
            21: {
                57: {EventTime: moment("2020-08-13T21:57:02.068718+00:00"), EventValue: 1},
                58: {EventTime: moment("2020-08-13T21:58:02.068718+00:00"), EventValue: 2},
            }
        }
        expect(actual).toEqual(expected);
    });
    it('filters out timestamps not on given day of year', () => {
        const dayOfYear = moment("2020-01-01T00:00:00+00:00").dayOfYear();
        const events = [
            {EventTime: "2020-01-01T00:00:00.000000+00:00", EventValue: 1},
            {EventTime: "2020-08-13T21:58:02.068718+00:00", EventValue: 2},
        ];
        const actual = _.groupByHourAndMinute(events, dayOfYear);
        const expected = {
            0: {
                0: {EventTime: moment("2020-01-01T00:00:00.000000+00:00"), EventValue: 1},
            }
        }
        expect(actual).toEqual(expected);

    });
});
describe("classifyActivity", () => {
    it('returns unknown when unknown', () => {
        const actual = _.classifyActivity(undefined, undefined);
        expect(actual).toEqual('unknown');
    });
    it('returns offBed when sensor values are all 255', () => {
        const actual = _.classifyActivity('Static', '[255.0, 255.0]');
        expect(actual).toEqual('offBed');
    });
    it('returns moving when activity event is Major', () => {
        const actual = _.classifyActivity('Major', '[255.0, 1.0]');
        expect(actual).toEqual('moving');
    });
    it('returns resting when activity event is Minor', () => {
        const actual = _.classifyActivity('Minor', '[255.0, 1.0]');
        expect(actual).toEqual('resting');
    });
});

describe("calculateTotalActivityPercentages", () => {
    it("handles empty data", () => {
        const activityData = [];
        const actual = calculateTotalActivityPercentages(activityData);
        const expected = [
            {activity: "moving", percentage: 0},
            {activity: "resting", percentage: 0},
            {activity: "offBed", percentage: 0},
            {activity: "unknown", percentage: 0},
        ];
        expect(actual).toEqual(expected);
    });
    it("calculates correct percentages", () => {
        const activityData = [
            {hour: 0, moving: 10, resting: 40, offBed: 50, unknown: 0},
            {hour: 1, moving: 30, resting: 20, offBed: 50, unknown: 0}
        ];
        const actual = calculateTotalActivityPercentages(activityData);
        const expected = [
            {activity: "moving", percentage: .2},
            {activity: "resting", percentage: .3},
            {activity: "offBed", percentage: .5},
            {activity: "unknown", percentage: 0},
        ];
        expect(actual).toEqual(expected);
    });
    it("accounts for unknown time", () => {
        const activityData = [
            {hour: 0, moving: 10, resting: 20, offBed: 30, unknown: 40},
        ];
        const actual = calculateTotalActivityPercentages(activityData);
        const expected = [
            {activity: "moving", percentage: .1},
            {activity: "resting", percentage: .2},
            {activity: "offBed", percentage: .3},
            {activity: "unknown", percentage: .4},
        ];
        expect(actual).toEqual(expected);
    });
});

describe('calculateEventData', () => {
    it('produces data of the right shape', () => {
        const date = moment("2020-08-12T00:00:00+00:00");
        const boxEvents = [
            {
                "EventValue": "OnBed",
                "EventType": "PatientState",
                "EventTime": "2020-08-12T07:05:42.367573+00:00"
            },
            {
                "EventValue": "Disconnected",
                "EventType": "PadConnectionStatus",
                "EventTime": "2020-08-12T07:05:42.866766+00:00"
            },
            {
                "EventValue": "None",
                "EventType": "BoxTransmissionStatus",
                "EventTime": "2020-08-12T07:07:39.003474+00:00"
            },
            {
                "EventValue": "Normal",
                "EventType": "BoxTransmissionStatus",
                "EventTime": "2020-08-12T07:07:48.548215+00:00"
            },
            {
                "EventValue": "OnBed",
                "EventType": "PatientState",
                "EventTime": "2020-08-12T07:27:48.548467+00:00"
            },
            {
                "EventValue": "OutOfBed",
                "EventType": "PatientState",
                "EventTime": "2020-08-12T08:07:38.878730+00:00"
            },
        ];
        const allBoxSettings = [
            {leaving: true, creationDate: moment('2020-08-12T00:00:00+00:00').unix() * 1000}
        ];
        const actual = calculateEventData(date, boxEvents, allBoxSettings);
        const expected = {
            '7:00': {},
            '7:20': {},
            '8:00': {outOfBed: {key: 'outOfBed', img: EventImg.outOfBed}},
        };
        expect(actual).toEqual(expected);
    });
});

describe('classifyEvent', () => {
    it('classifies an event', () => {
        const boxEvent = {
            EventType: 'PatientState',
            EventValue: 'Stirring',
        };
        const boxSettings = {'stirring': true};
        const actual = _.classifyEvent(boxEvent, boxSettings);
        const expected = {
            key: 'stirring',
            img: EventImg.stirring,
        };
        expect(actual).toEqual(expected);
    });
    it('returns null when no classification', () => {
        const boxEvent = {
            EventType: 'PadConnectionStatus',
            EventValue: 'Disconnected',
        };
        const boxSettings = {};
        const actual = _.classifyEvent(boxEvent, boxSettings);
        const expected = null;
        expect(actual).toEqual(expected);
    });
});
