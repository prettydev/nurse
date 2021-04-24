import { Card, DatePicker } from "antd";
import { Colors } from '../../util/Colors';
import { FormattedMessage, useIntl } from "react-intl";
import Messages from '../../Messages';
import React from "react";
import { EventImg } from './eventDisplay.js'
import DaySelector from "./DaySelector";
import './EventRecord.scss';

const ROWS = [
    {
        key: 'stirring',
        message: Messages.Text_PatientDetail_EventBlock_Header_Stirring,
    },
    {
        key: 'sittingUp',
        message: Messages.Text_PatientDetail_EventBlock_Header_Sittingup,
    },
    {
        key: 'leaving',
        message: Messages.Text_PatientDetail_EventBlock_Header_Leaving,
    },
    {
        key: 'outOfBed',
        message: Messages.Text_PatientDetail_EventBlock_Header_OutofBed,
    },
    {
        key: 'nurseModeResponse',
        message: Messages.Text_PatientDetail_EventBlock_Bottom_Reset,
    },
    {
        key: 'nurseModeOn',
        message: Messages.Text_PatientDetail_EventBlock_Bottom_Nursemode,
    },
    {
        key: 'return',
        message: Messages.Text_PatientDetail_EventBlock_Header_Return,
    },
    {
        key: 'repositionOn',
        message: Messages.Text_PatientDetail_EventBlock_Header_Reposition,
    },
    {
        key: 'repositionMinor',
        message: Messages.Text_PatientDetail_EventBlock_Bottom_MinorReposition,
    },
    {
        key: 'repositionMajor',
        message: Messages.Text_PatientDetail_EventBlock_Bottom_ExcellentReposition,
    },
    {
        key: 'immobilization',
        message: Messages.Text_PatientDetail_EventBlock_Header_Immobile,
    },
];

function EventRecord({ date, onDateChange, eventData }) {
    const intl = useIntl();
    const eventDatePicker = (
        <DaySelector date={date} onDateChange={onDateChange} />
    );

    return (
        <Card
            title={[
                intl.formatMessage(Messages.Text_PatientDetail_EventBlock_Header_EVENT),
                intl.formatMessage(Messages.Text_PatientDetail_EventBlock_Header_RECORDS),
            ].join(' ')}
            extra={eventDatePicker}
            >
            <div className="frozenContainer">
                <table>
                    <thead>
                        <tr>
                        <th className="headcol" style={{zIndex: 3}}>&nbsp;</th>
                            {[...Array(24).keys()].map(hour => (
                                <th key={hour} colSpan="3">
                                    {/* We want to move the time label over half a
                                column. Since the header cell spans three
                                columns, that's half of one third */}
                                    <span style={{ position: 'relative', right: '16.667%' }}>
                                        {hour}:00
                                </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody style={{marginLeft: '11em'}}>
                        {ROWS.map(({ key: rowKey, message }) => (
                            <tr key={rowKey} className="rowheight">
                                <th className="headcol">
                                    <div>
                                        <img src={EventImg[rowKey]} alt='' />
                                        <FormattedMessage {...message} />
                                    </div>
                                </th>
                                {[...Array(24).keys()].map(hour => (
                                    ['00', '20', '40'].map(partition => {
                                        const columnKey = `${hour}:${partition}`;
                                        const events = eventData[columnKey] || {};
                                        const cellData = events[rowKey] || {};
                                        const img = cellData.img || null;
                                        return (
                                            <td
                                                key={columnKey}
                                                style={{
                                                    borderStyle: 'solid',
                                                    borderColor: Colors.GrayL95,
                                                    borderWidth: 'thin',
                                                }}
                                            >
                                                <div style={{ width: 35 }}>
                                                    <img src={img} alt='' />
                                                </div>
                                            </td>
                                        );
                                    })
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default EventRecord;
