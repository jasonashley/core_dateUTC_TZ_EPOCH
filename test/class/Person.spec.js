const Person = require("../../src/class/Person");
const expect = require("chai").expect;
const should = require("chai").should();

describe("Person Class, ", () => {
  describe("test for instance of Person", () => {
    it("should be an instance of Person", () => {
      let actual = new Person();
      actual.should.be.an.instanceof(Person);
    });
    describe("sanity check, public/private properties", () => {
      it("should have property getId", () => {
        let aPerson = new Person();
        aPerson.should.have.property("getId");
      });
      it("should have property setId", () => {
        let aPerson = new Person();
        aPerson.should.have.property("setId");
      });
      it("should not expose private property _id", () => {
        let aPerson = new Person();
        aPerson.should.not.have.property("_id");
      });
    });
  });
  afterEach(() => {
    aPerson = undefined;
  });
});
