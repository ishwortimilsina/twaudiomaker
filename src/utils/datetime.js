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
 * Eg: 3672000 => '01:01:02'
 * @param {Number} millTime 
 */
export const millToClockString = (millTime) => {
    const time = Math.ceil(Number(millTime) / 1000);
    const hours = Math.floor(time/3600);
    const minutes = Math.floor((time - (hours * 3600))/60);
    const seconds = time - (hours * 3600) - (minutes * 60);

    const hoursStr = convertTo2Digits(hours);
    const minStr = convertTo2Digits(minutes);
    const secStr = convertTo2Digits(seconds);

    return `${hoursStr}:${minStr}:${secStr}`;
};

/**
 * Function to convert a clock string to a number in seconds
 * Eg: '01:01:02' => 3672000
 * @param {string} clockString 
 */
export const clockStringToMill = (clockString) => {
    const [hours, minutes, seconds] = clockString.split(':');
    return ((Number(hours) * 3600) + (Number(minutes) * 60) + Number(seconds)) * 1000;
};