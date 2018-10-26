const moment = require('moment')
const timeUtil = require('../utils/timeUtils')

function DateRange() {

  let _dateRange = {lowerUTC:"", upperUTC:"", sodUTC:"", eodUTC:"", sodEPOCH:"", eodEPOCH:""}

  Object.defineProperty(this, 'dateRange', {
      get: () => {
        return _dateRange
      },
      set: (newRange) => {
        if (newRange === null || newRange === undefined) {
          newRange = {}
        }

        // lowerUTC gaurds
        if ((newRange.lowerUTC === null || newRange.lowerUTC === undefined) &&
          (newRange.upperUTC === null || newRange.upperUTC === undefined)
        ) {
          _dateRange.lowerUTC = moment().utc().format('YYYY-MM-DD');
          _dateRange.upperUTC = moment().utc().format('YYYY-MM-DD');
        } else if (
          (newRange.lowerUTC === null || newRange.lowerUTC === undefined) &&
          (newRange.upperUTC !== null)
        ) {
          _dateRange.lowerUTC = moment(newRange.upperUTC).utc().format('YYYY-MM-DD')
        } else if (newRange.lowerUTC !== null) {
          _dateRange.lowerUTC = moment(newRange.lowerUTC).utc().format('YYYY-MM-DD');
        }
        // uppUTC gaurds
        if ((newRange.lowerUTC === null || newRange.lowerUTC === undefined) &&
          (newRange.upperUTC === null || newRange.upperUTC === undefined)
        ) {
          _dateRange.upperUTC = moment().utc().format('YYYY-MM-DD')
        } else if (
          (newRange.upperUTC === null || newRange.upperUTC === undefined) &&
          (newRange.lowerUTC !== null)
        ) {
          _dateRange.upperUTC = moment(newRange.lowerUTC).utc().format('YYYY-MM-DD')
        } else if (newRange.upperUTC !== null) {
          _dateRange.upperUTC = moment(newRange.upperUTC).utc().format('YYYY-MM-DD');
        }

        _dateRange.sodUTC= _dateRange.lowerUTC + 'T00:00:00Z'
        _dateRange.eodUTC= _dateRange.upperUTC + 'T23:59:59Z'
        _dateRange.sodEPOCH = moment.utc(_dateRange.sodUTC).format("X");
        _dateRange.eodEPOCH = moment.utc(_dateRange.eodUTC).format("X")
      }
    }

  )
}

// }



module.exports = DateRange