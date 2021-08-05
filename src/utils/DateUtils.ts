import moment from 'moment';

const getTodayDateAsString = () => {
    return moment().format('YYYYMMDD.HH:mm:ss');
}


export {
    getTodayDateAsString
}