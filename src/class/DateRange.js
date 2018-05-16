const moment = require('moment')

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
      this._time.lowerUTC = moment().format('YYYY-MM-DD')
    } else if ((givenRange.lowerUTC === null || givenRange.lowerUTC === undefined) &&
      (givenRange.upperUTC !== null)
    ) {
      this._time.lowerUTC = moment(givenRange.upperUTC).format('YYYY-MM-DD')
    } else if (givenRange.lowerUTC !== null) {
      this._time.lowerUTC = givenRange.lowerUTC
    }
      // set end of day hours:min:sec to lowerUTC
    if (this._time.lowerUTC.length === 10) {
      this._time.lowerUTC += " 00:00:00"
    }

    // upperUTC, gaurd against null and set
    if ((givenRange.lowerUTC === null || givenRange.lowerUTC === undefined) &&
      (givenRange.upperUTC === null || givenRange.upperUTC === undefined)
    ) {
      this._time.upperUTC = moment().format('YYYY-MM-DD')
    } else if ((givenRange.upperUTC === null || givenRange.upperUTC === undefined) &&
      (givenRange.lowerUTC !== null)
    ) {
      this._time.upperUTC = moment(givenRange.lowerUTC).format('YYYY-MM-DD')
    } else if (givenRange.upperUTC !== null) {
      this._time.upperUTC = givenRange.upperUTC
    }

      // set end of day hours:min:sec to upperUTC
    if (this._time.upperUTC.length === 10) {
      this._time.upperUTC += " 23:59:59"
    }
  }

}

module.exports = TimeRange
