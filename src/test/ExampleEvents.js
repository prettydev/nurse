const exampleEvents = [
    { 'Class': 'Patient', 'Type': 'PatientState', 'Value': 'NotOnBed', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Patient', 'Type': 'PatientState', 'Value': 'OnBed', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Patient', 'Type': 'PatientState', 'Value': 'Return', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Patient', 'Type': 'PatientState', 'Value': 'Immobilization', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Patient', 'Type': 'PatientState', 'Value': 'Stirring', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Patient', 'Type': 'PatientState', 'Value': 'SittingUp', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Patient', 'Type': 'PatientState', 'Value': 'Leaving', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Patient', 'Type': 'PatientState', 'Value': 'OutOfBed', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Patient', 'Type': 'PatientState', 'Value': 'NoCheckIn', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },

    { 'Class': 'Patient', 'Type': 'RepositionRequest', 'Value': 'On', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Patient', 'Type': 'RepositionRequest', 'Value': 'Off', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },

    { 'Class': 'System', 'Type': 'BoxTransmissionStatus', 'Value': 'Normal', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'System', 'Type': 'BoxTransmissionStatus', 'Value': 'Poor', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'System', 'Type': 'BoxTransmissionStatus', 'Value': 'None', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },

    { 'Class': 'Device', 'Type': 'PadConnectionStatus', 'Value': 'Connected', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Device', 'Type': 'PadConnectionStatus', 'Value': 'Disconnected', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Device', 'Type': 'PadConnectionStatus', 'Value': 'Replaced', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Device', 'Type': 'PadConnectionStatus', 'Value': 'Damaged', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Device', 'Type': 'PadConnectionStatus', 'Value': 'Normal', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },

    { 'Class': 'Device', 'Type': 'NurseMode', 'Value': 'On', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Device', 'Type': 'NurseMode', 'Value': 'Off', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Device', 'Type': 'NurseMode', 'Value': 'Reset', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
    { 'Class': 'Device', 'Type': 'NurseMode', 'Value': 'Response', 'Time': '2020-05-25T13:37:28.592999-05:00', 'BoxID': '90001', 'PatientSN': 'Patient ID' },
];

export { exampleEvents };