# Date Range Class

## /src/class/DateRange.js

The class is made to hold an upper and lower date in format `YYYY-MM-DD` format, guard against null values and give definitive values for end-of-day, 23:59:59 and start-of-day , 00:00:00 in both UTC and EPOCH versions. The resulting object instance and it's properties would be:

```js
{
  "lowerUTC": "2018-10-26",
  "upperUTC": "2018-10-26",
  "sodUTC": "2018-10-26T00:00:00Z",
  "eodUTC": "2018-10-26T23:59:59Z",
  "sodEPOCH": "1540512000",
  "eodEPOCH": "1540598399"
}
```

Monday 5/21/2018 
Modified code for DateRange to be a function constructor instead of an es6 class, with private property dateRange object which holds the uppper and lower UTC.
Also used the Object.defineProperty for the this instance using get and set with validation, to remove the thi.getDateRange() and this.setDateRange() methods used in previous commit
modified tests to match new format,
Also updated the Person constructor function and updated test to match updates.
Thu 05/17/2018 code completed for:
* created class to take in any (either/or) start and end date and setting values for both as !null in format YYYY-MM-DD
* class validates date supplied as not null
Thu 05/17/2018 code completed for:
* created Class, DateRange.js, takes in either/or start & end date, then sets values for both in format YYYY-MM-DD
* class guards members against null values
* made tests for DateRange class which includes the utils helper

* created util for adding hours to above class's to given DateRange, hours are 'sod', StartOfDay, 'eod', EndOfDate as T00:00:00Z and T23:59:59, respectively
* created file, loopWeekly.js, to loop a provided date range, segmented into weekly intervals and converts all dates to EPOCH time, as will be needed for mongodb query.
* code being reviewed by Carlos now
* [results for loop](https://www.dropbox.com/s/mfi4br9tte5kcv7/2018-05-17_09-30-19.png?dl=0)
* [tests on DateRange](https://www.dropbox.com/s/r5lf31ye2mrmbtx/2018-05-17_10-08-54.png?dl=0 )
* [repo](https://github.com/tradingbills/_93_zen/blob/master/src/loopWeekly.js)
