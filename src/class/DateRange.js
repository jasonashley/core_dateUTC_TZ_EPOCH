const moment = require('moment')
const timeUtil = require('../utils/timeUtils')

class TimeRange {

  constructor() {
    this._time = {
      "lowerUTC": "",
      "upperUTC": ""
    }
  }

  getTime() {
    return this._time
  }
  setTime(givenRange) {
    if (givenRange === null || givenRange === undefined) {
      givenRange = {}
    }

    // lowerUTC, gaurd against null and set
    if ((givenRange.lowerUTC === null || givenRange.lowerUTC === undefined) &&
      (givenRange.upperUTC === null || givenRange.upperUTC === undefined)
    ) {
      let tempTime = moment().utc().format('YYYY-MM-DD')
      this._time.lowerUTC = tempTime
    } else if ((givenRange.lowerUTC === null || givenRange.lowerUTC === undefined) &&
      (givenRange.upperUTC !== null)
    ) {
      this._time.lowerUTC = moment(givenRange.upperUTC).utc().format('YYYY-MM-DD');
    } else if (givenRange.lowerUTC !== null) {
      this._time.lowerUTC = givenRange.lowerUTC
    }

  // upperUTC, gaurd against null and set
  if ((givenRange.lowerUTC === null || givenRange.lowerUTC === undefined) &&
    (givenRange.upperUTC === null || givenRange.upperUTC === undefined)
  ) {
    this._time.upperUTC = moment().format('YYYY-MM-DDT23:59:59Z')
  } else if ((givenRange.upperUTC === null || givenRange.upperUTC === undefined) &&
    (givenRange.lowerUTC !== null)
  ) {
    this._time.upperUTC = moment(givenRange.lowerUTC).format('YYYY-MM-DDT23:59:59Z')
  } else if (givenRange.upperUTC !== null) {
    this._time.upperUTC = givenRange.upperUTC
  }

  // set end of day hours:min:sec to upperUTC
  if (this._time.upperUTC.length === 10) {
    this._time.upperUTC += "T23:59:59Z"
  }
}

}

module.exports = TimeRange