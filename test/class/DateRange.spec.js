const moment = require('moment')
const assert = require('assert');
const timeUtils = require('../../src/utils/timeUtils')
const DateRange = require('../../src/class/DateRange')
const expect = require('chai').expect;
const should = require('chai').should();

describe('DateRange Class, tempObj = new DateRange()' , () => {
  let tempObj
  beforeEach(() => {
    tempObj = new DateRange()
  });
  describe('Constructor', () => {
    it('tempObj is an instance of DateRange', () => {
      tempObj.should.be.a('object')
      expect(tempObj).to.be.an.instanceOf(DateRange)
    })
  })
  describe('tempObj.dateRange props exists ', () => {
    it('should not expose private property _dateRange', () => {
      tempObj.should.not.have.property('_dateRange')
    })
    it ('tempObj.dateRange.lowerUTC exist', () => {
      tempObj.dateRange = "";
      tempObj.dateRange.should.have.property('lowerUTC')
    })
    it ('tempObj.dateRange.upperUTC exists', () => {
      tempObj.dateRange = "";
      tempObj.dateRange.should.have.property('upperUTC')
    })
    it ('tempObj.dateRange.sodUTC + T00:00:00 exists', () => {
      tempObj.dateRange = "";
      tempObj.dateRange.should.have.property('sodUTC')
    })
    it ('tempObj.dateRange.eodUTC + T23:59:59Z exists', () => {
      tempObj.dateRange = "";
      tempObj.dateRange.should.have.property('eodUTC')
    })
    it ('tempObj.dateRange.sodEPOCH exists', () => {
      tempObj.dateRange = "";
      tempObj.dateRange.should.have.property('sodEPOCH')
    })
    it ('tempObj.dateRange.eodEPOCH exists', () => {
      tempObj.dateRange = "";
      tempObj.dateRange.should.have.property('eodEPOCH')
    })

  })

  describe('lowerUTC property guard tests', () => {
    it('lower null, upper null, define lower as today', () => {
      let expected=  moment().utc().format('YYYY-MM-DD')
      tempObj.dateRange= {} 
      let actual= tempObj.dateRange.lowerUTC
      expect(actual).to.equal(expected)
    })
    it('lower null, upper !null, define lower as upper', () => {
      let expected = '2018-01-30'
      tempObj.dateRange= { upperUTC: expected }
      let actual = tempObj.dateRange.lowerUTC 

      expect(actual).to.equal(expected)
      expect(tempObj.dateRange.sodUTC).to.equal(expected+'T00:00:00Z')
      expect(tempObj.dateRange.sodEPOCH).to.equal("1517270400")
    })
    it('lower !null, upper null, define lower as arg', () => {
      let expected = '2018-01-30'
      tempObj.dateRange = {lowerUTC: expected}
      let actual = tempObj.dateRange.lowerUTC

      expect(actual).to.equal(expected)
      expect(tempObj.dateRange.sodUTC).to.equal(expected+'T00:00:00Z')
      expect(tempObj.dateRange.sodEPOCH).to.equal("1517270400")
    })
  })
  describe('upperUTC property guard tests', () => {
    it('upper null, lower null, define upper as end of today', () => {
      let expected = moment().utc().format('YYYY-MM-DD')
      tempObj.dateRange= {};
      let actual = tempObj.dateRange.upperUTC 
      expect(actual).to.equal(expected)
    })
    it('Lower null, upper !null, define lower as upper', () => {
      let expected = '2018-01-30'
      tempObj.dateRange= { upperUTC: expected }
      let actual = tempObj.dateRange.lowerUTC 

      expect(actual).to.equal(expected)
      expect(tempObj.dateRange.eodUTC).to.equal(expected+'T23:59:59Z')
      expect(tempObj.dateRange.eodEPOCH).to.equal("1517356799")
    })
    it('lower !null, upper null, define lower as arg', () => {
      let expected = '2018-01-30'
      tempObj.dateRange = {lowerUTC: expected}
      let actual = tempObj.dateRange.lowerUTC

      expect(actual).to.equal(expected)
    })
  })

  afterEach(() => {
    tempObj = undefined
  
  })
})