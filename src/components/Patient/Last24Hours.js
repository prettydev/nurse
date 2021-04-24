import { Card } from "antd";
import { Cell, Legend, PieChart, Pie, ResponsiveContainer } from 'recharts';
import { Colors } from '../../util/Colors';
import Messages from '../../Messages';
import PropTypes from 'prop-types';
import React from "react";
import { useIntl } from "react-intl";

const COLORS = {
    moving: Colors.Moving,
    resting: Colors.Resting,
    offBed: Colors.OffBed,
    unknown: Colors.Unknown,
}

const MESSAGES = {
    moving: Messages.Text_PatientDetail_ActBlock_Header_Move,
    resting: Messages.Text_PatientDetail_ActBlock_Header_Rest,
    offBed: Messages.Text_PatientDetail_ActBlock_Header_Off_bed,
    unknown: Messages.Text_PatientDetail_ActBlock_Header_Unknown,
}

function Last24Hours({totalActivityPercentages}) {
    const intl = useIntl();
    return (
        <Card
            title={intl.formatMessage(
                Messages.Text_PatientDetail_ActSunBlock_Header_Last24Hr
            )}
        >
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Legend
                        layout="vertical"
                        formatter={(value, entry, index) => {
                            const label = intl.formatMessage(
                                MESSAGES[entry.payload.activity]
                            );
                            const percent = intl.formatNumber(
                                entry.payload.percentage,
                                {style: "percent"}
                            );
                            return `${label}: ${percent}`;
                        }}
                    />
                    <Pie
                        data={totalActivityPercentages}
                        nameKey="activity"
                        dataKey="percentage"
                    >
                        {totalActivityPercentages.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.activity]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
};

Last24Hours.propTypes = {
    totalActivityPercentages: PropTypes.arrayOf(PropTypes.shape({
        activity: PropTypes.string,
        percentage: PropTypes.number,
    }))
};

export default Last24Hours;
