const moment = require('moment')
const timeUtil = require('../utils/timeUtils')

function DateRange(givenRange) {

  let dateRange = {}

  Object.defineProperty(this, 'dateRange', {
      get: () => {
        return dateRange
      },
      set: (newRange) => {
        if (newRange === null || newRange === undefined) {
          newRange = {}
        }

        // lowerUTC gaurds
        // upper and lower don't exist, set lower and upper
        if ((newRange.lowerUTC === null || newRange.lowerUTC === undefined) &&
          (newRange.upperUTC === null || newRange.upperUTC === undefined)
        ) {
          dateRange.lowerUTC = moment().utc().format('YYYY-MM-DD');
          dateRange.upperUTC = moment().utc().format('YYYY-MM-DD');
        } else if (
          (newRange.lowerUTC === null || newRange.lowerUTC === undefined) &&
          (newRange.upperUTC !== null)
        ) {
          dateRange.lowerUTC = moment(newRange.upperUTC).utc().format('YYYY-MM-DD')
        } else if (newRange.lowerUTC !== null) {
          dateRange.lowerUTC = moment(newRange.lowerUTC).utc().format('YYYY-MM-DD');
        }
        // uppUTC gaurds
        if ((newRange.lowerUTC === null || newRange.lowerUTC === undefined) &&
          (newRange.upperUTC === null || newRange.upperUTC === undefined)
        ) {
          dateRange.upperUTC = moment().utc().format('YYYY-MM-DD')
        } else if (
          (newRange.upperUTC === null || newRange.upperUTC === undefined) &&
          (newRange.lowerUTC !== null)
        ) {
          dateRange.upperUTC = moment(newRange.lowerUTC).utc().format('YYYY-MM-DD')
        } else if (newRange.upperUTC !== null) {
          dateRange.upperUTC = moment(newRange.upperUTC).utc().format('YYYY-MM-DD');
        }

      }
    }

  )
}

// }



module.exports = DateRange