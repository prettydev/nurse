// export const BoxEventClass = {
//     Device: 'Device',
//     Patient: 'Patient',
//     System: 'System'
// };
// if (Object.freeze) { Object.freeze(BoxEventClass) }

export const BoxEventType = {
    PatientState: 'PatientState',
    RepositionRequest: 'RepositionRequest',
    BoxTransmissionStatus: 'BoxTransmissionStatus',
    SystemConnectionStatus: 'SystemConnectionStatus',
    PadConnectionStatus: 'PadConnectionStatus',
    NurseMode: 'NurseMode'
};
if (Object.freeze) {
    Object.freeze(BoxEventType)
}

export const BoxEventValue = {
    // -- PatientState
    NotOnBed: 'NotOnBed',
    OnBed: 'OnBed',
    Return: 'Return',
    Immobilization: 'Immobilization',
    Stirring: 'Stirring',
    SittingUp: 'SittingUp',
    Leaving: 'Leaving',
    OutOfBed: 'OutOfBed',
    NoCheckIn: 'NoCheckIn',
    // -- RepositionRequest
    On: 'On',
    Off: 'Off',
    // -- BoxTransmissionStatus
    Normal: 'Normal',
    Poor: 'Poor',
    None: 'None',
    // -- PadConnectionStatus
    Connected: 'Connected',
    Disconnected: 'Disconnected',
    Replaced: 'Replaced',
    Damaged: 'Damaged',
    // Normal: 'Normal',
    // -- SystemConnectionStatus
    // Normal : 'Normal',
    DataHubNone: 'DataHubNone',
    // -- NurseMode
    // On: 'On',
    // Off: 'Off',
    Reset: 'Reset',
    Response: 'Response',
};
if (Object.freeze) {
    Object.freeze(BoxEventValue)
}

// Left bar Alerts: map which is a filter and sort order for main page alerts
export const LeftSiderAlerts = {
    [BoxEventType.PatientState]: {},
    [BoxEventType.RepositionRequest]: {},
    [BoxEventType.BoxTransmissionStatus]: {},
    [BoxEventType.PadConnectionStatus]: {},
    [BoxEventType.PadConnectionStatus]: {},
    [BoxEventType.NurseMode]: {}
};
LeftSiderAlerts[BoxEventType.PatientState][BoxEventValue.OutOfBed] = 1;
LeftSiderAlerts[BoxEventType.PatientState][BoxEventValue.Leaving] = 2;
LeftSiderAlerts[BoxEventType.RepositionRequest][BoxEventValue.On] = 3;
LeftSiderAlerts[BoxEventType.PatientState][BoxEventValue.Immobilization] = 4;
LeftSiderAlerts[BoxEventType.BoxTransmissionStatus][BoxEventValue.None] = 5;
LeftSiderAlerts[BoxEventType.PadConnectionStatus][BoxEventValue.Disconnected] = 6;
LeftSiderAlerts[BoxEventType.PadConnectionStatus][BoxEventValue.Disconnected] = 7;
LeftSiderAlerts[BoxEventType.PadConnectionStatus][BoxEventValue.Damaged] = 8;
LeftSiderAlerts[BoxEventType.PadConnectionStatus][BoxEventValue.Replaced] = 9;
LeftSiderAlerts[BoxEventType.PatientState][BoxEventValue.SittingUp] = 10;
LeftSiderAlerts[BoxEventType.PatientState][BoxEventValue.Stirring] = 11;
LeftSiderAlerts[BoxEventType.PatientState][BoxEventValue.NoCheckIn] = 12;
if (Object.freeze) {
    Object.freeze(LeftSiderAlerts)
}

export function isLeftSiderAlert(boxEvent, store) {
    if (!boxEvent) return false;
    let isAlert = true;
    if (boxEvent.subEvents && (boxEvent.subEvents.BoxTransmissionStatus || boxEvent.subEvents.PadConnectionStatus)) {
        isAlert = isAlert && true;
    } else {
        isAlert = isAlert
            && LeftSiderAlerts
            && LeftSiderAlerts[boxEvent.type]
            && LeftSiderAlerts[boxEvent.type][boxEvent.value] > 0;
    }
    return isAlert
}

// Main Page Alerts: map which is a filter and sort order for main page alerts
export const DashboardNotifications = {
    [BoxEventType.PatientState]: {},
    [BoxEventType.RepositionRequest]: {},
    [BoxEventType.BoxTransmissionStatus]: {},
    [BoxEventType.PadConnectionStatus]: {},
    [BoxEventType.PadConnectionStatus]: {},
    [BoxEventType.NurseMode]: {},

};
DashboardNotifications[BoxEventType.PatientState][BoxEventValue.OutOfBed] = 1;
DashboardNotifications[BoxEventType.PatientState][BoxEventValue.Leaving] = 2;
DashboardNotifications[BoxEventType.RepositionRequest][BoxEventValue.On] = 3;
DashboardNotifications[BoxEventType.PatientState][BoxEventValue.Immobilization] = 4;
DashboardNotifications[BoxEventType.BoxTransmissionStatus][BoxEventValue.None] = 5;
DashboardNotifications[BoxEventType.PadConnectionStatus][BoxEventValue.Disconnected] = 6;
DashboardNotifications[BoxEventType.PadConnectionStatus][BoxEventValue.Disconnected] = 7;
DashboardNotifications[BoxEventType.PadConnectionStatus][BoxEventValue.Damaged] = 8;
DashboardNotifications[BoxEventType.PadConnectionStatus][BoxEventValue.Replaced] = 9;
DashboardNotifications[BoxEventType.PatientState][BoxEventValue.SittingUp] = 10;
DashboardNotifications[BoxEventType.PatientState][BoxEventValue.Stirring] = 11;
DashboardNotifications[BoxEventType.NurseMode][BoxEventValue.On] = 12;
DashboardNotifications[BoxEventType.NurseMode][BoxEventValue.Response] = 13;
DashboardNotifications[BoxEventType.PatientState][BoxEventValue.NotOnBed] = 14;
if (Object.freeze) {
    Object.freeze(DashboardNotifications)
}

export function isDashboardNotification(boxEvent) {
    return boxEvent
        && boxEvent.patientId !== null
        && boxEvent.patientId !== ''
        && DashboardNotifications[boxEvent.class]
        && DashboardNotifications[boxEvent.class][boxEvent.type]
        && DashboardNotifications[boxEvent.class][boxEvent.type][boxEvent.value] > 0;
}

// Filter for All Patients tab on dashboard
export const DashboardAllPatients = {
    [BoxEventType.PatientState]: {},
    [BoxEventType.RepositionRequest]: {},
    [BoxEventType.BoxTransmissionStatus]: {},
    [BoxEventType.PadConnectionStatus]: {},
    [BoxEventType.PadConnectionStatus]: {},
    [BoxEventType.NurseMode]: {}
};
DashboardAllPatients[BoxEventType.PatientState][BoxEventValue.NotOnBed] = true;
DashboardAllPatients[BoxEventType.PatientState][BoxEventValue.OnBed] = true;
DashboardAllPatients[BoxEventType.PatientState][BoxEventValue.Return] = true;
DashboardAllPatients[BoxEventType.PatientState][BoxEventValue.Immobilization] = true;
DashboardAllPatients[BoxEventType.PatientState][BoxEventValue.Stirring] = true;
DashboardAllPatients[BoxEventType.PatientState][BoxEventValue.SittingUp] = true;
DashboardAllPatients[BoxEventType.PatientState][BoxEventValue.Leaving] = true;
DashboardAllPatients[BoxEventType.PatientState][BoxEventValue.OutOfBed] = true;
DashboardAllPatients[BoxEventType.RepositionRequest][BoxEventValue.On] = true;
DashboardAllPatients[BoxEventType.RepositionRequest][BoxEventValue.Off] = true;
DashboardAllPatients[BoxEventType.BoxTransmissionStatus][BoxEventValue.Normal] = true;
DashboardAllPatients[BoxEventType.BoxTransmissionStatus][BoxEventValue.Poor] = true;
DashboardAllPatients[BoxEventType.BoxTransmissionStatus][BoxEventValue.None] = true;
DashboardAllPatients[BoxEventType.PadConnectionStatus][BoxEventValue.Disconnected] = true;
DashboardAllPatients[BoxEventType.PadConnectionStatus][BoxEventValue.Disconnected] = true;
DashboardAllPatients[BoxEventType.PadConnectionStatus][BoxEventValue.Replaced] = true;
DashboardAllPatients[BoxEventType.PadConnectionStatus][BoxEventValue.Damaged] = true;
DashboardAllPatients[BoxEventType.PadConnectionStatus][BoxEventValue.Normal] = true;
DashboardAllPatients[BoxEventType.NurseMode][BoxEventValue.On] = true;
DashboardAllPatients[BoxEventType.NurseMode][BoxEventValue.Off] = true;
DashboardAllPatients[BoxEventType.NurseMode][BoxEventValue.Reset] = true;
DashboardAllPatients[BoxEventType.NurseMode][BoxEventValue.Response] = true;
if (Object.freeze) {
    Object.freeze(DashboardAllPatients)
}

export function isAllPatientsEvent(boxEvent) {
    return boxEvent
        && boxEvent.patientId !== null
        && boxEvent.patientId !== ''
        && DashboardAllPatients
        && DashboardAllPatients[boxEvent.type]
        && DashboardAllPatients[boxEvent.type][boxEvent.value];
}

function modifyWithSettings(boxEvent, controlBoxIdToSettings) {
}