const moment = require('moment');

// FONTE: https://www.tabnine.com/academy/javascript/how-to-format-date/

module.exports = () => {
  const now = new Date();
  return `${moment(now).format('DD-MM-YYYY')} ${moment(now).format('LTS')}`;
};
