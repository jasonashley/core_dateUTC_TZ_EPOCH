var moment = require('moment');
var DateRange = require('./class/DateRange');
var timeUtils = require('./utils/timeUtils')

let startDateArg= "2018-01-01"
let endDateArg= "2018-01-14"

// get and set entered time
let wholeDateRange = new DateRange();
wholeDateRange.setTime({lowerUTC: startDateArg, upperUTC: endDateArg })
enteredDateRange = wholeDateRange.getTime();

// display days and weeks (note add +1 to include all full days)
console.log('Total full days', moment(enteredDateRange.upperUTC).utc().diff(moment(enteredDateRange.lowerUTC).utc(), 'days')+1 )
let totalWeeks= Math.floor((moment(enteredDateRange.upperUTC).utc().diff(moment(enteredDateRange.lowerUTC).utc(), 'days')+1 )/7)
console.log('Total Weeks ' + totalWeeks)
// display start and end dates, after util calculates sod and eod, + show as EPOCH
console.log('\n', moment(timeUtils.UTCMakeGMT0(enteredDateRange.lowerUTC,'sod')).utc().format('LLL'),moment(timeUtils.UTCMakeGMT0(enteredDateRange.lowerUTC,'sod')).utc().format('X') )
console.log('', moment(timeUtils.UTCMakeGMT0(enteredDateRange.upperUTC,'eod')).utc().format('LLL'),moment(timeUtils.UTCMakeGMT0(enteredDateRange.upperUTC,'eod')).utc().format('X') )

// Outer loop will be of Total Range on a weekly loop
for (var x=0; x< totalWeeks; x++){
	console.log('Outer Loop week ' + (x +1).toString());
	// display this weeks start and end dates based upon loop interation
	let useStartDate= timeUtils.UTCMakeGMT0( moment(enteredDateRange.lowerUTC).utc().add((x *7), 'days').format('YYYY-MM-DD'), 'sod' );
	let useEndDate= timeUtils.UTCMakeGMT0( moment(enteredDateRange.lowerUTC).utc().add((x*7)+6,'days').format('YYYY-MM-DD'), 'eod');

	console.log(`\t  usedStartDate: ${moment(useStartDate).utc().format('LLL')} , useEndDate: ${moment(useEndDate).utc().format('LLL')}`);
	// loop through the week's days
	let thisDayOfThisWeek= moment(useStartDate).utc()
	while (thisDayOfThisWeek <= moment(useEndDate).utc()){
		let dayRange = new DateRange()
		dayRange.setTime({ lowerUTC: moment(thisDayOfThisWeek).utc().format('YYYY-MM-DD')})
		let useDay = dayRange.getTime();
		let collection = moment(useDay.lowerUTC).add(1,'days').format('YYYYMMDD');
		console.log(`\t Collection of ${collection}`);
		console.log(`\t\t ${moment(timeUtils.UTCMakeGMT0(useDay.lowerUTC, 'sod')).utc().format('LLL')}`,`\t\t ${moment(timeUtils.UTCMakeGMT0(useDay.lowerUTC, 'sod')).utc().format('X')}`)
		console.log(`\t\t ${moment(timeUtils.UTCMakeGMT0(useDay.upperUTC, 'eod')).utc().format('LLL')}`,`\t\t ${moment(timeUtils.UTCMakeGMT0(useDay.upperUTC, 'eod')).utc().format('X')}`)
		thisDayOfThisWeek= moment(thisDayOfThisWeek).add(1,'days');
	}
}





