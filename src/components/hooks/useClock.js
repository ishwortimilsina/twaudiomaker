import React, { useState, useEffect } from 'react';

/**
 * Function to convert a number to a string with length of at least two
 * eg: 1 => '01', 12 => '12'
 * @param {Number} num 
 */
const convertTo2Digits = (num) => {
    return num > 9 ? '' + num : '0'+ num;
};

/**
 * Function to convert a given time in seconds to a clock string
 * Eg: 3672 => '01:01:02'
 * @param {Number} time 
 */
const timeToClockString = (time) => {
    const hours = Math.floor(time/3600);
    const minutes = Math.floor((time - (hours * 3600))/60);
    const seconds = time - (hours * 3600) - (minutes * 60);

    const hoursStr = convertTo2Digits(hours);
    const minStr = convertTo2Digits(minutes);
    const secStr = convertTo2Digits(seconds);

    return `${hoursStr}:${minStr}:${secStr}`;
}

/**
 * Function to convert a clock string to a number in seconds
 * Eg: '01:01:02' => 3672
 * @param {string} clockString 
 */
const clockStringToTime = (clockString) => {
    const [hours, minutes, seconds] = clockString.split(':');
    return (Number(hours) * 3600) + (Number(minutes) * 60) + Number(seconds);
};

let timer;

export default function useClock(props){
    const [ clockString, changeClockString ] = useState(timeToClockString(props.startTime));
    const [ seconds, changeSeconds ] = useState(props.startTime);

    useEffect(() => {
        if (!props.stopClock && !props.pauseClock) {
            timer = setInterval(() => {
                changeSeconds(seconds + 1);
                changeClockString(timeToClockString(seconds + 1));
            }, 1000);
        }
        // if it's pause or stop request
        else {
            // if it's stop request, reset the clock
            if (props.stopClock) {
                changeSeconds(0);
                changeClockString(timeToClockString(0));
            }
            // clear the timer interval if it's active
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        // clear interval during component unmount
        return () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        };
    }, [props.startTime, props.stopClock, props.pauseClock, seconds]);

    return [
        seconds,
        clockString
    ];
}