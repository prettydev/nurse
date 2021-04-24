import { defineMessages } from "react-intl";

export default defineMessages({
    // Version Dashboard_3.2.1-1_20190423

    // UserRole
    Text_UserRoleType_G: { id: 'Text-UserRoleType-G', defaultMessage: 'Guest' },
    Text_UserRoleType_P: { id: 'Text-UserRoleType-P', defaultMessage: 'Nurse' },
    Text_UserRoleType_M: { id: 'Text-UserRoleType-M', defaultMessage: 'Manager' },
    Text_UserRoleType_S: { id: 'Text-UserRoleType-S', defaultMessage: 'System Administrator' },

    Text_UserRoleID_0: { id: 'Text-UserRoleID-0', defaultMessage: 'Guest' },
    Text_UserRoleID_1: { id: 'Text-UserRoleID-1', defaultMessage: 'System Administrator' },
    Text_UserRoleID_2: { id: 'Text-UserRoleID-2', defaultMessage: 'Manager' },
    Text_UserRoleID_3: { id: 'Text-UserRoleID-3', defaultMessage: 'Nurse' },

    // Event Message
    Text_Event_PoorTransmission: { id: 'Text-Event-PoorTransmission', defaultMessage: 'Poor Transmission' },
    Text_Event_NoTransmission: { id: 'Text-Event-NoTransmission', defaultMessage: 'No Transmission' },
    Text_Event_Immobile: { id: 'Text-Event-Immobile', defaultMessage: 'Immobile' },
    Text_Event_Stirring: { id: 'Text-Event-Stirring', defaultMessage: 'Stirring' },
    Text_Event_SittingUp: { id: 'Text-Event-SittingUp', defaultMessage: 'Sitting Up' },
    Text_Event_Leaving: { id: 'Text-Event-Leaving', defaultMessage: 'Leaving' },
    Text_Event_OutofBed: { id: 'Text-Event-OutofBed', defaultMessage: 'Out of Bed' },
    Text_Event_Reposition: { id: 'Text-Event-Reposition', defaultMessage: 'Reposition' },
    Text_Event_SensorDisconnected: { id: 'Text-Event-SensorDisconnected', defaultMessage: 'Sensor Module ' },
    Text_Event_SensorDisconnected2: { id: 'Text-Event-SensorDisconnected2', defaultMessage: 'Disconnected' },
    Text_Event_SensorReplaced: { id: 'Text-Event-SensorReplaced', defaultMessage: 'Replace ' },
    Text_Event_SensorReplaced2: { id: 'Text-Event-SensorReplaced2', defaultMessage: 'Sensor Module' },
    Text_Event_SensorDamaged: { id: 'Text-Event-SensorDamaged', defaultMessage: 'SensorModule Defective' },
    Text_Event_PatientCheck_in: { id: 'Text-Event-PatientCheck-in', defaultMessage: 'Patient Check-in' },
    Text_Event_NurseMode: { id: 'Text-Event-NurseMode', defaultMessage: 'Nurse Mode' },
    Text_Event_InUse: { id: 'Text-Event-InUse', defaultMessage: 'In Use' },
    Text_Event_NotOnBed: { id: 'Text-Event-NotOnBed', defaultMessage: 'Not on Bed' },

    Text_Tool_Poor_Transmission: { id: 'Text-Tool-Poor_Transmission', defaultMessage: 'Poor Transmission' },
    Text_Tool_SensorModule_Defective: { id: 'Text-Tool-SensorModule_Defective', defaultMessage: 'Sensor Module Defective' },
    Text_Tool_Full_Circle: { id: 'Text-Tool-Full_Circle', defaultMessage: 'The Sensor Module has exceeded its lifetime use.' },
    Text_Tool_Degree270_Circle: { id: 'Text-Tool-Degree270_Circle', defaultMessage: 'The Sensor Module is reaching its lifetime use.' },

    // PatientList
    Text_AlertMessage_LED_Close: { id: 'Text-AlertMessage-LED-Close', defaultMessage: 'Off' },
    Text_AlertMessage_LED_Light: { id: 'Text-AlertMessage-LED-Light', defaultMessage: 'Dim' },
    Text_AlertMessage_LED_Full: { id: 'Text-AlertMessage-LED-Full', defaultMessage: 'Bright' },

    Text_AlertMessage_Volume_No: { id: 'Text-AlertMessage-Volume-No', defaultMessage: 'Mute' },
    Text_AlertMessage_Volume_Low: { id: 'Text-AlertMessage-Volume-Low', defaultMessage: 'Normal' },
    Text_AlertMessage_Volume_Loud: { id: 'Text-AlertMessage-Volume-Loud', defaultMessage: 'Loud' },

    Text_AlertMessage_Language_English: { id: 'Text-AlertMessage-Language-English', defaultMessage: 'English' },
    Text_AlertMessage_Language_Spanish: { id: 'Text-AlertMessage-Language-Spanish', defaultMessage: 'Spanish' },
    Text_AlertMessage_Language_Chinese: { id: 'Text-AlertMessage-Language-Chinese', defaultMessage: 'Chinese' },
    Text_AlertMessage_Language_Taiwanese: { id: 'Text-AlertMessage-Language-Taiwanese', defaultMessage: 'Taiwanese' },
    Text_AlertMessage_Language_Music: { id: 'Text-AlertMessage-Language-Music', defaultMessage: 'Music' },
    Text_AlertMessage_Language_Other: { id: 'Text-AlertMessage-Language-Other', defaultMessage: 'Other' },

    // Common Month
    Text_Month_01: { id: 'Text-Month-01', defaultMessage: 'Jan' },
    Text_Month_02: { id: 'Text-Month-02', defaultMessage: 'Feb' },
    Text_Month_03: { id: 'Text-Month-03', defaultMessage: 'Mar' },
    Text_Month_04: { id: 'Text-Month-04', defaultMessage: 'Apr' },
    Text_Month_05: { id: 'Text-Month-05', defaultMessage: 'May' },
    Text_Month_06: { id: 'Text-Month-06', defaultMessage: 'Jun' },
    Text_Month_07: { id: 'Text-Month-07', defaultMessage: 'Jul' },
    Text_Month_08: { id: 'Text-Month-08', defaultMessage: 'Aug' },
    Text_Month_09: { id: 'Text-Month-09', defaultMessage: 'Sep' },
    Text_Month_10: { id: 'Text-Month-10', defaultMessage: 'Oct' },
    Text_Month_11: { id: 'Text-Month-11', defaultMessage: 'Nov' },
    Text_Month_12: { id: 'Text-Month-12', defaultMessage: 'Dec' },
    Text_Date: { id: 'Text-Date', defaultMessage: '.XX' },

    // Common Button Message
    Text_Button_Ok: { id: 'Text-Button-Ok', defaultMessage: 'OK' },
    Text_Button_Discard_Changes: { id: 'Text_Button_Discard_Changes', defaultMessage: 'Discard Changes' },
    Text_Button_Done: { id: 'Text-Button-Done', defaultMessage: 'Done' },
    Text_Button_Cancel: { id: 'Text-Button-Cancel', defaultMessage: 'Cancel' },
    Text_Button_Login: { id: 'Text-Button-Login', defaultMessage: 'Login' },
    Text_Button_Patient_Login: { id: 'Text-Button-Patient-Login', defaultMessage: 'Check-in' },
    Text_Button_Patient_Logout: { id: 'Text-Button-Patient-Logout', defaultMessage: 'Check-out' },
    Text_Button_Transfer: { id: 'Text-Button-Transfer', defaultMessage: 'Patient Transfer' },
    Text_Button_Progress: { id: 'Text-Button-Progress', defaultMessage: 'Proceed' },
    Text_Button_Save: { id: 'Text-Button-Save', defaultMessage: 'Save' },
    Text_Button_Change: { id: 'Text-Button-Change', defaultMessage: 'Change' },
    Text_Button_Apply: { id: 'Text-Button-Apply', defaultMessage: 'Apply' },
    Text_Button_Updated: { id: 'Text-Button-Updated', defaultMessage: 'Update' },
    Text_Button_Edit: { id: 'Text-Button-Edit', defaultMessage: 'Edit' },
    Text_Button_AddUser: { id: 'Text-Button-AddUser', defaultMessage: 'Add New User' },
    Text_Button_Add: { id: 'Text-Button-Add', defaultMessage: 'Add' },
    Text_Button_ClearMatching: { id: 'Text-Button-ClearMatching', defaultMessage: 'Clear Pairing' },
    Text_Button_UpdateMatching: { id: 'Text-Button-UpdateMatching', defaultMessage: 'Update Pairing' },
    Text_Button_Delete: { id: 'Text-Button-Delete', defaultMessage: 'Remove' },
    Text_Button_ApplySettings: { id: 'Text-Button-ApplySettings', defaultMessage: 'Apply' },

    // Common Message
    Text_Common_Bed: { id: 'Text-Common-Bed', defaultMessage: 'Bed' },
    Text_Common_On: { id: 'Text-Common-On', defaultMessage: 'On' },
    Text_Common_Off: { id: 'Text-Common-Off', defaultMessage: 'Off' },
    Text_Common_Left: { id: 'Text-Common-Left', defaultMessage: 'Left' },
    Text_Common_Right: { id: 'Text-Common-Right', defaultMessage: 'Right' },
    Text_Minutes: { id: 'Text-Minutes', defaultMessage: 'mins' },
    Text_Custom: { id: 'Text-Custom', defaultMessage: 'Custom' },
    Text_Common_Pairing: { id: 'Text-Common-Pairing', defaultMessage: 'Not Paired' },
    Text_ConnectionInterface_Etherent: { id: 'Text-ConnectionInterface-Etherent', defaultMessage: 'Etherent' },
    Text_ConnectionInterface_Wifi: { id: 'Text-ConnectionInterface-Wifi', defaultMessage: 'Wi-Fi' },
    Text_Common_Success: { id: 'Text-Common-Success', defaultMessage: 'Success' },
    Text_Common_Fail: { id: 'Text-Common-Fail', defaultMessage: 'Failure' },
    Text_Title_NotRole: { id: 'Text-Title-NotRole', defaultMessage: 'Permission Required' },
    Text_Common_NotRole: { id: 'Text-Common-NotRole', defaultMessage: 'You do not have the permission to access this function.' },
    Text_Common_Loading: { id: 'Text-Common-Loading', defaultMessage: 'Loading' },

    // Home No patient
    Text_Home_No_Patient: { id: 'Text-Home-No-Patient', defaultMessage: '&#160;' },
    Text_Home_No_Patient2: { id: 'Text-Home-No-Patient2', defaultMessage: 'Cognito' },

    // Left Alert Bar
    Text_NOTIFICATION: { id: 'Text-NOTIFICATION', defaultMessage: 'Notification List' },
    Text_SortByContent: { id: 'Text-SortByContent', defaultMessage: 'Sort By' },
    Text_SortByAlert: { id: 'Text-SortByAlert', defaultMessage: 'Sort By Alert' },
    Text_SortByTime: { id: 'Text-SortByTime', defaultMessage: 'Sort By Time' },

    // Left Connention Bar
    Text_ConnectionStatus1: { id: 'Text-ConnectionStatus1', defaultMessage: 'Connecting' },
    Text_ConnectionStatus2: { id: 'Text-ConnectionStatus2', defaultMessage: 'No Connection' },
    Text_ConnectionStatus3: { id: 'Text-ConnectionStatus3', defaultMessage: 'Connected' },
    Text_ConnectionStatus4: { id: 'Text-ConnectionStatus4', defaultMessage: 'No DataHub' },
    Text_BadsInUse: { id: 'Text-BadsInUse', defaultMessage: 'beds in use' },

    // Title Bar
    Text_Topbar_PageTitle_Back: { id: 'Text-Topbar_PageTitle_Back', defaultMessage: 'Main Page' },
    Text_Topbar_PageTitle_Back2: { id: 'Text-Topbar_PageTitle_Back2', defaultMessage: 'Back' },
    Text_Title_Search: { id: 'Text-Title-Search', defaultMessage: 'Patient ID or Bed ID' },
    Text_Title_Display: { id: 'Text-Title-Display', defaultMessage: 'Grid View' },
    Text_Title_DisplayList1: { id: 'Text-Title-DisplayList1', defaultMessage: 'Grid View' },
    Text_Title_DisplayList2: { id: 'Text-Title-DisplayList2', defaultMessage: 'List View' },
    Text_Title_SortByBedID: { id: 'Text-Title-SortByBedID', defaultMessage: 'Sort By Bed ID' },
    Text_Title_SortByCheckInTime: { id: 'Text-Title-SortByCheckInTime', defaultMessage: 'Sort By Check-in Time' },

    // Title Bar Other Funtion
    Text_Button_Patient_Transfer: { id: 'Text-Button-Patient-Transfer', defaultMessage: 'Patient Transfer' },
    Text_Button_Patient_Checkout: { id: 'Text-Button-Patient-Checkout', defaultMessage: 'Patient Check-out' },

    // Title Bar Setting
    Text_Title_User_Manager: { id: 'Text-Title_User_Manager', defaultMessage: 'User Accounts' },
    Text_Title_Box_Manager: { id: 'Text-Title_Box_Manager', defaultMessage: 'Box Pairing' },
    Text_Title_Setting: { id: 'Text-Title_Setting', defaultMessage: 'Settings' },
    Text_Title_User_Login: { id: 'Text-Title_User_Login', defaultMessage: 'User Login' },

    // Title Bar SubMenu
    Text_More_Help: { id: 'Text-More-Help', defaultMessage: 'Help' },
    Text_KPI_Dashboard: { id: 'Text-KPI-Dashboard', defaultMessage: 'KPI Dashboard' },
    Text_Box_Configuration: { id: 'Text-Box-Configuration', defaultMessage: 'Box Configuration' },
    Text_More_About: { id: 'Text-More-About', defaultMessage: 'About' },
    Text_More_Language: { id: 'Text-More-Language', defaultMessage: 'Language' },
    Text_More_ExitApp: { id: 'Text-More-ExitApp', defaultMessage: 'Exit' },
    Text_PauLine_UserSettings: { id: 'Text-PauLine-UserSettings', defaultMessage: 'User settings' },
    Text_PauLine_UserLogout: { id: 'Text-PauLine-UserLogout', defaultMessage: 'Logout' },

    // PatientList
    Text_PatientList_Bedside: { id: 'Text-PatientList-Bedside', defaultMessage: 'Bed ID' },
    Text_PatientList_Bedset: { id: 'Text-PatientList-Bedset', defaultMessage: 'Bedside Control Box Settings' },
    Text_PatientList_Warning: { id: 'Text-PatientList-Warning', defaultMessage: 'Alert Settings' },
    Text_PatientList_Alarm: { id: 'Text-PatientList-Alarm', defaultMessage: 'Control Box Information' },
    Text_PatientList_Info: { id: 'Text-PatientList-Info', defaultMessage: 'Sensor Module Information' },

    Text_PatientList_BedsideAlerts: { id: 'Text-PatientList-BedsideAlerts', defaultMessage: 'Control Box' },
    Text_PatientList_IP: { id: 'Text-PatientList-IP', defaultMessage: 'IP' },
    Text_PatientList_Hardware: { id: 'Text-PatientList-Hardware', defaultMessage: 'FW' },
    Text_PatientList_Pad: { id: 'Text-PatientList-Pad', defaultMessage: 'Pad' },

    // PatientDetail-ActBlock
    Text_PatientDetail_ActBlock_Header_ACTIVITY: { id: 'Text-PatientDetail-ActBlock-Header-ACTIVITY', defaultMessage: 'Activity' },
    Text_PatientDetail_ActBlock_Header_HISTORY: { id: 'Text-PatientDetail-ActBlock-Header-HISTORY', defaultMessage: 'Record' },
    Text_PatientDetail_ActBlock_Header_Move: { id: 'Text-PatientDetail-ActBlock-Header-Move', defaultMessage: 'Moving' },
    Text_PatientDetail_ActBlock_Header_Rest: { id: 'Text-PatientDetail-ActBlock-Header-Rest', defaultMessage: 'Resting' },
    Text_PatientDetail_ActBlock_Header_Off_bed: { id: 'Text-PatientDetail-ActBlock-Header-Off-bed', defaultMessage: 'Off Bed' },
    Text_PatientDetail_ActBlock_Header_Unknown: { id: 'Text-PatientDetail-ActBlock-Header-Unknown', defaultMessage: 'Unknown' },
    Text_PatientDetail_ActBlock_Header_Hour: { id: 'Text-PatientDetail-ActBlock-Header-Hour', defaultMessage: 'Hour' },
    Text_PatientDetail_ActBlock_NoData: { id: 'Text_PatientDetail_ActBlock_NoData', defaultMessage: 'No Data' },

    // PatientDetail-ActSunBlock
    Text_PatientDetail_ActSunBlock_Header_Last24Hr: { id: 'Text-PatientDetail-ActSunBlock-Header-Last24Hr', defaultMessage: 'Last 24 Hours' },

    // PatientDetail-EventBlock
    Text_PatientDetail_EventBlock_Header_EVENT: { id: 'Text-PatientDetail-EventBlock-Header-EVENT', defaultMessage: 'Event' },
    Text_PatientDetail_EventBlock_Header_RECORDS: { id: 'Text-PatientDetail-EventBlock-Header-RECORDS', defaultMessage: 'Record' },
    Text_PatientDetail_EventBlock_Header_Stirring: { id: 'Text-PatientDetail-EventBlock-Header-Stirring', defaultMessage: 'Stirring' },
    Text_PatientDetail_EventBlock_Header_Sittingup: { id: 'Text-PatientDetail-EventBlock-Header-Sittingup', defaultMessage: 'Sitting Up' },
    Text_PatientDetail_EventBlock_Header_Leaving: { id: 'Text-PatientDetail-EventBlock-Header-Leaving', defaultMessage: 'Leaving' },
    Text_PatientDetail_EventBlock_Header_OutofBed: { id: 'Text-PatientDetail-EventBlock-Header-OutofBed', defaultMessage: 'Out of Bed' },
    Text_PatientDetail_EventBlock_Header_Response: { id: 'Text-PatientDetail-EventBlock-Header-Response', defaultMessage: 'Response' },
    Text_PatientDetail_EventBlock_Header_Return: { id: 'Text-PatientDetail-EventBlock-Header-Return', defaultMessage: 'Return' },
    Text_PatientDetail_EventBlock_Header_Reposition: { id: 'Text-PatientDetail-EventBlock-Header-Reposition', defaultMessage: 'Reposition' },
    Text_PatientDetail_EventBlock_Header_Immobile: { id: 'Text-PatientDetail-EventBlock-Header-Immobile', defaultMessage: 'Immobile' },
    Text_PatientDetail_EventBlock_Bottom_Reset: { id: 'Text-PatientDetail-EventBlock-Bottom-Reset', defaultMessage: 'Response' },
    Text_PatientDetail_EventBlock_Bottom_Nursemode: { id: 'Text-PatientDetail-EventBlock-Bottom-Nursemode', defaultMessage: 'Nurse Mode' },
    Text_PatientDetail_EventBlock_Bottom_ExcellentReposition: { id: 'Text-PatientDetail-EventBlock-Bottom-ExcellentReposition', defaultMessage: 'Major Reposition' },
    Text_PatientDetail_EventBlock_Bottom_MinorReposition: { id: 'Text-PatientDetail-EventBlock-Bottom-MinorReposition', defaultMessage: 'Minor Reposition' },

    // PatientDetail-PressureBlock
    Text_PatientDetail_PressureBlock_PRESSURE: { id: 'Text-PatientDetail-PressureBlock-PRESSURE', defaultMessage: 'Pressure' },
    Text_PatientDetail_PressureBlock_RECORDS: { id: 'Text-PatientDetail-PressureBlock-RECORDS', defaultMessage: 'Record' },
    Text_PatientDetail_PressureBlock_Bottom_Minutes: { id: 'Text-PatientDetail-PressureBlock-Bottom-Minutes', defaultMessage: 'Pressure Duration / Minutes' },

    // BedSide-Settings
    Text_BedSide_Settings_BedsideSettings: { id: 'Text-BedSide-Settings-BedsideSettings', defaultMessage: 'Control Box Settings' },
    Text_BedSide_Settings_LightLevel1: { id: 'Text-BedSide-Settings-LightLevel1', defaultMessage: 'Control Box' },
    Text_BedSide_Settings_LightLevel2: { id: 'Text-BedSide-Settings-LightLevel2', defaultMessage: 'Brightness' },
    Text_BedSide_Settings_AlertVolume1: { id: 'Text-BedSide-Settings-AlertVolume1', defaultMessage: 'Control Box' },
    Text_BedSide_Settings_AlertVolume2: { id: 'Text-BedSide-Settings-AlertVolume2', defaultMessage: 'Volume' },
    Text_BedSide_Settings_VoiceLanguage1: { id: 'Text-BedSide-Settings-VoiceLanguage1', defaultMessage: 'Control Box' },
    Text_BedSide_Settings_VoiceLanguage2: { id: 'Text-BedSide-Settings-VoiceLanguage2', defaultMessage: 'Language' },
    Text_BedSide_Settings_SittingUpAlert1: { id: 'Text-BedSide-Settings-SittingUpAlert1', defaultMessage: 'Sitting-up' },
    Text_BedSide_Settings_SittingUpAlert2: { id: 'Text-BedSide-Settings-SittingUpAlert2', defaultMessage: 'Alert' },
    Text_BedSide_Settings_CableOrientation1: { id: 'Text-BedSide-Settings-CableOrientation1', defaultMessage: 'Cable' },
    Text_BedSide_Settings_CableOrientation2: { id: 'Text-BedSide-Settings-CableOrientation2', defaultMessage: 'Orientation' },
    Text_BedSide_Settings_CableOrientationLeft: { id: 'Text-BedSide-Settings-CableOrientationLeft', defaultMessage: 'Left' },
    Text_BedSide_Settings_CableOrientationRight: { id: 'Text-BedSide-Settings-CableOrientationRight', defaultMessage: 'Right' },

    // Alert Settings
    Text_BedSide_Settings_AlertSettings: { id: 'Text-BedSide-Settings-AlertSettings', defaultMessage: 'Dashboard Alerts' },
    Text_BedSide_Settings_MainSwitch: { id: 'Text-BedSide-Settings-MainSwitch', defaultMessage: 'Main Switch' },
    Text_BedSide_Settings_Stirring: { id: 'Text-BedSide-Settings-Stirring', defaultMessage: 'Stirring' },
    Text_BedSide_Settings_SittingUp: { id: 'Text-BedSide-Settings-SittingUp', defaultMessage: 'Sitting-up' },
    Text_BedSide_Settings_Leaving: { id: 'Text-BedSide-Settings-Leaving', defaultMessage: 'Leaving' },
    Text_BedSide_Settings_Reposition: { id: 'Text-BedSide-Settings-Reposition', defaultMessage: 'Reposition' },
    Text_BedSide_Settings_RepositionAlertTime1: { id: 'Text-BedSide-Settings-RepositionAlertTime1', defaultMessage: 'Reposition' },
    Text_BedSide_Settings_RepositionAlertTime2: { id: 'Text-BedSide-Settings-RepositionAlertTime2', defaultMessage: 'Setting' },
    Text_BedSide_Settings_RepositionAlertTime3: { id: 'Text-BedSide-Settings-RepositionAlertTime3', defaultMessage: 'Interval' },
    Text_Settings_Updated_Success: { id: 'Text_Settings_Updated_Success', defaultMessage: 'Settings updated' },

    // Dailog Reposition Alert Time
    Text_RepositionAlertTime_Title: { id: 'Text-RepositionAlertTime-Title', defaultMessage: 'Reposition Setting' },

    // Dailog Patient Checkin
    Text_Patient_Checkin_Title: { id: 'Text-Patient-Checkin-Title', defaultMessage: 'Patient Check-in' },
    Text_Patient_Checkin_PatientNumber: { id: 'Text-Patient-Checkin-PatientNumber', defaultMessage: 'Patient ID' },
    Text_Patient_Checkin_PatientMessage: { id: 'Text-Patient-Checkin-PatientMessage', defaultMessage: 'The patient is checked in at Bed XXX .' },
    Text_Patient_Checkin_PatientMessage2: { id: 'Text-Patient-Checkin-PatientMessage2', defaultMessage: 'If you continue with this check-in，the patient will be transferred to the new bed.' },
    Text_Patient_Checkin_BedSide_AlertNumber: { id: 'Text-Patient-Checkin-BedSide-AlertNumber', defaultMessage: 'Control Box ID' },
    Text_Patient_Checkin_BedSide_Type: { id: 'Text-Patient-Checkin-BedSide-Type', defaultMessage: 'Sensor Module Type' },

    // Dailog Patient Transfer Bed
    Text_Patient_Transfer_Title: { id: 'Text-Patient-Transfer-Title', defaultMessage: 'Patient Transfer' },
    Text_Patient_Transfer_Selected: { id: 'Text-Patient-Transfer-Selected', defaultMessage: 'Please select the new Bed ID：' },
    Text_Patient_Transfer_PatientNumber: { id: 'Text-Patient-Transfer-PatientNumber', defaultMessage: 'Patient ID：' },
    Text_Patient_Transfer_NowBed: { id: 'Text-Patient-Transfer-NowBed', defaultMessage: 'Current Bed ID' },
    Text_Patient_Transfer_BookBed: { id: 'Text-Patient-Transfer-BookBed', defaultMessage: 'New Bed ID' },
    Text_Patient_Transfer_NoBed: { id: 'Text-Patient-Transfer-NoBed', defaultMessage: 'There is currently no empty bed available for patient transfer.' },
    Text_Patient_Transfer_Error: { id: 'Text-Patient-Transfer-Error', defaultMessage: 'Patient Transfer Failed' },
    Text_Patient_Transfer_Error2: { id: 'Text-Patient-Transfer-Error2', defaultMessage: 'Please check whether the Control Box is connected correctly' },
    Text_Patient_Transfer_OK: { id: 'Text-Patient-Transfer-OK', defaultMessage: 'Patient has been successfully transferred from' },
    Text_Patient_Transfer_Bed: { id: 'Text-Patient-Transfer-Bed', defaultMessage: 'bed XXXBed1 to bed XXXBed2.' },

    // Dailog Patient Check-Out
    Text_Patient_CheckOut_Title: { id: 'Text-Patient-CheckOut-Title', defaultMessage: 'Patient Check-out' },
    Text_Patient_CheckOut_Message: { id: 'Text-Patient-CheckOut-Message', defaultMessage: 'Are you sure you wish to check out this patient？' },
    Text_Patient_CheckOut_PatientNumber: { id: 'Text-Patient-CheckOut-PatientNumber', defaultMessage: 'Patient ID' },
    Text_Patient_CheckOut_PatientBedNo: { id: 'Text-Patient-CheckOut-PatientBedNo', defaultMessage: 'Bed ID' },
    Text_Patient_CheckOut_Error: { id: 'Text-Patient-CheckOut-Error', defaultMessage: 'Logout failed.' },
    Text_Patient_CheckOut_Logout: { id: 'Text-Patient-CheckOut-Logout', defaultMessage: 'Bed XXXBed Patient Logout.' },

    // Dailog User Login
    Text_UserLogin_ID: { id: 'Text-UserLogin-ID', defaultMessage: 'User ID' },
    Text_UserLogin_PWD: { id: 'Text-UserLogin-PWD', defaultMessage: 'Password' },
    Text_UserLogin_ID_Required: { id: 'Text_UserLogin_ID_Required', defaultMessage: 'User ID is required' },
    Text_UserLogin_PWD_Required: { id: 'Text_UserLogin_PWD_Required', defaultMessage: 'Password is required' },
    Text_UserLogin_Forgot_PWD: { id: 'Text_UserLogin_Forgot_PWD', defaultMessage: 'Forgot Password?' },
    Text_Button_Reset_PWD: { id: 'Text_Button_Reset_PWD', defaultMessage: 'Reset Password' },
    Text_UserLogin_Reset_PWD_Email: { id: 'Text_UserLogin_Reset_PWD_Email', defaultMessage: 'Email Address' },
    Text_UserLogin_Reset_PWD_Email_Required: { id: 'Text_UserLogin_Reset_PWD_Email_Required', defaultMessage: 'Email address required.' },


    // Dailog User Logout
    Text_UserLogout_Title: { id: 'Text-UserLogout-Title', defaultMessage: 'Logout' },
    Text_UserLogout_Message: { id: 'Text-UserLogout-Message', defaultMessage: 'Are you sure you wish to logout of the Cognito？' },

    // Dailog System Logout
    Text_SystemLogout_Title: { id: 'Text-SystemLogout-Title', defaultMessage: 'Exit' },
    Text_SystemLogout_Message: { id: 'Text-SystemLogout-Message', defaultMessage: 'Are you sure you wish to exit the Cognito System？' },

    // Dailog User Settings
    Text_UserSetting_Title: { id: 'Text-UserSetting-Title', defaultMessage: 'User Settings' },
    Text_UserSetting_AutoLogoutTile: { id: 'Text-UserSetting-AutoLogoutTile', defaultMessage: 'Login Timeout Setting' },
    Text_UserSetting_AutoLogoutTime: { id: 'Text-UserSetting-AutoLogoutTime', defaultMessage: 'Login Timeout' },
    Text_UserSetting_ChangePWD: { id: 'Text-UserSetting-ChangePWD', defaultMessage: 'Change Password' },
    Text_UserSetting_OldPWD: { id: 'Text-UserSetting-OldPWD', defaultMessage: 'Old Password' },
    Text_UserSetting_NewPWD: { id: 'Text-UserSetting-NewPWD', defaultMessage: 'New Password' },
    Text_UserSetting_ConfirmNewPWD: { id: 'Text-UserSetting-ConfirmNewPWD', defaultMessage: 'Confirm Password' },

    // Dailog Change Password to Continue
    Text_ChangePassword_Title: { id: 'Text-ChangePassword-Title', defaultMessage: 'Change Password' },
    Text_ChangePassword_Message: { id: 'Text-ChangePassword-Message', defaultMessage: 'Enter a new password to access the system.' },
    Text_ChangePassword_ConfirmNewPWD: { id: 'Text-ChangePassword-ConfirmNewPWD', defaultMessage: 'Confirm Password' },
    Text_ForgotPassword_Title: { id: 'Text_ForgotPassword_Title', defaultMessage: 'Enter your email address or request a password change from your administrator.' },
    Text_ChangePassword_PWDResetCode: { id: 'Text_ChangePassword_PWDResetCode', defaultMessage: 'Password Reset Code' },
    Text_ChangePassword_PWDResetCod_Required: { id: 'Text_ChangePassword_PWDResetCod_Required', defaultMessage: 'Password Reset Code is required.' },
    Text_ChangePassword_CodeSent: { id: 'Text_ChangePassword_CodeSent', defaultMessage: 'Please enter the password reset code that was emailed to you and a new password.' },
    Text_ChangePassword_ConfirmOK: { id: 'Text-ChangePassword-ConfirmOK', defaultMessage: 'Your password has been changed. Please log in to the system with the new password.' },
    Text_ChangePassword_Confirm: { id: 'Text-ChangePassword-Text_ChangePassword_Confirm', defaultMessage: 'Your password has been changed.' },

    // Dailog Change Temporary Password to Continue
    Text_TemporaryPassword_Title: { id: 'Text-TemporaryPassword-Title', defaultMessage: 'Change Password' },
    Text_TemporaryPassword_Message1: { id: 'Text-TemporaryPassword-Message1', defaultMessage: 'Set a temporary password.' },
    Text_TemporaryPassword_Message2: { id: 'Text-TemporaryPassword-Message2', defaultMessage: 'The user will need to change their password' },
    Text_TemporaryPassword_Message3: { id: 'Text-TemporaryPassword-Message3', defaultMessage: 'immediately after the next login.' },
    Text_TemporaryPassword_NewPWD: { id: 'Text-TemporaryPassword-NewPWD', defaultMessage: 'Temporary Password' },
    Text_TemporaryPassword_ConfirmNewPWD: { id: 'Text-TemporaryPassword-ConfirmNewPWD', defaultMessage: 'Confirm Temporary Password' },

    // Dailog Legal
    Text_Legal_Title: { id: 'Text-Legal-Title', defaultMessage: 'Legal Term Announcement' },
    Text_Legal_Message: { id: 'Text-Legal-Message', defaultMessage: `Cognito Health was founded in 2012 and is dedicated to improving health and healthcare by increasing value for patients and healthcare\nsystems. The company’s primary mission is to build medical devices of high quality and reliability that improve patient outcomes and lower\nhealthcare cost. The international team at Cognito Health are experts in a variety of fields ranging from medicine, technology, and policy to\nengineering, user design, and regulatory knowledge. Our multi-faceted team helps bring unparalleled insights into the healthcare process.\nTogether with our strategic partners, we strive to develop technological innovations that empower healthcare providers in primary care\nsettings Cognito Health was created in 2012 and was dedicated to improving health and healthcare by increasing value for patients and healthcare\nsystems. The company’s primary mission is to build medical devices of high quality and reliability that improve patient outcomes and\nlower healthcare cost. The international team at Cognito Health are experts in a variety of fields ranging from medicine, technology, and policy\nto engineering, user design, and regulatory knowledge. Our multi-faceted team helps bring unparalleled insights into the healthcare process.\nTogether with our strategic partners, we strive to develop technological innovations that empower healthcare providers in primary care\nsettings. Cognito Health was created in 2012 and was dedicated to improving health and healthcare by increasing value for patients and healthcare\nsystems. The company’s primary mission is to build medical devices of high quality and reliability that improve patient outcomes and\nlower healthcare cost. The international team at Cognito Health are experts in a variety of fields ranging from medicine, technology, and policy\nto engineering, user design, and regulatory knowledge. Our multi-faceted team helps bring unparalleled insights into the healthcare process.\nTogether with our strategic partners, we strive to develop technological innovations that empower healthcare providers in primary care\nsettings.Cognito Health was created in 2012 and was dedicated to improving health and healthcare by increasing value for patients and healthcare\nsystems. The company’s primary mission is to build medical devices of high quality and reliability that improve patient outcomes and\nlower healthcare cost. The international team at Cognito Health are experts in a variety of fields ranging from medicine, technology, and policy\nto engineering, user design, and regulatory knowledge. Our multi-faceted team helps bring unparalleled insights into the healthcare process.\nTogether with our strategic partners, we strive to develop technological innovations that empower healthcare providers in primary care\nsettings. Cognito Health was created in 2012 and was dedicated to improving health and healthcare by increasing value for patients and healthcare\nsystems.`},

    // Dailog System Error
    Text_SystemError_Title: { id: 'Text-SystemError-Title', defaultMessage: 'System Abnormality Detected' },
    Text_SystemError_MessageTitle: { id: 'Text-SystemError-MessageTitle', defaultMessage: 'The system detects the following abnormality at Bed XXX：' },
    Text_SystemError_MessageContext: { id: 'Text-SystemError-MessageContext', defaultMessage: 'Please refer to the user manual for more information on troubleshooting.' },

    // Dailog System Error
    Text_Message_Title: { id: 'Text-Message-Title', defaultMessage: 'Message' },
    Text_Message_Message1: { id: 'Text-Message-Message1', defaultMessage: 'Please save the Control Box and Dashboard alert settings before leaving this page.' },

    // SensorLifeWarning Message
    Text_SensorLifeWarning_Title: { id: 'Text-SensorLifeWarning-Title', defaultMessage: 'Sensor Life Warning' },

    Text_SensorLifeWarning_exceeded: { id: 'Text-SensorLifeWarning-exceeded', defaultMessage: 'The Sensor Module on bed XXX has exceeded its lifetime use.' },
    Text_SensorLifeWarning_reaching: { id: 'Text-SensorLifeWarning-reaching', defaultMessage: 'The Sensor Module on bed XXX is reaching its lifetime use.' },

    Text_SensorLifeWarning_exceededContent: { id: 'Text-SensorLifeWarning-exceededContent', defaultMessage: 'The Sensor Module has exceeded its lifetime use.' },
    Text_SensorLifeWarning_reachingContent: { id: 'Text-SensorLifeWarning-reachingContent', defaultMessage: 'The Sensor Module is reaching its lifetime use.' },

    Text_SensorLifeWarning_Error: { id: 'Text-SensorLifeWarning-Error', defaultMessage: 'Please replace the Sensor Module and refer to the user manual for more information on troubleshooting.' },
    Text_SensorLifeWarning_Warning: { id: 'Text-SensorLifeWarning-Warning', defaultMessage: 'Please replace the Sensor Module.' },

    Text_SensorLifeWarning_Lifetime: { id: 'Text-SensorLifeWarning-Lifetime', defaultMessage: 'Time used' },
    Text_SensorLifeWarning_hrs: { id: 'Text-SensorLifeWarning-hrs', defaultMessage: 'hrs' },

    // Settings Page
    Text_Settings_Title: { id: 'Text-Settings-Title', defaultMessage: 'Settings' },
    Text_Settings_SCServer: { id: 'Text-Settings-SCServer', defaultMessage: 'SC Station IP' },
    Text_Settings_NursingStationCode: { id: 'Text-Settings-NursingStationCode', defaultMessage: 'Nurse Station' },
    Text_Settings_ShowName: { id: 'Text-Settings-ShowName', defaultMessage: 'Care Unit Name' },
    Text_Settings_LocalNetwork: { id: 'Text-Settings-LocalNetwork', defaultMessage: 'Device Network' },
    Text_Settings_LocalIP: { id: 'Text-Settings-LocalIP', defaultMessage: 'IP' },
    Text_Settings_LocalMask: { id: 'Text-Settings-LocalMask', defaultMessage: 'Subnet Mask' },
    Text_Settings_LocalGateway: { id: 'Text-Settings-LocalGateway', defaultMessage: 'Default Gateway' },
    Text_Settings_SoftwareVersion: { id: 'Text-Settings-SoftwareVersion', defaultMessage: 'Software Version' },
    Text_Settings_SCStation: { id: 'Text-Settings-SCStation', defaultMessage: 'SC Station' },
    Text_Settings_DataHub: { id: 'Text-Settings-DataHub', defaultMessage: 'DataHub' },
    Text_Settings_BackendServer: { id: 'Text-Settings-BackendServer', defaultMessage: 'Back-end Server' },
    Text_Settings_SCDashboard: { id: 'Text-Settings-SCDashboard', defaultMessage: 'Dashboard' },

    // Box Management Page
    Text_BoxManagement_Title: { id: 'Text-BoxManagement-Title', defaultMessage: 'Box Pairing' },
    Text_BoxManagement_StationTitle: { id: 'Text-BoxManagement-StationTitle', defaultMessage: 'SC Station' },
    Text_BoxManagement_Box: { id: 'Text-BoxManagement-Box', defaultMessage: 'Control Box' },
    Text_BoxManagement_Bed: { id: 'Text-BoxManagement-Bed', defaultMessage: 'Bed ID' },
    Text_BoxManagement_IP: { id: 'Text-BoxManagement-IP', defaultMessage: 'IP' },
    Text_BoxManagement_Firmware: { id: 'Text-BoxManagement-Firmware', defaultMessage: 'Firmware' },
    Text_BoxManagement_Detail: { id: 'Text-BoxManagement-Detail', defaultMessage: 'Details »' },
    Text_BoxManagement_Detail_Title: { id: 'Text-BoxManagement-Detail-Title', defaultMessage: 'Control Box Details' },
    Text_BoxManagement_Detail_BedMatching: { id: 'Text-BoxManagement-Detail-BedMatching', defaultMessage: 'Bed Pairing Settings' },
    Text_BoxManagement_Detail_LocalBed: { id: 'Text-BoxManagement-Detail-LocalBed', defaultMessage: 'Bed Number' },
    Text_BoxManagement_Detail_HardwareInfo: { id: 'Text-BoxManagement-Detail-HardwareInfo', defaultMessage: 'Hardware Information' },
    Text_BoxManagement_Detail_SensableBedsideAlerts: { id: 'Text-BoxManagement-Detail-SensableBedsideAlerts', defaultMessage: 'Control Box' },
    Text_BoxManagement_Detail_HardwareID: { id: 'Text-BoxManagement-Detail-HardwareID', defaultMessage: 'Serial Number' },
    Text_BoxManagement_Detail_IP: { id: 'Text-BoxManagement-Detail-IP', defaultMessage: 'IP' },
    Text_BoxManagement_Detail_ConnectionMethod: { id: 'Text-BoxManagement-Detail-ConnectionMethod', defaultMessage: 'Connection Method' },
    Text_BoxManagement_Detail_HardwareVersion: { id: 'Text-BoxManagement-Detail-HardwareVersion', defaultMessage: 'Hardware Version' },
    Text_BoxManagement_Detail_FirmwareVersion: { id: 'Text-BoxManagement-Detail-FirmwareVersion', defaultMessage: 'Firmware Version' },
    Text_BoxManagement_Detail_SoftwareVersion: { id: 'Text-BoxManagement-Detail-SoftwareVersion', defaultMessage: 'Software Version' },
    Text_BoxManagement_Detail_SensableSensorPad: { id: 'Text-BoxManagement-Detail-SensableSensorPad', defaultMessage: 'Sensor Pad' },
    Text_BoxManagement_Detail_HardwareID2: { id: 'Text-BoxManagement-Detail-HardwareID2', defaultMessage: 'Serial Number' },
    Text_BoxManagement_Detail_Remove: { id: 'Text-BoxManagement-Detail-Remove', defaultMessage: 'Remove Control Box' },
    Text_BoxManagement_Detail_RemoveContext: { id: 'Text-BoxManagement-Detail-RemoveContext', defaultMessage: 'Remove Control Box' },
    Text_BoxManagement_Detail_RemoveConfirm: { id: 'Text-BoxManagement-Detail-RemoveConfirm', defaultMessage: 'Are you sure you want to remove the Control Box?' },
    Text_BoxManagement_Detail_RemoveSuccess: { id: 'Text-BoxManagement-Detail-Text_BoxManagement_Detail_RemoveSuccess', defaultMessage: 'Control Box removed from Care Unit.' },
    Text_BoxManagement_Button_AddBoxesToStation: { id: 'Text_BoxManagement_Button_AddBoxesToStation', defaultMessage: 'Add Control Boxes' },
    Text_BoxManagement_Message_NoBoxesToStation: { id: 'Text_BoxManagement_Message_NoBoxesToStation', defaultMessage: 'There are no Control Boxes assigned to this Care Unit.' },
    Text_BoxManagement_Label_AvailableBoxes: { id: 'Text_BoxManagement_Label_AvailableBoxes', defaultMessage: 'Available Control Boxes' },
    Text_BoxManagement_Button_AddToStation: { id: 'Text_BoxManagement_Button_AddToStation', defaultMessage: 'Assign to Care Unit' },
    Text_BoxManagement_Detail_AssignmentError: { id: 'Text_BoxManagement_Detail_AssignmentError', defaultMessage: 'Assignment failed' },
    Text_BoxManagement_Detail_Assigned: { id: 'Text_BoxManagement_Detail_Assigned', defaultMessage: 'Assigned' },
    Text_BoxManagement_Pairing_Success: { id: 'Text_BoxManagement_Pairing_Success', defaultMessage: 'Box pairing updated.' },


    // User Management Page
    Text_UserManagement_Title: { id: 'Text-UserManagement-Title', defaultMessage: 'User Account' },
    Text_UserManagement_StationTitle: { id: 'Text-UserManagement-StationTitle', defaultMessage: 'Station' },
    Text_UserManagement_Account: { id: 'Text-UserManagement-Account', defaultMessage: 'User ID' },
    Text_UserManagement_Name: { id: 'Text-UserManagement-Name', defaultMessage: 'Name' },
    Text_UserManagement_Email: { id: 'Text-UserManagement-Email', defaultMessage: 'Email' },
    Text_UserManagement_EmailDesc1: { id: 'Text-UserManagement-EmailDesc1', defaultMessage: 'Provide an email address for this user to allow self-serve password reset.' },
    Text_UserManagement_EmailDesc2: { id: 'Text-UserManagement-EmailDesc2', defaultMessage: 'Note that if provided, email-based password reset sends a temporary password as plain text to the provided email address.' },
    Text_UserManagement_LastUpdated: { id: 'Text-UserManagement-LastUpdated', defaultMessage: 'Last Updated' },
    Text_UserManagement_Detail: { id: 'Text-UserManagement-Detail', defaultMessage: 'Details »' },
    Text_UserManagement_Detail_EditTitle: { id: 'Text-UserManagement-Detail-EditTitle', defaultMessage: 'Edit Account' },
    Text_UserManagement_Detail_AddTitle: { id: 'Text-UserManagement-Detail-AddTitle', defaultMessage: 'New Account' },
    Text_UserManagement_Detail_Title: { id: 'Text-UserManagement-Detail-Title', defaultMessage: 'Account Details' },
    Text_UserManagement_Detail_AccountInfo: { id: 'Text-UserManagement-Detail-AccountInfo', defaultMessage: 'Account Information' },
    Text_UserManagement_Detail_Name: { id: 'Text-UserManagement-Detail-Name', defaultMessage: 'Name' },
    Text_UserManagement_Detail_Email: { id: 'Text-UserManagement-Detail-Email', defaultMessage: 'Email' },
    Text_UserManagement_Detail_LoginAccount: { id: 'Text-UserManagement-Detail-LoginAccount', defaultMessage: 'Login User ID' },
    Text_UserManagement_Detail_LoginPWD: { id: 'Text-UserManagement-Detail-LoginPWD', defaultMessage: 'Login Password' },
    Text_UserManagement_Detail_ConfirmPassword: { id: 'Text-UserManagement-Detail-ConfirmPassword', defaultMessage: 'Confirm Password' },
    Text_UserManagement_Detail_Message1: { id: 'Text-UserManagement-Detail-Message1', defaultMessage: 'The user will need to change the password' },
    Text_UserManagement_Detail_Message2: { id: 'Text-UserManagement-Detail-Message2', defaultMessage: 'immediately after the next login' },
    Text_UserManagement_Detail_NursingStation: { id: 'Text-UserManagement-Detail-NursingStation', defaultMessage: 'Care Unit' },
    Text_UserManagement_Detail_AccountType: { id: 'Text-UserManagement-Detail-AccountType', defaultMessage: 'User Role' },
    Text_UserManagement_Detail_UsePeriod: { id: 'Text-UserManagement-Detail-UsePeriod', defaultMessage: 'Expiration Date' },
    Text_UserManagement_Detail_UseHistory: { id: 'Text-UserManagement-Detail-UseHistory', defaultMessage: 'Account History' },
    Text_UserManagement_Detail_LastLogin: { id: 'Text-UserManagement-Detail-LastLogin', defaultMessage: 'Last Login' },
    Text_UserManagement_Detail_LastModify: { id: 'Text-UserManagement-Detail-LastModify', defaultMessage: 'Last Modified' },
    Text_UserManagement_Detail_CreateDate: { id: 'Text-UserManagement-Detail-CreateDate', defaultMessage: 'Date Created' },
    Text_UserManagement_Detail_DeleteUser: { id: 'Text-UserManagement-Detail-DeleteUser', defaultMessage: 'Delete User Account' },
    Text_UserManagement_Detail_DeleteUserContext: { id: 'Text-UserManagement-Detail-DeleteUserContext', defaultMessage: 'Delete User Account Content' },

    // Help
    Text_Help_Title: { id: 'Text-Help-Title', defaultMessage: 'Help' },
    Text_Help_Theme: { id: 'Text-Help-Theme', defaultMessage: 'Select topic' },
    Text_Help_Theme_1: { id: 'Text-Help-Theme-1', defaultMessage: 'Dashboard Overview' },
    Text_Help_Theme_2: { id: 'Text-Help-Theme-2', defaultMessage: 'Adding Patients' },
    Text_Help_Theme_3: { id: 'Text-Help-Theme-3', defaultMessage: 'Removing Patients' },
    Text_Help_Theme_4: { id: 'Text-Help-Theme-4', defaultMessage: 'Managing Control Boxes' },
    Text_Help_Theme_5: { id: 'Text-Help-Theme-5', defaultMessage: 'Transferring Patients' },
    Text_Help_Theme_6: { id: 'Text-Help-Theme-6', defaultMessage: 'Patient Settings' },
    Text_Help_Theme_7: { id: 'Text-Help-Theme-7', defaultMessage: 'Managing User Accounts' },
    Text_Help_Theme_8: { id: 'Text-Help-Theme-8', defaultMessage: 'New User Password' },

    // About
    Text_Abour_Title: { id: 'Text-Abour-Title', defaultMessage: 'About' },
    Text_Abour_Company: { id: 'Text-Abour-Company', defaultMessage: '© Cognito Health Inc. All Rights Reserved.' },
    Text_Abour_Context: {
        id: 'Text-Abour-Context', defaultMessage: `Cognito 2.5 System is a patient safety monitoring system that provides bed exit/immobility related alerts for fall prevention and repositioning alerts for pressure injury assistance. Components of the system include the control box, sensor pad, data analytics, dashboard and mobile application.\n\nLocalization languages:\nEnglish (United States), Chinese (Traditional, Taiwan)`},

    Text_Abour_OfficialWebsite: { id: 'Text-Abour-OfficialWebsite', defaultMessage: 'Official Website' },
    Text_Abour_OfficialWebsite_URL: { id: 'Text-Abour-OfficialWebsite-URL', defaultMessage: 'https://www.cognitohealth.com/' },
    Text_Abour_TechnicalSupport: { id: 'Text-Abour-TechnicalSupport', defaultMessage: 'Technical Support' },
    Text_Abour_TechnicalSupport_URL: { id: 'Text-Abour-TechnicalSupport-URL', defaultMessage: 'https://www.cognitohealth.com/' },
    Text_Abour_TermsOfService: { id: 'Text-Abour-TermsOfService', defaultMessage: 'Terms of Service' },
    Text_Abour_LegalNotices: { id: 'Text-Abour-LegalNotices', defaultMessage: 'Legal Term Announcement' },
    Text_Abour_SystemConfigurationTitle: { id: 'Text-Abour-SystemConfigurationTitle', defaultMessage: 'Mobile App Requirement:' },
    Text_Abour_SystemConfiguration: {
        id: 'Text-Abour-SystemConfiguration', defaultMessage: `
        Android Mobile App |Android 8 or above;
        iOS Mobile App |iOS 10 or above`},

    // Software License Expired
    Text_License_Expired: { id: 'Text-License-Expired', defaultMessage: 'License Expired' },
    Text_License_DialogTile: { id: 'Text-License-DialogTile', defaultMessage: 'Software License Expired' },
    Text_License_DialogContent: { id: 'Text-License-DialogContent', defaultMessage: 'SC system software license expired. Please contact your system administrator to renew this license' },

    // Box Configuration
    Text_Title_Box_Configuration: { id: 'Text_Title_Box_Configuration', defaultMessage: 'Box Configuration' },
    Text_BoxConfig_Title_BoxStatus: { id: 'Text_BoxConfig_Title_BoxStatus', defaultMessage: 'Box Configuration Status' },
    Text_BoxConfig_Title_PrepareConfig: { id: 'Text_BoxConfig_Title_PrepareConfig', defaultMessage: 'Prepare Configuration for Box' },
    Text_BoxConfig_Button_AddProfile: { id: 'Text_BoxConfig_Button_AddProfile', defaultMessage: 'Add Network Profile' },
    Text_BoxConfig_Table_ConfigStatus: { id: 'Text_BoxConfig_Table_ConfigStatus', defaultMessage: 'Configuration Status' },
    Text_BoxConfig_Table_LastUpdate: { id: 'Text_BoxConfig_Table_LastUpdate', defaultMessage: 'Last Configuration Update' },
    Text_BoxConfig_Table_CurrentProfile: { id: 'Text_BoxConfig_Table_CurrentProfile', defaultMessage: 'Current Network Profile' },
    Text_BoxConfig_Table_PreparedProfile: { id: 'Text_BoxConfig_Table_PreparedProfile', defaultMessage: 'Desired Network Profile' },
    Text_BoxConfig_Tab_Configurations: { id: 'Text_BoxConfig_Tab_Configurations', defaultMessage: 'Configurations' },
    Text_BoxConfig_Tab_NetworkProfiles: { id: 'Text_BoxConfig_Tab_NetworkProfiles', defaultMessage: 'Network Profiles' },
    Text_BoxConfig_Text_SelectProfile: { id: 'Text_BoxConfig_Text_SelectProfile', defaultMessage: 'Select Network Profile' },
    Text_BoxConfig_Text_NetworkProfile: { id: 'Text_BoxConfig_Text_NetworkProfile', defaultMessage: 'Network Profile' },
    Text_BoxConfig_Button_Prepare: { id: 'Text_BoxConfig_Button_Prepare', defaultMessage: 'Prepare' },
    Text_BoxConfig_Text_BoxSerialNumbers: { id: 'Text_BoxConfig_Text_BoxSerialNumbers', defaultMessage: 'Box Serial Numbers' },
    Text_BoxConfig_Text_OnePerLine: { id: 'Text_BoxConfig_Text_OnePerLine', defaultMessage: 'Enter Box Serial Numbers one per line' },
    Text_BoxConfig_Text_PrepareSuccess: { id: 'Text_BoxConfig_Text_PrepareSuccess', defaultMessage: 'Boxes successfully prepared. Please proceed to Step 2.' },
    Text_BoxConfig_Text_Success: { id: 'Text_BoxConfig_Text_Success', defaultMessage: 'Success' },
    Text_BoxConfig_Text_Error: { id: 'Text_BoxConfig_Text_Error', defaultMessage: 'Error' },
    Text_BoxConfig_Text_Expired: { id: 'Text_BoxConfig_Text_Expired', defaultMessage: 'Expired' },
    Text_BoxConfig_Text_Remaining: { id: 'Text_BoxConfig_Text_Remaining', defaultMessage: 'Remaining' },
    Text_BoxConfig_Text_ProfileName: { id: 'Text_BoxConfig_Text_ProfileName', defaultMessage: 'Network Profile Name' },
    Text_BoxConfig_Text_ConnectionType: { id: 'Text_BoxConfig_Text_ConnectionType', defaultMessage: 'Connection Type' },
    Text_BoxConfig_Text_NetworkProfileDetails: { id: 'Text_BoxConfig_Text_NetworkProfileDetails', defaultMessage: 'Network Profile Details' },
    Text_BoxConfig_Text_Wifi: { id: 'Text_BoxConfig_Text_Wifi', defaultMessage: 'WiFi' },
    Text_BoxConfig_Text_SSID: { id: 'Text_BoxConfig_Text_SSID', defaultMessage: 'SSID' },
    Text_BoxConfig_Text_Encryption: { id: 'Text_BoxConfig_Text_Encryption', defaultMessage: 'Encryption' },
    Text_BoxConfig_Text_Band: { id: 'Text_BoxConfig_Text_Band', defaultMessage: 'Band' },
    Text_BoxConfig_Text_DataRate: { id: 'Text_BoxConfig_Text_DataRate', defaultMessage: 'Data Rate' },
    Text_BoxConfig_Text_Country: { id: 'Text_BoxConfig_Text_Country', defaultMessage: 'Country' },
    Text_BoxConfig_Text_Identity: { id: 'Text_BoxConfig_Text_Identity', defaultMessage: 'Identity' },
    Text_BoxConfig_Text_Password: { id: 'Text_BoxConfig_Text_Password', defaultMessage: 'Password' },
    Text_BoxConfig_Text_CreatedAt: { id: 'Text_BoxConfig_Text_CreatedAt', defaultMessage: 'Created At' },
    Text_BoxConfig_Text_CreateProfile: { id: 'Text_BoxConfig_Text_CreateProfile', defaultMessage: 'Create Network Profile' },
    Text_BoxConfig_Text_Clear: { id: 'Text_BoxConfig_Text_Clear', defaultMessage: 'Clear' },
    Text_BoxConfig_Text_ProfileCreated: { id: 'Text_BoxConfig_Text_ProfileCreated', defaultMessage: 'Network Profile Created' },
    Text_BoxConfig_Text_DeleteProfileSuccess: { id: 'Text_BoxConfig_Text_DeleteProfileSuccess', defaultMessage: 'Network Profile successfully removed.' },
    Text_BoxConfig_Text_DeleteConfigurationsSuccess: { id: 'Text_BoxConfig_Text_DeleteConfigurationsSuccess', defaultMessage: 'Box Configurations successfully removed.' },
    Text_BoxConfig_Text_Step1Instructions: { id: 'Text_BoxConfig_Text_Step1Instructions', defaultMessage: 'Create or select a Network Profile, then enter a list of control box serial numbers and click Prepare.' },
    Text_BoxConfig_Text_Step2Instructions: { id: 'Text_BoxConfig_Text_Step2Instructions', defaultMessage: 'For each prepared control box, perform the following procedure:' },
    Text_BoxConfig_Text_Step2Instructions1: { id: 'Text_BoxConfig_Text_Step2Instructions1', defaultMessage: 'Connect the control box to an ethernet cable connected to the internet.' },
    Text_BoxConfig_Text_Step2Instructions2: { id: 'Text_BoxConfig_Text_Step2Instructions2', defaultMessage: 'Hold down the control box button and plug in the power. Continue holding the control box button until the light turns blue.' },
    Text_BoxConfig_Text_Step2Instructions3: { id: 'Text_BoxConfig_Text_Step2Instructions3', defaultMessage: 'Leave box connected until you see a Success message in the table below.' },
    Text_BoxConfig_Text_InvalidPassword: { id: 'Text_BoxConfig_Text_InvalidPassword', defaultMessage: 'Only these special characters are allowed: @ ! & ^ - _ .' },

    // Error Message
    Text_ErrorMessage_E001: { id: 'Text-ErrorMessage-E001', defaultMessage: 'This column cannot be empty' },
    Text_ErrorMessage_E002: { id: 'Text-ErrorMessage-E002', defaultMessage: 'Only English letters, numbers, ".", "-", "_" are allowed.' },
    Text_ErrorMessage_E003: { id: 'Text-ErrorMessage-E003', defaultMessage: 'Input length cannot be less than 6 characters' },
    Text_ErrorMessage_E004: { id: 'Text-ErrorMessage-E004', defaultMessage: 'Input length cannot be less than 8 characters' },
    Text_ErrorMessage_E005: { id: 'Text-ErrorMessage-E005', defaultMessage: 'The passwords do not match' },
    Text_ErrorMessage_E006: { id: 'Text-ErrorMessage-E006', defaultMessage: 'New password cannot be empty' },
    Text_ErrorMessage_E007: { id: 'Text-ErrorMessage-E007', defaultMessage: 'New password may only contain English letters, numbers, ".", "-", "_".' },
    Text_ErrorMessage_E008: { id: 'Text-ErrorMessage-E008', defaultMessage: 'Password cannot be empty' },
    Text_ErrorMessage_E009: { id: 'Text-ErrorMessage-E009', defaultMessage: 'Account cannot be empty' },
    Text_ErrorMessage_E010: { id: 'Text-ErrorMessage-E010', defaultMessage: 'Datetime column error' },
    Text_ErrorMessage_E011: { id: 'Text-ErrorMessage-E011', defaultMessage: 'Password reset failed.' },
    Text_ErrorMessage_E012: { id: 'Text-ErrorMessage-E012', defaultMessage: 'Only letters and numbers are allowed.' },
    Text_ErrorMessage_E013: { id: 'Text-ErrorMessage-E013', defaultMessage: 'The maximum length is 9 characters.' },
    Text_ErrorMessage_E014: { id: 'Text-ErrorMessage-E014', defaultMessage: 'This field is required.' },
    Text_ErrorMessage_E015: { id: 'Text-ErrorMessage-E015', defaultMessage: 'Please resolve validation errors and retry.' },
    Text_ErrorMessage_E016: { id: 'Text-ErrorMessage-E016', defaultMessage: 'The maximum length is 20 characters.' },
    Text_ErrorMessage_E017: { id: 'Text-ErrorMessage-E017', defaultMessage: 'Not Found' },
    Text_ErrorMessage_E018: { id: 'Text-ErrorMessage-E018', defaultMessage: 'Sorry, the page you visited does not exist.' },
    Text_ErrorMessage_E019: { id: 'Text-ErrorMessage-E019', defaultMessage: 'A higher permission-level is required to check-in a patient.' },
    Text_ErrorMessage_E020: { id: 'Text-ErrorMessage-E020', defaultMessage: 'Session timeout. Please reload the page and try again.' },
    Text_ErrorMessage_E021: { id: 'Text-ErrorMessage-E021', defaultMessage: 'A higher permission-level is required to access patient detail page.' },

    // Error Message Code
    Text_ErrorMessage: { id: 'Text-ErrorMessage', defaultMessage: 'An Error Occurred' },
    Text_ErrorMessage_001: { id: 'Text-ErrorMessage-001', defaultMessage: 'System log-out because of a connection timeout.' },
    Text_ErrorMessage_101: { id: 'Text-ErrorMessage-101', defaultMessage: 'Wrong Account or Wrong Password.' },
    Text_ErrorMessage_102: { id: 'Text-ErrorMessage-102', defaultMessage: 'This account does not belongs to this nursing station.' },
    Text_ErrorMessage_103: { id: 'Text-ErrorMessage-103', defaultMessage: 'This account has expired.' },
    Text_ErrorMessage_104: { id: 'Text-ErrorMessage-104', defaultMessage: 'This account already exists.' },
    Text_ErrorMessage_105: { id: 'Text-ErrorMessage-105', defaultMessage: 'Old password is incorrect, please re-enter the password.' },
    Text_ErrorMessage_106: { id: 'Text-ErrorMessage-106', defaultMessage: 'Password Change Failed.' },
    Text_ErrorMessage_201: { id: 'Text-ErrorMessage-201', defaultMessage: 'Patient Check-in Failed.' },
    Text_ErrorMessage_202: { id: 'Text-ErrorMessage-202', defaultMessage: 'Patient Transfer Failed.' },
    Text_ErrorMessage_203: { id: 'Text-ErrorMessage-203', defaultMessage: 'Control Box settings and Dashboard alert settings update failed.' },
    Text_ErrorMessage_204: { id: 'Text-ErrorMessage-204', defaultMessage: 'Patient Check-out Failed.' },
    Text_ErrorMessage_300: { id: 'Text-ErrorMessage-300', defaultMessage: 'Cannot change the Control Box pairing during the Patient Check-in.' },
    Text_ErrorMessage_301: { id: 'Text-ErrorMessage-301', defaultMessage: 'The bed is already paired with other Control Box. Please re-enter another bed number.' },
    Text_ErrorMessage_302: { id: 'Text-ErrorMessage-302', defaultMessage: 'All 40 beds are paired with Control Boxes, please clear the existed pairing.' },
    Text_ErrorMessage_303: { id: 'Text-ErrorMessage-303', defaultMessage: 'Cannot clear the Control Box pairing during the Patient Check-in.' },
    Text_ErrorMessage_304: { id: 'Text-ErrorMessage-304', defaultMessage: 'Cannot remove the Control Box pairing during the Patient Check-in.' },
    Text_ErrorMessage_404: { id: 'Text-ErrorMessage-404', defaultMessage: 'Care Unit disconnect, please contact the system administrator.' },
    Text_ErrorMessage_900: { id: 'Text-ErrorMessage-900', defaultMessage: 'System error, please contact the system administrator.' },
    Text_ErrorMessage_901: { id: 'Text-ErrorMessage-901', defaultMessage: 'Another user is modifying the settings.' },
    Text_ErrorMessage_903: { id: 'Text-ErrorMessage-903', defaultMessage: 'No Corresponding Information' },
    Text_ErrorMessage_904: { id: 'Text-ErrorMessage-904', defaultMessage: 'System Update Failed' },
    Text_ErrorMessage_910: { id: 'Text-ErrorMessage-910', defaultMessage: 'Incorrect Parameter Error' },
    Text_ErrorMessage_912: { id: 'Text-ErrorMessage-912', defaultMessage: 'The bed is in use.' },
    Text_ErrorMessage_913: { id: 'Text-ErrorMessage-913', defaultMessage: 'The patient has been checked out.' },
    Text_ErrorMessage_914: { id: 'Text-ErrorMessage-914', defaultMessage: 'The patient is not checked in the system.' },
    Text_ErrorMessage_999: { id: 'Text-ErrorMessage-999', defaultMessage: 'Control Box settings and Dashboard alert settings have not been saved.' },

    // Auth Error messages
    Text_AuthErrorMessage_11: { id: 'Text_AuthErrorMessage_11', defaultMessage: 'This account or email already exists.' },
    Text_AuthErrorMessage_12: { id: 'Text_AuthErrorMessage_12', defaultMessage: 'User ID is invalid.' },

    // Box Config Error messages
    Text_BoxConfigErrorMessage_1: { id: 'Text_BoxConfigErrorMessage_1', defaultMessage: 'Resource not found' },
    Text_BoxConfigErrorMessage_11: { id: 'Text_BoxConfigErrorMessage_11', defaultMessage: 'Password must be equal to or greater than 8 characters in length.' },
    Text_BoxConfigErrorMessage_12: { id: 'Text_BoxConfigErrorMessage_12', defaultMessage: 'The length of the SSID and Identity combined must be less than 143 characters.' },
    Text_BoxConfigErrorMessage_13: { id: 'Text_BoxConfigErrorMessage_13', defaultMessage: 'A network profile already exists with this name.' },
    Text_BoxConfigErrorMessage_21: { id: 'Text_BoxConfigErrorMessage_21', defaultMessage: 'Network policies cannot be deleted for which there are existing box configurations.' },

    // Main Dashboard
    Text_Dashboard_Tab_Notifications: { id: 'Text-Dashboard-Tab-Notifications', defaultMessage: 'Notifications' },
    Text_Dashboard_Tab_AllPatients: { id: 'Text-Dashboard-Tab-AllPatients', defaultMessage: 'All Patients' },
    Text_Dashboard_Text_PatientsMonitored: { id: 'Text_Dashboard_Text_PatientsMonitored', defaultMessage: 'Patients Being Monitored' },
    Text_Dashboard_Text_Hours: { id: 'Text_Dashboard_Text_Hours', defaultMessage: 'hours' },

    // Service Discovery
    Text_System_ErrorMessage_ServiceDiscovery: { id: 'Text-System-ErrorMessage-ServiceDiscovery', defaultMessage: 'An error occurred, please reload the page.' },

    // Error state
    Text_Button_Reload: { id: 'Text_Button_Reload', defaultMessage: 'Reload' },
    Text_Button_Retry: { id: 'Text_Button_Retry', defaultMessage: 'Retry' },
    Text_System_ErrorMessage_ConnectionTitle: { id: 'Text_System_ErrorMessage_ConnectionTitle', defaultMessage: 'System Disconnected' },
    Text_System_ErrorMessage_ConnectionRetry: { id: 'Text_System_ErrorMessage_ConnectionRetry', defaultMessage: 'System connection lost. Retrying in XXX.' },

    // About
    Text_About_Title: { id: 'Text_About_Title', defaultMessage: 'Predictive Patient Monitoring' },
});
