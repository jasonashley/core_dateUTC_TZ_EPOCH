const moment = require('moment')
const assert = require('assert');
const timeUtils = require('../../src/utils/timeUtils')
const DateRange = require('../../src/class/DateRange')
const expect = require('chai').expect;
const should = require('chai').should();

describe('DateRange Class /src/class/DateRange.js', () => {
  describe('Constructor', () => {
    it('Constructs instance of DateRange', () => {
      let dateRange = new DateRange({});
      dateRange.should.be.a('object')
      expect(dateRange).to.be.an.instanceOf(DateRange)
    })
  })
  describe('getter for properties, sanity check', () => {
    it ('should have property lowerUTC', () => {
      let actual = new DateRange({}).getTime();

      actual.should.have.property('lowerUTC')
    })
    it ('should have property upperUTC', () => {
      let actual = new DateRange({}).getTime();

      actual.should.have.property('upperUTC')
    })
  })

  describe('lowerUTC property guards test', () => {
    it('lower null, upper null, define lower as start of today', () => {
      let expected = moment().utc().format('YYYY-MM-DD')
      let dateRange = new DateRange()
      dateRange.setTime();
      let actual = dateRange.getTime().lowerUTC
      // basic test first

      expect(actual).to.equal(expected)

      // timeUtils will add start of day hours for second test
      let expectedSOD = moment().utc().format('YYYY-MM-DD') + 'T00:00:00Z'
      let actualSOD = timeUtils.UTCMakeGMT0(actual, 'sod')

      expect(actualSOD).to.equal(expectedSOD)
    })
    it('Lower null, upper !null, define lower as upper', () => {
      let expected = '2018-01-29'
      let dateRange = new DateRange()
      dateRange.setTime({
        upperUTC: expected
      });
      let actual = dateRange.getTime().lowerUTC
      // basic test first

      expect(actual).to.equal(expected)

      // timeUtils will add start of day hours for second test

      expect(timeUtils.UTCMakeGMT0(actual, 'sod')).to.equal(timeUtils.UTCMakeGMT0(expected, 'sod'))
    })
    it('Lower !null, upper null, define lower as arg', () => {
      let expected = '2018-01-30'
      let dateRange = new DateRange();
      dateRange.setTime({
        lowerUTC: expected
      });
      let actual = dateRange.getTime().lowerUTC
      // basic test first
      expect(actual).to.equal(expected)
      // timeUtils will add start of day hours for second test
      expect(timeUtils.UTCMakeGMT0(actual, 'sod')).to.equal(timeUtils.UTCMakeGMT0(expected, 'sod'))
    })
  })

  describe('upperUTC property guards + eod test', () => {
    it('upper null, lower null, define upper as end of today', () => {
      let expected = moment().utc().format('YYYY-MM-DD')
      let dateRange = new DateRange()
      dateRange.setTime();
      let actual = dateRange.getTime().upperUTC

      // basic test first
      expect(actual).to.equal(expected)

      // timeUtils will add end of day hours for second test
      let expectedEOD = moment().utc().format('YYYY-MM-DD') + 'T23:59:59Z'
      let actualEOD = timeUtils.UTCMakeGMT0(actual, 'eod')

      expect(actualEOD).to.equal(expectedEOD)

    })
    it('Upper null, lower !null, define upper as lower', () => {
      let useTime = '2018-01-29'
      let expected = moment(useTime).utc().format('YYYY-MM-DD')
      let dateRange = new DateRange();
      dateRange.setTime({lowerUTC: useTime});
      let actual = dateRange.getTime().upperUTC

      // basic test first
      expect(actual).to.equal(expected)

      // timeUtils will add end of day hours for second test
      let expectedEOD = moment(useTime).utc().format('YYYY-MM-DD') + 'T23:59:59Z'
      let actualEOD = timeUtils.UTCMakeGMT0(actual, 'eod')

      expect(actualEOD).to.equal(expectedEOD)

    })
    it('Upper !null set upper to given arg', () => {
      let useTime = '2018-01-29';
      let expected = useTime;
      let dateRange = new DateRange()
      dateRange.setTime({ upperUTC: useTime });
      let actual = dateRange.getTime().upperUTC

      // basic test first
      expect(actual).to.equal(expected)

      // timeUtils will add end of day hours for second test
      let expectedEOD = moment(useTime).utc().format('YYYY-MM-DD') + 'T23:59:59Z'
      let actualEOD = timeUtils.UTCMakeGMT0(actual, 'eod')

      expect(actualEOD).to.equal(expectedEOD)

    })
  })

  afterEach(() => {
    dateRange = undefined
  })
})