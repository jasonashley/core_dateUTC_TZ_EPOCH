var moment = require("moment");
var DateRange = require("./class/DateRange");
var timeUtils = require("./utils/timeUtils");

let startDateArg = "2018-02-01";
let endDateArg = "2018-02-14";

// get and set entered time
let enteredDateRange = new DateRange();
enteredDateRange.dateRange = { lowerUTC: startDateArg, upperUTC: endDateArg}


// display days and weeks (note add +1 to include a full day(s)
console.log(
  "Total full days",
  moment(enteredDateRange.dateRange.eodUTC)
    .diff(enteredDateRange.dateRange.sodUTC, "days") + 1
);
let totalWeeks = Math.floor(
  (moment(enteredDateRange.dateRange.upperUTC)
    .utc()
    .diff(moment(enteredDateRange.dateRange.lowerUTC).utc(), "days") +
    1) /
    7
);
console.log("Total Weeks " + totalWeeks);
// display start and end dates, after util calculates sod, StartOfDay, and eod, EndOfDay, + show as EPOCH
console.log(
  "Start: \n",
  moment.utc(enteredDateRange.dateRange.sodUTC)
    .format("LLL"),
  moment.utc(enteredDateRange.dateRange.sodUTC)
    .format("X")
);
console.log(
  "",
  moment.utc(enteredDateRange.dateRange.eodUTC)
    .format("LLL"),
  moment.utc(enteredDateRange.dateRange.eodUTC)
    .format("X")
);

// Outer loop will be of Total Range on a weekly loop
//TODO: handle (( ( thisEndDay.diff(thisStartDay) % 7 )==0 ? true : false ) ) to finish a segment < a full 7 days
for (var x = 0; x < totalWeeks; x++) {
  console.log("Outer Loop week " + (x + 1).toString());
  // display this weeks start and end dates based upon loop interation
  let useStartDate = 
    moment(enteredDateRange.dateRange.lowerUTC)
      .utc()
      .add(x * 7, "days")
      .format("YYYY-MM-DD")
  let useEndDate = timeUtils.UTCMakeGMT0(
    moment(enteredDateRange.dateRange.lowerUTC)
      .utc()
      .add(x * 7 + 6, "days")
      .format("YYYY-MM-DD"),
    "eod"
  );

  console.log(
    `\t  usedStartDate: ${moment(useStartDate)
      .utc()
      .format("LLL")} , useEndDate: ${moment(useEndDate)
      .utc()
      .format("LLL")}`
  );
  // loop through the week's days
  let thisDayOfThisWeek = moment(useStartDate).utc();
  while (thisDayOfThisWeek <= moment(useEndDate).utc()) {
    let dayRange = new DateRange();
    dayRange.dateRange = {
      lowerUTC: moment(thisDayOfThisWeek)
        .utc()
        .format("YYYY-MM-DD")
    };
    let useDay = dayRange.dateRange;
    let collection = moment(useDay.lowerUTC)
      .add(1, "days")
      .format("YYYYMMDD");
    console.log(`\t Collection of ${collection}`);
    console.log(
      `\t\t ${moment(timeUtils.UTCMakeGMT0(useDay.lowerUTC, "sod"))
        .utc()
        .format("LLL")}`,
      `\t\t ${moment(timeUtils.UTCMakeGMT0(useDay.lowerUTC, "sod"))
        .utc()
        .format("X")}`
    );
    console.log(
      `\t\t ${moment.utc(timeUtils.UTCMakeGMT0(useDay.upperUTC, "eod"))
        .format("LLL")}`,
      `\t\t ${moment.utc(timeUtils.UTCMakeGMT0( useDay.upperUTC, "eod"))
        .format("X")}`
    );
    thisDayOfThisWeek = moment(thisDayOfThisWeek).add(1, "days");
  }
}
