((timeUtils) => {

  const moment = require('moment');
  const momTz = require('moment-timezone');

  timeUtils.UTCMakeGMT0= (useDate, startOrEndOfDay) => {
    let dateAtGMT0

    if ( (startOrEndOfDay === null || startOrEndOfDay === undefined) || startOrEndOfDay === "sod"){
      dateAtGMT0 = useDate + ' 00:00:00Z'
    } else {
      dateAtGMT0 = useDate + ' 23:59:59Z'
    }

    return dateAtGMT0
  }

})(module.exports)