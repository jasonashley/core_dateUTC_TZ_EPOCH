Monday 5/21/2018 
Modified code for DateRange to be a function constructor instead of an es6 class, with private property dateRange object which holds the uppper and lower UTC.
Also used the Object.defineProperty for the this instance using get and set with validation, to remove the thi.getDateRange() and this.setDateRange() methods used in previous commit
modified tests to match new format,
Also updated the Person constructor function and updated test to match updates.
Thu 05/17/2018 code completed for:
* created class to take in any (either/or) start and end date and setting values for both as !null in format YYYY-MM-DD
* class validates date supplied as not null
* created util for adding hours to above class's to given DateRange, hours are 'sod', StartOfDay, 'eod', EndOfDate as T00:00:00Z and T23:59:59, respectively
* made file to loop through entire date range given, segment by weekly intervals and convert all dates to EPOCH time, as will be needed for mongodb query.
* made tests for DateRange class which includes the utils helper 
* code being reviewed by Carlos now
* [results for loop](https://www.dropbox.com/s/mfi4br9tte5kcv7/2018-05-17_09-30-19.png?dl=0)
* [tests on DateRange](https://www.dropbox.com/s/r5lf31ye2mrmbtx/2018-05-17_10-08-54.png?dl=0 )
* [repo](https://github.com/tradingbills/_93_zen/blob/master/src/loopWeekly.js)
