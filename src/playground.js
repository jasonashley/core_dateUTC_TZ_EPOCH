const dateToTest = "2018-01-30";

function testDate(x) {
  let dateString = /^[12]{1}\d{3}-?(0[1-9]{1}|1[012]{1})-?[123]{1}[0-9]{1}$/;
  return dateString.test(x);
}

let result = testDate(dateToTest);
console.log(result);
