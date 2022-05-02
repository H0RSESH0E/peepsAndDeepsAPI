const moment = require('moment');

module.exports = {
    format_date: dateValue => {
        return `${moment(dateValue).format('MMMM Do YYYY, h:mm:ss a')}`;
    }
};