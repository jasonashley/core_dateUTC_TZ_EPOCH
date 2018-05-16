var moment = require('moment');

let startDateUTC = moment("2018-01-01");
let endDateUTC = moment("2018-05-30");
// 149 days
let totalDays =  endDateUTC.diff(startDateUTC, 'days') 
let totalWeeks = endDateUTC.diff(startDateUTC, 'weeks') 

console.log( Math.floor( totalDays / 7 ) );
console.log( totalDays % 7 );
console.log( totalWeeks );
// total loops will be the total weeks starting at 0
const dateRange = {
	lowerUTC: startDateUTC,
	upperUTC: endDateUTC
}
// Outer loop will be of Total Range on a weekly loop
for (var x=0; x< totalWeeks; x++){
	console.log('Outer Loop week ' + (x +1).toString());
	// set dates based upon loop interation
	let useStartDate= moment(dateRange.lowerUTC).add((x *7), 'days');
	let useEndDate= moment(useStartDate).add(6,'days');
	console.log(`\t ${useStartDate} to ${useEndDate}`);
	// loop through the week's days
	let daily= useStartDate
	while (daily <= useEndDate){
		let collection = moment(daily).add(1,'days').format('YYYYMMDD');
		console.log(`\t\t ${daily} with collection ${collection})`);
		daily = moment(daily).add(1,'days');
	}
}





