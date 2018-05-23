const moment = require('moment')
const timeUtil = require('../utils/timeUtils')

function DateRange() {

  let _dateRange = {lowerUTC:"", upperUTC:""}

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

      }
    }

  )
}

// }



module.exports = DateRange