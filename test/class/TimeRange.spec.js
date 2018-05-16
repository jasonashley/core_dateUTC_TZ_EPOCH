const moment = require('moment')
const assert = require('assert');
// const timeUtils = require('../../src/utils/timeUtils')

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
    it('Lower null, upper null, define lower as start of today', () => {
      let actualTime = moment().format('YYYY-MM-DD 00:00:00')
      let timeRange = new TimeRange()
      timeRange.setTime();
      let useTime = timeRange.getTime()
      // useTime.should.have.property('lowerUTC').equal(actualTime)
      expect(useTime.lowerUTC).to.equal(actualTime)
    })
    it('Lower null, upper !null, define lower as upper', () => {
      let actualTime = '2018-01-29 00:00:00'
      let timeRange = new TimeRange()
      timeRange.setTime({
        upperUTC: '2018-01-29'
      });
      let useTime = timeRange.getTime()
      // useTime.should.have.property('lowerUTC').equal(actualTime)
      expect(useTime.lowerUTC).to.equal(actualTime)
    })
    it('Lower !null, upper null, define lower as arg', () => {
      let testTime = '2018-01-30'
      let actualTime = moment(testTime).format('YYYY-MM-DD')
      actualTime += ' 00:00:00'
      let timeRange = new TimeRange();
      timeRange.setTime({
        lowerUTC: testTime
      });
      let useTime = timeRange.getTime()
      useTime.should.have.property('lowerUTC').equal(actualTime)
    })
    it('Make lowerUTC set to 00:00:00', () => {
      let actualTime = '2018-01-29 00:00:00'
      let timeRange = new TimeRange();
      timeRange.setTime({
        lowerUTC: '2018-01-29'
      })
      timeRange.getTime().lowerUTC.should.equal(actualTime)
    })

    })

    describe('upperUTC property Test', () => {
      it('Has property upperUTC, ', () => {
        let timeRange = new TimeRange({});
        timeRange.getTime().should.have.property('upperUTC')
      })
      it('upper null, lower null, define upper as end of today', () => {
        let actualTime = moment().format('YYYY-MM-DD 23:59:59')
        let timeRange = new TimeRange()
        timeRange.setTime();
        let useTime = timeRange.getTime()
        // useTime.should.have.property('lowerUTC').equal(actualTime)
        expect(useTime.upperUTC).to.equal(actualTime)
      })
      it('Upper null, lower !null, define upper as lower', () => {
        actualTime = '2018-01-29 23:59:59'
        let timeRange = new TimeRange();
        timeRange.setTime({
          lowerUTC: '2018-01-29'
        })
        timeRange.getTime().upperUTC.should.equal(actualTime)
      })
      it('Upper !null set upper to given arg', () => {
        let expected = '2018-01-29 23:59:59'
        let timeRange = new TimeRange()
        timeRange.setTime({upperUTC: '2018-01-29'});
        let actual = timeRange.getTime().upperUTC
        expect(actual).to.equal(expected)
      })
      it('Make upper boundary valid through 23:59:59', () => {
        let expected= '2018-01-29 23:59:59'
        let timeRange = new TimeRange()
        timeRange.setTime({upperUTC: '2018-01-29'});
        let actual=timeRange.getTime().upperUTC
        expect(actual).to.equal(expected)
      })
  })

  afterEach(() => {
    timeRange = undefined
  })
})
