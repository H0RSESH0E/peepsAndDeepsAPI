const moment = require('moment');

module.exports = {
    formatDate(dateValue) {
        return `${moment(dateValue).format('MMMM Do YYYY, h:mm:ss a')}`;
    }
};