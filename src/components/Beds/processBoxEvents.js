// public static PatientEvent GetPatientEvent(Models.BoxSCEvent boxSCEvent, bool IsAlertMessage = true)
// {
    
//     PatientEvent _PatientEvent = new PatientEvent();
//     try
//     {
//         bool IsSubEventCheck = false;

//         if (boxSCEvent.BoxID == "" || boxSCEvent.BoxID == "SC")
//         {
//             if (boxSCEvent.Value == "Normal")
//                 Application.Current.Resources["LineStatus"] = Enum_ConnectedStatus.Connected;
//             else if (boxSCEvent.Value == "DataHubNone")
//                 Application.Current.Resources["LineStatus"] = Enum_ConnectedStatus.DataHubNoConnection;
//             else
//                 Application.Current.Resources["LineStatus"] = Enum_ConnectedStatus.NoConnection;
//         }
//         else
//         {
//             //預設樣式
//             if (boxSCEvent.PatientSN != null && boxSCEvent.PatientSN != "")
//                 _PatientEvent = OnBedState(_PatientEvent);

//             if (boxSCEvent.SubEvents != null)
//             {
//                 if (boxSCEvent.SubEvents.DeviceSetting != null)
//                     _PatientEvent = ChangeDeviceSetting(_PatientEvent, boxSCEvent.SubEvents.DeviceSetting, boxSCEvent.SubEvents.DeviceSetting.Time, boxSCEvent.SubEvents.DeviceSetting.Value);
//             }


//             switch (boxSCEvent.Type)
//             {
//                 case "BoxTransmissionStatus":
//                     _PatientEvent = BoxTransmissionStatus(_PatientEvent, boxSCEvent.Value);
//                     break;
//                 case "PatientState":
//                     _PatientEvent = PatientState(_PatientEvent, boxSCEvent.Value, boxSCEvent.BoxID, boxSCEvent.Time);
//                     break;
//                 case "RepositionRequest":
//                     _PatientEvent = RepositionRequest(_PatientEvent, boxSCEvent.Value, boxSCEvent.BoxID, boxSCEvent.Time);
//                     break;
//                 case "PadConnectionStatus":
//                     _PatientEvent = PadConnectionStatus(_PatientEvent, boxSCEvent.Value);
//                     break;
//                 case "NurseMode":
//                     _PatientEvent = NurseMode(_PatientEvent, boxSCEvent.Value, boxSCEvent.BoxID, boxSCEvent.Time);
//                     break;
//             }


//             if (boxSCEvent.SubEvents != null)
//             {
//                 if (_PatientEvent.NotificationDisplayText == null || _PatientEvent.NotificationDisplayText == "")
//                     IsSubEventCheck = true;

//                 if (boxSCEvent.SubEvents.PatientStateOutOfBed != null && boxSCEvent.SubEvents.PatientStateOutOfBed.Time != null)
//                     _PatientEvent.Time = boxSCEvent.SubEvents.PatientStateOutOfBed.Time;

//                 if (boxSCEvent.SubEvents.BoxTransmissionStatus != null)
//                     _PatientEvent = BoxTransmissionStatus(_PatientEvent, boxSCEvent.SubEvents.BoxTransmissionStatus.Value, IsSubEventCheck);

//                 if (boxSCEvent.SubEvents.PadConnectionStatus != null)
//                     _PatientEvent = PadConnectionStatus(_PatientEvent, boxSCEvent.SubEvents.PadConnectionStatus.Value, IsSubEventCheck);

//                 //移到最前面去
//                 //if (boxSCEvent.SubEvents.DeviceSetting != null)
//                 //    _PatientEvent = ChangeDeviceSetting(_PatientEvent, boxSCEvent.SubEvents.DeviceSetting, boxSCEvent.SubEvents.DeviceSetting.Time, boxSCEvent.SubEvents.DeviceSetting.Value);
//             }

//             _PatientEvent.StatusTime = boxSCEvent.Time;
//             _PatientEvent.BoxID = boxSCEvent.BoxID;
//             _PatientEvent.PatientSN = boxSCEvent.PatientSN;

//             //依設定修改對應EventType
//             if (IsSubEventCheck && boxSCEvent.SubEvents != null)
//             {
//                 if (boxSCEvent.SubEvents.PadConnectionStatus != null)
//                 {
//                     _PatientEvent = GetEventType(_PatientEvent, boxSCEvent.SubEvents.PadConnectionStatus.Class, boxSCEvent.SubEvents.PadConnectionStatus.Type, boxSCEvent.SubEvents.PadConnectionStatus.Value);
//                 }
//                 else if (boxSCEvent.SubEvents.BoxTransmissionStatus != null)
//                 {
//                     _PatientEvent = GetEventType(_PatientEvent, boxSCEvent.SubEvents.BoxTransmissionStatus.Class, boxSCEvent.SubEvents.BoxTransmissionStatus.Type, boxSCEvent.SubEvents.BoxTransmissionStatus.Value);
//                 }
//                 else
//                 {
//                     _PatientEvent = GetEventType(_PatientEvent, boxSCEvent.Class, boxSCEvent.Type, boxSCEvent.Value);
//                 }
//             }
//             else
//             {
//                 _PatientEvent = GetEventType(_PatientEvent, boxSCEvent.Class, boxSCEvent.Type, boxSCEvent.Value);
//             }


//             //設定BedNo、PadInfo
//             _PatientEvent = GetBedNo(_PatientEvent, boxSCEvent.Type, boxSCEvent.Value, boxSCEvent.Time);

//         }
//     }
//     catch
//     {
//         _PatientEvent = null;
//     }

//     return _PatientEvent;
// }