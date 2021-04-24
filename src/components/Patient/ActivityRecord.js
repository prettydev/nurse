import { Bar, BarChart, Legend, ResponsiveContainer, XAxis } from 'recharts';
import { Card, DatePicker } from "antd";
import { Colors } from '../../util/Colors';
import Messages from '../../Messages';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from "react";
import { useIntl } from "react-intl";
import DaySelector from './DaySelector';

function ActivityRecord({date, onDateChange, activityData}) {
    const intl = useIntl();
    const activityDatePicker = (
        <DaySelector date={date} onDateChange={onDateChange} />
    );
    return (
        <Card
          title={[
              intl.formatMessage(Messages.Text_PatientDetail_ActBlock_Header_ACTIVITY),
              intl.formatMessage(Messages.Text_PatientDetail_ActBlock_Header_HISTORY),
          ].join(' ')}
          extra={activityDatePicker}
        >
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={activityData} >
                    <XAxis />
                    <Legend />
                    <Bar
                        name={intl.formatMessage(
                            Messages.Text_PatientDetail_ActBlock_Header_Off_bed
                        )}
                        stackId="hour"
                        dataKey="offBed"
                        fill={Colors.OffBed}
                    />
                    <Bar
                        name={intl.formatMessage(
                            Messages.Text_PatientDetail_ActBlock_Header_Move
                        )}
                        stackId="hour"
                        dataKey="moving"
                        fill={Colors.Moving}
                    />
                    <Bar
                        name={intl.formatMessage(
                            Messages.Text_PatientDetail_ActBlock_Header_Rest
                        )}
                        stackId="hour"
                        dataKey="resting"
                        fill={Colors.Resting}
                    />

                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

ActivityRecord.propTypes = {
    date: PropTypes.instanceOf(moment),
    onDateChange: PropTypes.func.isRequired,
    activityData: PropTypes.arrayOf(PropTypes.shape({
        hour: PropTypes.number.isRequired,
        moving: PropTypes.number.isRequired,
        resting: PropTypes.number.isRequired,
        offBed: PropTypes.number.isRequired,
    }))
};

export default ActivityRecord;
