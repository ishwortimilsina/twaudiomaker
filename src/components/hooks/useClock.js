import React, { useState, useEffect } from 'react';
import { millToClockString } from '../../utils/datetime';

let timer;

export default function useClock(props){
    const [ clockString, changeClockString ] = useState(millToClockString(props.startTime));
    const [ seconds, changeSeconds ] = useState(props.startTime);

    useEffect(() => {
        if (!props.stopClock && !props.pauseClock) {
            timer = setInterval(() => {
                changeSeconds(seconds + 1);
                changeClockString(millToClockString(seconds + 1));
            }, 1000);
        }
        // if it's pause or stop request
        else {
            // if it's stop request, reset the clock
            if (props.stopClock) {
                changeSeconds(0);
                changeClockString(millToClockString(0));
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