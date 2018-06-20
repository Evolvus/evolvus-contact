const debug = require("debug")("evolvus-contact.test.db.contact");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const contact = require("../../db/contact");

var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost/TestcontactCollection";

chai.use(chaiAsPromised);

// High level wrapper
// Testing db/contact.js
describe("db contact testing", () => {
  /*
   ** Before doing any tests, first get the connection.
   */
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      debug("ok got the connection");
      done();
    });
  });

  let object1 = {
    // add a valid contact object
    "tenantId": "tenId",
    "firstName": "vignesh",
    "middleName": "varan",
    "lastName": "p",
    "email": "vicky@gmail.com",
    "emailVerified": true,
    "phoneNo": "912452364123",
    "mobileNo": "9878586312",
    "mobileVerified": true,
    "faxNumber": "1221",
    "companyName": "Evolvus",
    "Address1": "Bangalore",
    "Address2": "chennai",
    "city": "Bangalore",
    "state": "karnataka",
    "country": "India",
    "zipCode": "6868"
  };
  let object2 = {
    // add a valid contact object
    "tenantId": "tenIdOne",
    "firstName": "vicky",
    "middleName": "saran",
    "lastName": "R",
    "email": "vicky@yahoo.com",
    "emailVerified": true,
    "phoneNo": "812541267",
    "mobileNo": "888586312",
    "mobileVerified": true,
    "faxNumber": "122341",
    "companyName": "Evolvus",
    "Address1": "Mgroad",
    "Address2": "Madiwala",
    "city": "Bangalore",
    "state": "karnataka",
    "country": "India",
    "zipCode": "686834"
  };
  let object3 = {
    // add a valid contact object
    "tenantId": "tenIdTwo",
    "firstName": "vinai",
    "middleName": "saran",
    "lastName": "R",
    "email": "vinai@yahoo.com",
    "emailVerified": true,
    "phoneNo": "365120123",
    "mobileNo": "8888586312",
    "mobileVerified": false,
    "faxNumber": "122341",
    "companyName": "Evolvus",
    "Address1": "Mgroad",
    "Address2": "Madiwala",
    "city": "Bangalore",
    "state": "karnataka",
    "country": "India",
    "zipCode": "686834"
  };
  let object4 = {
    // add a valid contact object
    "tenantId": "tenIdFour",
    "firstName": "Ram",
    "middleName": "saran",
    "lastName": "R",
    "email": "Ram@yahoo.com",
    "emailVerified": true,
    "phoneNo": "81239678",
    "mobileNo": "9688586312",
    "mobileVerified": true,
    "faxNumber": "122341",
    "companyName": "Wipro",
    "Address1": "City-road",
    "Address2": "Madiwala",
    "city": "Bangalore",
    "state": "karnataka",
    "country": "India",
    "zipCode": "686834"
  };


  describe("testing contact.save", () => {
    // Testing save
    // 1. Valid contact should be saved.
    // 2. Non contact object should not be saved.
    // 3. Should not save same contact twice.
    beforeEach((done) => {
      contact.deleteAll()
        .then((data) => {
          done();
        });
    });

    it("should save valid contact to database", (done) => {
      let testcontactCollection = {
        // add a valid contact object
        "tenantId": "tenId",
        "firstName": "vignesh",
        "middleName": "varan",
        "lastName": "p",
        "email": "vicky@gamil.com",
        "emailVerified": true,
        "phoneNo": "264178223",
        "mobileNo": "9878586378",
        "mobileVerified": true,
        "faxNumber": "1221",
        "companyName": "Evolvus",
        "Address1": "Bangalore",
        "Address2": "chennai",
        "city": "Bangalore",
        "state": "karnataka",
        "country": "India",
        "zipCode": "6868"
      };
      let res = contact.save(testcontactCollection);
      expect(res)
        .to.eventually.include(testcontactCollection)
        .notify(done);
    });

    it("should fail saving invalid object to database", (done) => {
      // not even a  object

      let invalidObject = {
        // add a invalid contact object
        "tenantId": "tenId",
        "firstName": "vignesh",
        "middleName": "varan",
        "lastName": "p",
        "email": "vicky@gmail.com",
        "emailVerified": true
      };
      let res = contact.save(invalidObject);
      expect(res)
        .to.be.eventually.rejectedWith("contactCollection validation failed")
        .notify(done);
    });
  });

  describe("testing contact.findAll by limit", () => {
    let object1 = {
      // add a valid contact object
      "tenantId": "tenId",
      "firstName": "vignesh",
      "middleName": "varan",
      "lastName": "p",
      "email": "vicky@gmail.com",
      "emailVerified": true,
      "phoneNo": "912452364123",
      "mobileNo": "9878586312",
      "mobileVerified": true,
      "faxNumber": "1221",
      "companyName": "Evolvus",
      "Address1": "Bangalore",
      "Address2": "chennai",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "6868"
    };
    let object2 = {
      // add a valid contact object
      "tenantId": "tenIdOne",
      "firstName": "vicky",
      "middleName": "saran",
      "lastName": "R",
      "email": "vicky@yahoo.com",
      "emailVerified": true,
      "phoneNo": "812541267",
      "mobileNo": "888586312",
      "mobileVerified": true,
      "faxNumber": "122341",
      "companyName": "Evolvus",
      "Address1": "Mgroad",
      "Address2": "Madiwala",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "686834"
    };
    let object3 = {
      // add a valid contact object
      "tenantId": "tenIdTwo",
      "firstName": "vinai",
      "middleName": "saran",
      "lastName": "R",
      "email": "vinai@yahoo.com",
      "emailVerified": true,
      "phoneNo": "365120123",
      "mobileNo": "8888586312",
      "mobileVerified": false,
      "faxNumber": "122341",
      "companyName": "Evolvus",
      "Address1": "Mgroad",
      "Address2": "Madiwala",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "686834"
    };
    let object4 = {
      // add a valid contact object
      "tenantId": "tenIdFour",
      "firstName": "Ram",
      "middleName": "saran",
      "lastName": "R",
      "email": "Ram@yahoo.com",
      "emailVerified": true,
      "phoneNo": "812396787",
      "mobileNo": "9688586312",
      "mobileVerified": true,
      "faxNumber": "122341",
      "companyName": "Wipro",
      "Address1": "City-road",
      "Address2": "Madiwala",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "686834"
    };

    // 1. Delete all records in the table and insert
    //    4 new records.
    // find -should return an array of size equal to value of limit with the
    // roleMenuItemMaps.
    // Caveat - the order of the roleMenuItemMaps fetched is indeterminate

    // delete all records and insert four roleMenuItemMaps
    beforeEach((done) => {
      contact.deleteAll().then(() => {
        contact.save(object1).then((res) => {
          contact.save(object2).then((res) => {
            contact.save(object3).then((res) => {
              contact.save(object4).then((res) => {
                done();
              });
            });
          });
        });
      });
    });

    it("should return limited number of records", (done) => {
      let res = contact.findAll(3);
      expect(res)
        .to.be.fulfilled.then((docs) => {
          expect(docs)
            .to.be.a('array');
          expect(docs.length)
            .to.equal(3);
          expect(docs[0])
            .to.have.property('email')
            .to.eql('vicky@gmail.com');
          done();
        }, (err) => {
          done(err);
        })
        .catch((e) => {
          done(e);
        });
    });

    it("should return all records if value of limit parameter is less than 1 i.e, 0 or -1", (done) => {
      let res = contact.findAll(-1);
      expect(res)
        .to.be.fulfilled.then((docs) => {
          expect(docs)
            .to.be.a('array');
          expect(docs.length)
            .to.equal(4);
          expect(docs[0])
            .to.include(object1);
          done();
        }, (err) => {
          done(err);
        })
        .catch((e) => {
          done(e);
        });
    });
  });

  describe("testing roleMenuItemMap.find without data", () => {
    // delete all records
    // find should return empty array
    beforeEach((done) => {
      contact.deleteAll()
        .then((res) => {
          done();
        });
    });

    it("should return empty array i.e. []", (done) => {
      let res = contact.findAll(2);
      expect(res)
        .to.be.fulfilled.then((docs) => {
          expect(docs)
            .to.be.a('array');
          expect(docs.length)
            .to.equal(0);
          expect(docs)
            .to.eql([]);
          done();
        }, (err) => {
          done(err);
        })
        .catch((e) => {
          done(e);
        });
    });
  });

  describe("testing contact.findById", () => {
    // Delete all records, insert one record , get its id
    // 1. Query by this id and it should return one contact
    // 2. Query by an arbitrary id and it should return {}
    // 3. Query with null id and it should throw IllegalArgumentException
    // 4. Query with undefined and it should throw IllegalArgumentException
    // 5. Query with arbitrary object
    let testObject = {
      //add a valid contact object

      "tenantId": "tenIdOne",
      "firstName": "vicky",
      "middleName": "saran",
      "lastName": "R",
      "email": "vicky@yahoo.com",
      "emailVerified": true,
      "phoneNo": "751789999",
      "mobileNo": "89128586312",
      "mobileVerified": true,
      "faxNumber": "122341",
      "companyName": "Evolvus",
      "Address1": "Mgroad",
      "Address2": "Madiwala",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "686834"

    };
    var id;
    beforeEach((done) => {
      contact.deleteAll()
        .then((res) => {
          contact.save(testObject)
            .then((savedObj) => {
              id = savedObj._id;
              done();
            });
        });
    });

    it("should return contact identified by Id ", (done) => {
      let res = contact.findById(id);
      expect(res)
        .to.eventually.include(testObject)
        .notify(done);
    });

    it("should return null as no contact is identified by this Id ", (done) => {
      let badId = new mongoose.mongo.ObjectId();
      let res = contact.findById(badId);
      expect(res)
        .to.eventually.to.eql(null)
        .notify(done);
    });
  });

  describe("testing contact.findOne", () => {
    // Delete all records, insert two record
    // 1. Query by one attribute and it should return one contact
    // 2. Query by an arbitrary attribute value and it should return {}

    // delete all records and insert two contacts
    beforeEach((done) => {
      contact.deleteAll()
        .then((res) => {
          contact.save(object1)
            .then((res) => {
              contact.save(object2)
                .then((savedObj) => {
                  done();
                });
            });
        });
    });

    it("should return object for valid attribute value", (done) => {
      // take one valid attribute and its value
      let attributename = "email";
      let attributeValue = "vicky@gmail.com";
      let res = contact.findOne(attributename, attributeValue);
      expect(res)
        .to.eventually.include(object1)
        .notify(done);
    });

    it("should return null as no contact is identified by this attribute ", (done) => {
      let res = contact.findOne(`email`, `wery`);
      expect(res)
        .to.eventually.to.eql(null)
        .notify(done);
    });
  });

  describe("testing contact.findMany", () => {
    // Delete all records, insert two record
    // 1. Query by one attribute and it should return all contacts having attribute value
    // 2. Query by an arbitrary attribute value and it should return {}
    let contact1 = {
      //add valid object
      "tenantId": "tenIdOneContact1",
      "firstName": "contact1",
      "middleName": "saran",
      "lastName": "R",
      "email": "contact1@yahoo.com",
      "emailVerified": true,
      "phoneNo": "81009811111",
      "mobileNo": "5688586312",
      "mobileVerified": true,
      "faxNumber": "122341",
      "companyName": "Evolvus",
      "Address1": "Mgroad",
      "Address2": "Madiwala",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "686834"
    };
    let contact2 = {
      //add valid object with one attribute value same as "contact1"
      "tenantId": "tenIdContact2",
      "firstName": "contact2",
      "middleName": "saran",
      "lastName": "R",
      "email": "contact2@yahoo.com",
      "emailVerified": true,
      "phoneNo": "1000128963",
      "mobileNo": "7888586312",
      "mobileVerified": true,
      "faxNumber": "122341",
      "companyName": "Evolvus",
      "Address1": "Mgroad",
      "Address2": "Madiwala",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "686834"
    };
    // delete all records and insert two contacts
    beforeEach((done) => {
      contact.deleteAll()
        .then((res) => {
          contact.save(contact1)
            .then((res) => {
              contact.save(contact2)
                .then((savedObj) => {
                  done();
                });
            });
        });
    });

    it("should return array of objects for valid attribute value", (done) => {
      // take one valid attribute and its value
      let attributename = "email";
      let attributeValue = "contact2@yahoo.com";
      let res = contact.findMany(attributename, attributeValue);
      expect(res).to.eventually.be.a("array");
      //enter proper length according to input attribute
      expect(res).to.eventually.have.length(1);
      done();
    });

    it("should return empty array as no contact is identified by this attribute ", (done) => {
      let res = contact.findMany(`email`, `xyz`);
      expect(res)
        .to.eventually.to.eql([])
        .notify(done);
    });
  });
});