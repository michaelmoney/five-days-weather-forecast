/* eslint-disable no-mixed-operators */
import moment from 'moment';

const getDateFromUnixTimeStamp = timestamp =>
{
    const date = moment.unix(timestamp);
    return {
        dayOfWeek: date.format('dddd'),
        dayOfMonth: date.format('Do'),
        month: date.format('MMMM'),
    };
};

const getIconByCode = code =>
{
    if (code >= 200 && code <= 232) {
        return '11d';
    } else if (code >= 300 && code <= 321 || code >= 521 && code <= 531) {
        return '09d';
    } else if (code >= 500 && code <= 504) {
        return '10d';
    } else if (code === 511 || code >= 600 && code <= 622) {
        return '13d';
    } else if (code >= 701 && code <= 781) {
        return '50d';
    } else if (code === 800) {
        return '01d';
    } else if (code === 801) {
        return '02d';
    } else if (code === 802) {
        return '03d';
    } else if (code === 803 || code === 804) {
        return '04d';
    }
};

export {
    getDateFromUnixTimeStamp,
    getIconByCode
};