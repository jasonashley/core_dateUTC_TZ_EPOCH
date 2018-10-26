function Person() {
  let _id = 7;

  this.getId = () => {
    return _id;
  };
  this.setId = newId => {
    _id = newId;
  };
}

module.exports = Person;
