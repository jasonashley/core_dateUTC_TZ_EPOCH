const moment = require("moment");
const timeUtil = require("../utils/timeUtils");

function DateRange() {
  let _dateRange = {
    lowerUTC: "",
    upperUTC: "",
    sodUTC: "",
    eodUTC: "",
    sodEPOCH: "",
    eodEPOCH: ""
  };
  let _testDate = function(dateString) {
    let dateRegex = /^[12]{1}\d{3}-?(0[1-9]{1}|1[012]{1})-?[123]{1}[0-9]{1}$/;
    return dateRegex.test(dateString);
  };

  Object.defineProperty(this, "dateRange", {
    get: () => {
      return _dateRange;
    },
    set: newRange => {
      if (newRange === null || newRange === undefined) {
        newRange = {};
      }

      // lowerUTC gaurds
      if (
        (newRange.lowerUTC === null || newRange.lowerUTC === undefined) &&
        (newRange.upperUTC === null || newRange.upperUTC === undefined)
      ) {
        _dateRange.lowerUTC = moment.utc().format("YYYY-MM-DD");
        _dateRange.upperUTC = moment.utc().format("YYYY-MM-DD");
      } else if (
        (newRange.lowerUTC === null || newRange.lowerUTC === undefined) &&
        newRange.upperUTC !== null
      ) {
        _dateRange.lowerUTC = moment
          .utc(newRange.upperUTC)
          .format("YYYY-MM-DD");
      } else if (newRange.lowerUTC !== null) {
        _dateRange.lowerUTC = moment
          .utc(newRange.lowerUTC)
          .format("YYYY-MM-DD");
      }
      // uppUTC gaurds
      if (
        (newRange.lowerUTC === null || newRange.lowerUTC === undefined) &&
        (newRange.upperUTC === null || newRange.upperUTC === undefined)
      ) {
        _dateRange.upperUTC = moment.utc().format("YYYY-MM-DD");
      } else if (
        (newRange.upperUTC === null || newRange.upperUTC === undefined) &&
        newRange.lowerUTC !== null
      ) {
        // if (_testDate(_dateRange.lowerUTC)) {
          _dateRange.upperUTC = moment
            .utc(newRange.lowerUTC)
            .format("YYYY-MM-DD");
        // }
      } else if (newRange.upperUTC !== null) {
        _dateRange.upperUTC = moment
          .utc(newRange.upperUTC)
          .format("YYYY-MM-DD");
      }

      _dateRange.sodUTC = _dateRange.lowerUTC + "T00:00:00Z";
      _dateRange.eodUTC = _dateRange.upperUTC + "T23:59:59Z";
      _dateRange.sodEPOCH = moment.utc(_dateRange.sodUTC).format("X");
      _dateRange.eodEPOCH = moment.utc(_dateRange.eodUTC).format("X");
    }
  });
}

// }

module.exports = DateRange;
