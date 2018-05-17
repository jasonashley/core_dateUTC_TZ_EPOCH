const moment = require('moment')
const assert = require('assert');
const timeUtils = require('../../src/utils/timeUtils')
const TimeRange = require('../../src/class/DateRange')
const expect = require('chai').expect;
const should = require('chai').should();

describe('TimeRange Class /src/class/TimeRange.js', () => {
  describe('Constructor', () => {
    it('Constructs instance of TimeRange', () => {
      let timeRange = new TimeRange({});
      timeRange.should.be.a('object')
      expect(timeRange).to.be.an.instanceOf(TimeRange)
    })
  })

  describe('lowerUTC property Test', () => {
    it('Has property lowerUTC, ', () => {
      let timeRange = new TimeRange({});
      timeRange.getTime().should.have.property('lowerUTC')
    })
    it('lower null, upper null, define lower as start of today', () => {
      let expected = moment().utc().format('YYYY-MM-DD')
      let timeRange = new TimeRange()
      timeRange.setTime();
      let actual = timeRange.getTime().lowerUTC
      // basic test first
      expect(actual).to.equal(expected)
      // timeUtils will add start of day hours for second test
      expect(timeUtils.UTCMakeGMT0(actual, 'sod')).to.equal(timeUtils.UTCMakeGMT0(expected, 'sod'))
    })
    it('Lower null, upper !null, define lower as upper', () => {
      let expected = '2018-01-29'
      let timeRange = new TimeRange()
      timeRange.setTime({upperUTC: expected});
      let actual = timeRange.getTime().lowerUTC
      // basic test first
      expect(actual).to.equal(expected)
      // timeUtils will add start of day hours for second test
      expect(timeUtils.UTCMakeGMT0(actual, 'sod')).to.equal(timeUtils.UTCMakeGMT0(expected, 'sod'))
    })
    it('Lower !null, upper null, define lower as arg', () => {
      let expected = '2018-01-30'
      let timeRange = new TimeRange();
      timeRange.setTime({
        lowerUTC: expected
      });
      let actual = timeRange.getTime().lowerUTC
      // basic test first
      expect(actual).to.equal(expected)
      // timeUtils will add start of day hours for second test
      expect(timeUtils.UTCMakeGMT0(actual, 'sod')).to.equal(timeUtils.UTCMakeGMT0(expected, 'sod'))
    })
  })

  describe('upperUTC property Test', () => {
    it('Has property upperUTC, ', () => {
      let timeRange = new TimeRange({});
      timeRange.getTime().should.have.property('upperUTC')
    })
    it('upper null, lower null, define upper as end of today', () => {
      let actualTime = moment().format('YYYY-MM-DDT23:59:59Z')
      let timeRange = new TimeRange()
      timeRange.setTime();
      let useTime = timeRange.getTime()
      // useTime.should.have.property('lowerUTC').equal(actualTime)
      expect(useTime.upperUTC).to.equal(actualTime)
    })
    it('Upper null, lower !null, define upper as lower', () => {
      actualTime = '2018-01-29T23:59:59Z'
      let timeRange = new TimeRange();
      timeRange.setTime({
        lowerUTC: '2018-01-29'
      })
      timeRange.getTime().upperUTC.should.equal(actualTime)
    })
    it('Upper !null set upper to given arg', () => {
      let expected = '2018-01-29 23:59:59'
      let timeRange = new TimeRange()
      timeRange.setTime({
        upperUTC: '2018-01-29'
      });
      let actual = timeRange.getTime().upperUTC
      expect(actual).to.equal(expected)
    })
    it('Make upper boundary valid through 23:59:59', () => {
      let expected = '2018-01-29 23:59:59'
      let timeRange = new TimeRange()
      timeRange.setTime({
        upperUTC: '2018-01-29'
      });
      let actual = timeRange.getTime().upperUTC
      expect(actual).to.equal(expected)
    })
  })

  afterEach(() => {
    timeRange = undefined
  })
})