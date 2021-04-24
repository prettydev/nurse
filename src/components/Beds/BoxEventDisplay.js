import Messages from '../../Messages';
import {BoxEventType, BoxEventValue} from './BoxEvents';
import {Colors} from '../../util/Colors';
import {Sounds} from '../../util/Sounds';

export const BodyStyle = {
    White: 'White',
    Black: 'Black',
    None: 'None',
};
if (Object.freeze) Object.freeze(BodyStyle);


const DefaultDisplay = {
    noAlert: false,
    sound: null,
    bgColor: Colors.GrayL95,
    bgColorAlert: Colors.Gray,
    titleText: '',
    titleTextColor: Colors.MainText,
    eventText: null,
    eventTextColor: Colors.White,
    eventTextColorAlert: Colors.White,
    listText: null,
    listTextColor: null,
    timer: false,
    timerStartOverride: null,
    timerBoxColor: Colors.Black,
    exclamationShow: false,
    exclamationAlert: null,
    exclamationLight: false,
    warningIcon: false,
    warningText: null,
    warningTextColor: Colors.MainText,
    bodyStyle: BodyStyle.Black,
    outerBorderColor: Colors.Border1,
    innerBorderColor: Colors.BorderInner,
    outerShadow: '',
    zeroPressureDark: true,
};
const DisplayMap = {

    [BoxEventType.PatientState]: {
        [BoxEventValue.NotOnBed]: {
            bgColorAlert: Colors.Gray,
            titleTextColor: Colors.MainText,
            listText: Messages.Text_Event_NotOnBed,
            listTextColor: Colors.MainText,
            timer: true,
            timerBoxColor: Colors.TimerBox,
            bodyStyle: BodyStyle.None,
        },
        [BoxEventValue.OnBed]: {},
        [BoxEventValue.Return]: {},
        [BoxEventValue.Immobilization]: {
            sound: Sounds.Reposition,
            bgColor: Colors.Event_Immobile,
            bgColorAlert: Colors.Event_Immobile,
            outerBorderColor: Colors.Event_Immobile,
            titleTextColor: Colors.White,
            eventText: Messages.Text_Event_Immobile,
            eventTextColor: Colors.White,
            exclamationLight: true,
            bodyStyle: BodyStyle.White,
            outerShadow: `, 0 0 10px ${Colors.Gray_a50}`,
            zeroPressureDark: false,
        },
        [BoxEventValue.Stirring]: {
            bgColor: Colors.Event_Stirring,
            bgColorAlert: Colors.Event_Stirring,
            outerBorderColor: Colors.Event_Stirring,
            titleTextColor: Colors.White,
            eventText: Messages.Text_Event_Stirring,
            eventTextColor: Colors.White,
            exclamationLight: true,
            bodyStyle: BodyStyle.White,
            outerShadow: `, 0 0 10px ${Colors.Gray_a50}`,
            zeroPressureDark: false,
        },
        [BoxEventValue.SittingUp]: {
            bgColor: Colors.Event_Sittingup,
            bgColorAlert: Colors.Event_Sittingup,
            outerBorderColor: Colors.Event_Sittingup,
            titleTextColor: Colors.White,
            eventText: Messages.Text_Event_SittingUp,
            eventTextColor: Colors.White,
            exclamationLight: true,
            bodyStyle: BodyStyle.White,
            outerShadow: `, 0 0 10px ${Colors.Gray_a50}`,
            zeroPressureDark: false,
        },
        [BoxEventValue.Leaving]: {
            sound: Sounds.Alert,
            bgColor: Colors.Event_Leaving,
            bgColorAlert: Colors.Event_Leaving,
            outerBorderColor: Colors.Event_Leaving,
            titleTextColor: Colors.White,
            eventText: Messages.Text_Event_Leaving,
            eventTextColor: Colors.White,
            exclamationLight: true,
            bodyStyle: BodyStyle.White,
            outerShadow: `, 0 0 10px ${Colors.Gray_a50}`,
            zeroPressureDark: false,
        },
        [BoxEventValue.OutOfBed]: {
            sound: Sounds.Alert,
            bgColor: Colors.Event_Leaving,
            bgColorAlert: Colors.Event_Leaving,
            outerBorderColor: Colors.Event_Leaving,
            titleTextColor: Colors.White,
            eventText: Messages.Text_Event_OutofBed,
            eventTextColor: Colors.White,
            exclamationLight: true,
            timer: true,
            timerBoxColor: Colors.Main,
            bodyStyle: BodyStyle.None,
            outerShadow: `, 0 0 10px ${Colors.Gray_a50}`,
            zeroPressureDark: false,
        },
        [BoxEventValue.NoCheckIn]: {
            bgColor: Colors.GrayL95,
            bgColorAlert: Colors.Gray,
            eventText: Messages.Text_Event_PatientCheck_in,
            eventTextColorAlert: Colors.White_a75,
        },
    },
    [BoxEventType.RepositionRequest]: {
        [BoxEventValue.On]: {
            sound: Sounds.Reposition,
            bgColor: Colors.Event_Reposition,
            bgColorAlert: Colors.Event_Reposition,
            outerBorderColor: Colors.Event_Reposition,
            titleTextColor: Colors.White,
            eventText: Messages.Text_Event_Reposition,
            eventTextColor: Colors.White,
            exclamationLight: true,
            bodyStyle: BodyStyle.White,
            outerShadow: `, 0 0 10px ${Colors.Gray_a50}`,
            zeroPressureDark: false,
        },
        [BoxEventValue.Off]: {},
    },
    [BoxEventType.BoxTransmissionStatus]: {
        [BoxEventValue.Normal]: {},
        [BoxEventValue.Poor]: {},
        [BoxEventValue.None]: {
            bgColor: Colors.GrayL95,
            bgColorAlert: Colors.Gray,
            outerBorderColor: Colors.GrayL95,
            titleTextColor: Colors.MainText,
            warningIcon: true,
            warningText: [Messages.Text_Event_NoTransmission],
            bodyStyle: BodyStyle.None,
        },
    },
    [BoxEventType.SystemConnectionStatus]: {
        [BoxEventValue.Normal]: {}
    },
    [BoxEventType.PadConnectionStatus]: {
        [BoxEventValue.Connected]: {},
        [BoxEventValue.Disconnected]: {
            bgColor: Colors.GrayL95,
            bgColorAlert: Colors.Gray,
            outerBorderColor: Colors.GrayL95,
            titleTextColor: Colors.MainText,
            warningIcon: true,
            warningText: [Messages.Text_Event_SensorDisconnected, Messages.Text_Event_SensorDisconnected2],
            bodyStyle: BodyStyle.None,
        },
        [BoxEventValue.Replaced]: {
            bgColor: Colors.GrayL95,
            bgColorAlert: Colors.Gray,
            outerBorderColor: Colors.GrayL95,
            titleTextColor: Colors.MainText,
            warningIcon: true,
            warningText: [Messages.Text_Event_SensorReplaced, Messages.Text_Event_SensorReplaced2],
            bodyStyle: BodyStyle.None,
        },
        [BoxEventValue.Damaged]: {
            bgColor: Colors.GrayL95,
            bgColorAlert: Colors.Gray,
            outerBorderColor: Colors.GrayL95,
            titleTextColor: Colors.MainText,
            warningIcon: true,
            warningText: [Messages.Text_Event_SensorDamaged],
            bodyStyle: BodyStyle.None,
        },
        [BoxEventValue.Normal]: {},
    },
    [BoxEventType.NurseMode]: {
        [BoxEventValue.On]: {
            bgColor: Colors.White,
            bgColorAlert: Colors.Gray,
            titleTextColor: Colors.Event_NurseMode,
            eventText: Messages.Text_Event_NurseMode,
            eventTextColor: Colors.Event_NurseMode,
            innerBorderColor: Colors.Event_NurseMode_a50,
        },
        [BoxEventValue.Off]: {},
        [BoxEventValue.Reset]: {},
        [BoxEventValue.Response]: {
            eventText: Messages.Text_Event_OutofBed,
            eventTextColor: Colors.Gray,
            timer: true,
            timerBoxColor: Colors.Gray,
        }
    }
}

function getBoxEventDisplay({boxEvent, intl, controlBoxIdToBox, controlBoxIdToSettings}) {
    const display = {...DefaultDisplay};
    display.titleText = boxEvent.bedNumber || boxEvent.boxId;
    let boxType = boxEvent.type;
    let boxValue = boxEvent.value;

    // Subevent overrides
    const isPrimaryEvent = ((boxEvent.Type === BoxEventType.PatientState && [BoxEventValue.Immobilization, BoxEventValue.Stirring, BoxEventValue.SittingUp, BoxEventValue.Leaving, BoxEventValue.OutOfBed].includes(boxEvent.Value))
        || (boxEvent.Type === BoxEventType.BoxTransmissionStatus && boxEvent.Value === BoxEventValue.None)
        || (boxEvent.Type === BoxEventType.RepositionRequest && boxEvent.Value === BoxEventValue.On)
        || (boxEvent.Type === BoxEventType.PadConnectionStatus && boxEvent.Value === BoxEventValue.Disconnected)
        || (boxEvent.Type === BoxEventType.PadConnectionStatus && boxEvent.Value === BoxEventValue.Replaced));

    if (boxEvent.SubEvents && boxEvent.SubEvents.BoxTransmissionStatus && boxEvent.SubEvents.BoxTransmissionStatus.value === BoxEventValue.Poor) {
        display.exclamationShow = true;
        display.exclamationAlert = intl.formatMessage(Messages.Text_Tool_Poor_Transmission);
        if (!isPrimaryEvent) [boxType, boxValue] = [BoxEventType.BoxTransmissionStatus, BoxEventValue.Poor];
    } else if (boxEvent.SubEvents && boxEvent.SubEvents.PadConnectionStatus && boxEvent.SubEvents.PadConnectionStatus.value === BoxEventValue.Damaged) {
        display.exclamationShow = true;
        display.exclamationAlert = intl.formatMessage(Messages.Text_Tool_SensorModule_Defective);
        if (!isPrimaryEvent) [boxType, boxValue] = [BoxEventType.PadConnectionStatus, BoxEventValue.Damaged];
    } else if (boxEvent.SubEvents && (boxEvent.SubEvents.BoxTransmissionStatus || boxEvent.SubEvents.PadConnectionStatus)) {
        display.exclamationShow = true;
        display.exclamationAlert = intl.formatMessage(Messages.Text_Tool_SensorModule_Defective);
        if (!isPrimaryEvent) [boxType, boxValue] = [BoxEventType.PadConnectionStatus, BoxEventValue.Damaged];
    }
    // for events where the timer is shown for an out of bed event, default to original OutOfBed event time
    if (boxEvent.SubEvents && boxEvent.SubEvents.PatientStateOutOfBed && boxEvent.SubEvents.PatientStateOutOfBed.time) {
        display.timerStartOverride = boxEvent.SubEvents.PatientStateOutOfBed.time;
    }


    // When checked in, extract event settings and apply them to potentially disable the event from being displayed
    if (boxEvent.patientId) {
        let settings = null;
        // if (boxEvent.SubEvents && boxEvent.SubEvents.DeviceSetting && boxEvent.SubEvents.DeviceSetting.value) {
        //     settings = {
        //         leaving: boxEvent.SubEvents.DeviceSetting.value["Leaving"],
        //         stirring: boxEvent.SubEvents.DeviceSetting.value["Stirring"],
        //         sittingUp: boxEvent.SubEvents.DeviceSetting.value["SittingUp"],
        //         alertOn: boxEvent.SubEvents.DeviceSetting.value["AlertOn"],
        //         reposition: boxEvent.SubEvents.DeviceSetting.value["Reposition"],
        //     }
        // } else if (controlBoxIdToSettings && controlBoxIdToSettings[boxEvent.boxId]) {
        //     settings = controlBoxIdToSettings[boxEvent.boxId];
        // }

        settings = {
            stirring: true,
            sittingUp: true,
            leaving: true,
            alertOn: true,
            reposition: true,
        };

        if (settings) {
            let disable = false;
            if ((settings.stirring === false || settings.alertOn === false) && boxValue === BoxEventValue.Stirring) disable = true;
            if ((settings.sittingUp === false || settings.alertOn === false) && boxValue === BoxEventValue.SittingUp) disable = true;
            if ((settings.leaving === false || settings.alertOn === false) && (boxValue === BoxEventValue.Leaving || boxValue === BoxEventValue.OutOfBed)) disable = true;  // NOTE: leaving flag turns off OutOfBed alert as well
            if ((settings.reposition === false || settings.alertOn === false) && boxType === BoxEventType.RepositionRequest && boxValue === BoxEventValue.On) disable = true;

            // TODO : only explicitly deny stirring/sittingup/leaving/reposition/outofbed when alertOn === true
            if (disable) {
                display.noAlert = true;
                if (boxValue === BoxEventValue.OutOfBed) {
                    [boxType, boxValue] = [BoxEventType.PatientState, BoxEventValue.NotOnBed];
                } else {
                    [boxType, boxValue] = [BoxEventType.PatientState, BoxEventValue.OnBed];
                }
            }
        }
    }

    // Overwrite display defaults with expected display state
    if (DisplayMap[boxType] && DisplayMap[boxType][boxValue]) {
        Object.keys(display).forEach(key => {
            if (key in DisplayMap[boxType][boxValue]) {
                display[key] = DisplayMap[boxType][boxValue][key];
            }
        });
    }
    display.eventText = display.eventText ? intl.formatMessage(display.eventText) : null;
    display.listText = display.listText ? intl.formatMessage(display.listText) : null;
    if (display.warningText) {
        const list = display.warningText;
        display.warningText = '';
        list.map(message => display.warningText += `${intl.formatMessage(message)} `)
    }

    return display
}

export {getBoxEventDisplay};
