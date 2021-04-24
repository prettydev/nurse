import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const getDurationFrom = (datetime) => {
    let diff = moment().diff(moment(datetime));
    if(diff < 0) diff = 0;
    const duration = moment.duration(diff);
    const hours = Math.floor(duration.asHours());
    if (hours < 24) {
        const minutes = Math.floor(duration.asMinutes() - 60 * hours);
        const seconds = Math.floor(duration.asSeconds() - 60 * minutes - 3600 * hours);
        return `${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
    } else {
        const days = Math.floor(duration.asDays());
        return `${days}D ${Math.floor(hours - 24*days)}H`
    }
}

const Timer = ({ startTime }) => {
    const [duration, setDuration] = useState(getDurationFrom(startTime));
    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(getDurationFrom(startTime));
        }, 1000);
        return () => clearInterval(interval);
    }, [duration]);
    return <span>{duration}</span>;
};

Timer.propTypes = {
    startTime: PropTypes.string.isRequired,
};

export default Timer;
