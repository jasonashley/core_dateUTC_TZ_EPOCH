const moment = require('moment')
const assert = require('assert');
const timeUtils = require('../../src/utils/timeUtils')
const DateRange = require('../../src/class/DateRange')
const expect = require('chai').expect;
const should = require('chai').should();

describe('DateRange Class /src/class/DateRange.js', () => {
  describe('Constructor', () => {
    it('Constructs instance of DateRange', () => {
      let queryDate= new DateRange();
      queryDate.should.be.a('object')
      expect(queryDate).to.be.an.instanceOf(DateRange)
    })
  })
  describe('properties exist, sanity check', () => {
    it ('should have property lowerUTC', () => {
      let actual = new DateRange()
      actual.dateRange = "";
      actual.dateRange.should.have.property('lowerUTC')
    })
    it ('should have property upperUTC', () => {
      let actual = new DateRange()
      actual.dateRange = "";
      actual.dateRange.should.have.property('upperUTC')
    })
  })

  describe('lowerUTC property guard tests', () => {
    it('lower null, upper null, define lower as today', () => {
      let expected=  moment().utc().format('YYYY-MM-DD')
      let tempObj= new DateRange()
      tempObj.dateRange= {} 
      let actual= tempObj.dateRange.lowerUTC
      expect(actual).to.equal(expected)
    })
    it('Lower null, upper !null, define lower as upper', () => {
      let expected = '2018-01-29'
      let tempObj= new DateRange({upperUTC: expected})
      tempObj.dateRange= { upperUTC: expected }
      let actual = tempObj.dateRange.lowerUTC 
      expect(actual).to.equal(expected)
      // timeUtils will add start of day hours for second test
      // expect(timeUtils.UTCMakeGMT0(actual, 'sod')).to.equal(timeUtils.UTCMakeGMT0(expected, 'sod'))
    })
    it('Lower !null, upper null, define lower as arg', () => {
      let expected = '2018-01-30'
      let tempObj= new DateRange();
      tempObj.dateRange = {lowerUTC: expected}
      let actual = tempObj.dateRange.lowerUTC
      // basic test first
      expect(actual).to.equal(expected)
      // timeUtils will add start of day hours for second test
      // expect(timeUtils.UTCMakeGMT0(actual, 'sod')).to.equal(timeUtils.UTCMakeGMT0(expected, 'sod'))
    })
  })
  describe('upperUTC property guard tests', () => {
    it('upper null, lower null, define upper as end of today', () => {
      let expected = moment().utc().format('YYYY-MM-DD')
      let tempObj= new DateRange()
      tempObj.dateRange= {};
      let actual = tempObj.dateRange.upperUTC 
      // basic test first
      expect(actual).to.equal(expected)
      // // timeUtils will add end of day hours for second test
      // let expectedEOD = moment().utc().format('YYYY-MM-DD') + 'T23:59:59Z'
      // let actualEOD = timeUtils.UTCMakeGMT0(actual, 'eod')
      // expect(actualEOD).to.equal(expectedEOD)
    })
    it('Upper null, lower !null, define upper as lower', () => {
      let expected= '2018-01-29'
      let tempObj= new DateRange();
      tempObj.dateRange = {lowerUTC: expected}
      let actual = tempObj.dateRange.upperUTC
      expect(actual).to.equal(expected)
      // timeUtils will add end of day hours for second test
      // let expectedEOD = moment(useTime).utc().format('YYYY-MM-DD') + 'T23:59:59Z'
      // let actualEOD = timeUtils.UTCMakeGMT0(actual, 'eod')
      // expect(actualEOD).to.equal(expectedEOD)
    })
    it('Upper !null set upper to given arg', () => {
      let expected= '2018-01-29';
      let tempObj= new DateRange()
      tempObj.dateRange= { upperUTC: expected};
      let actual = tempObj.dateRange.upperUTC;
      expect(actual).to.equal(expected)
      // timeUtils will add end of day hours for second test
      // let expectedEOD = moment(useTime).utc().format('YYYY-MM-DD') + 'T23:59:59Z'
      // let actualEOD = timeUtils.UTCMakeGMT0(actual, 'eod')
      // expect(actualEOD).to.equal(expectedEOD)
    })
  })

  afterEach(() => {
    dateRange = undefined,
    tempObj = undefined
  
  })
})