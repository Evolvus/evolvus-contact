const debug = require("debug")("evolvus-contact.test.db.contact");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const contact = require("../../db/contact");

var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://10.10.69.204/TestPlatform_Dev";

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
    "emailId": "vickyccc@gmail.com",
    "emailVerified": true,
    "phoneNumber": "912452364123",
    "mobileNumber": "9878586312",
    "mobileVerified": true,
    "faxNumber": "12217865421",
    "companyName": "Evolvus",
    "address1": "Bangalore",
    "address2": "chennai",
    "city": "Bangalore",
    "state": "karnataka",
    "country": "India",
    "zipCode": "6868",
    "createdDate": new Date().toISOString(),
    "lastUpdatedDate": new Date().toISOString()
  };
  let object2 = {
    // add a valid contact object
    "tenantId": "tenIdOne",
    "firstName": "vicky",
    "middleName": "saran",
    "lastName": "R",
    "emailId": "vickyqwer@yahoo.com",
    "emailVerified": true,
    "phoneNumber": "812541267",
    "mobileNumber": "888586312",
    "mobileVerified": true,
    "faxNumber": "12745892341",
    "companyName": "Evolvus",
    "address1": "Mgroad",
    "address2": "Madiwala",
    "city": "Bangalore",
    "state": "karnataka",
    "country": "India",
    "zipCode": "686834",
    "createdDate": new Date().toISOString(),
    "lastUpdatedDate": new Date().toISOString()
  };
  let object3 = {
    // add a valid contact object
    "tenantId": "tenIdTwo",
    "firstName": "vinai",
    "middleName": "saran",
    "lastName": "R",
    "emailId": "vinai@yahoo.com",
    "emailVerified": true,
    "phoneNumber": "365120123",
    "mobileNumber": "8888586312",
    "mobileVerified": false,
    "faxNumber": "1223412041",
    "companyName": "Evolvus",
    "address1": "Mgroad",
    "address2": "Madiwala",
    "city": "Bangalore",
    "state": "karnataka",
    "country": "India",
    "zipCode": "686834",
    "createdDate": new Date().toISOString(),
    "lastUpdatedDate": new Date().toISOString()
  };
  let object4 = {
    // add a valid contact object
    "tenantId": "tenIdFour",
    "firstName": "Ram",
    "middleName": "saran",
    "lastName": "R",
    "emailId": "Ramram@yahoo.com",
    "emailVerified": true,
    "phoneNumber": "81239678",
    "mobileNumber": "9688586312",
    "mobileVerified": true,
    "faxNumber": "1247502341",
    "companyName": "Wipro",
    "address1": "city-road",
    "address2": "Madiwala",
    "city": "Bangalore",
    "state": "karnataka",
    "country": "India",
    "zipCode": "686834",
    "createdDate": new Date().toISOString(),
    "lastUpdatedDate": new Date().toISOString()
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
        "emailId": "vickerty@gamil.com",
        "emailVerified": true,
        "phoneNumber": "264178223",
        "mobileNumber": "+9878586378",
        "mobileVerified": true,
        "faxNumber": "12274521",
        "companyName": "Evolvus",
        "address1": "Bangalore",
        "address2": "chennai",
        "city": "Bangalore",
        "state": "karnataka",
        "country": "India",
        "zipCode": "6868",
        "createdDate": new Date().toISOString(),
        "lastUpdatedDate": new Date().toISOString()
      };
      let res = contact.save(testcontactCollection);
      expect(res)
        .to.eventually.have.property('emailId')
        .to.eql('vickerty@gamil.com')
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
        "emailId": "vickdfdfy@gmail.com",
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
      "tenantId": "IVL",
      "firstName": "vignesh",
      "middleName": "varan",
      "lastName": "p",
      "emailId": "vickysss@gmail.com",
      "emailVerified": true,
      "phoneNumber": "912452364123",
      "mobileNumber": "9878586312",
      "mobileVerified": true,
      "faxNumber": "12414121",
      "companyName": "Evolvus",
      "address1": "Bangalore",
      "address2": "chennai",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "6868",
      "createdDate": new Date().toISOString(),
      "lastUpdatedDate": new Date().toISOString()
    };
    let object2 = {
      // add a valid contact object
      "tenantId": "IVL",
      "firstName": "vicky",
      "middleName": "saran",
      "lastName": "R",
      "emailId": "vickyrent@yahoo.com",
      "emailVerified": true,
      "phoneNumber": "812541267",
      "mobileNumber": "888586312",
      "mobileVerified": true,
      "faxNumber": "1201401442341",
      "companyName": "Evolvus",
      "address1": "Mgroad",
      "address2": "Madiwala",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "686834",
      "createdDate": new Date().toISOString(),
      "lastUpdatedDate": new Date().toISOString()
    };
    let object3 = {
      // add a valid contact object
      "tenantId": "IVL",
      "firstName": "vinai",
      "middleName": "saran",
      "lastName": "R",
      "emailId": "vinai123@yahoo.com",
      "emailVerified": true,
      "phoneNumber": "365120123",
      "mobileNumber": "8888586312",
      "mobileVerified": false,
      "faxNumber": "12000142341",
      "companyName": "Evolvus",
      "address1": "Mgroad",
      "address2": "Madiwala",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "686834",
      "createdDate": new Date().toISOString(),
      "lastUpdatedDate": new Date().toISOString()
    };
    let object4 = {
      // add a valid contact object
      "tenantId": "IVL",
      "firstName": "Ram",
      "middleName": "saran",
      "lastName": "R",
      "emailId": "Ram@yahoo.com",
      "emailVerified": true,
      "phoneNumber": "812396787",
      "mobileNumber": "9688586312",
      "mobileVerified": true,
      "faxNumber": "122312341",
      "companyName": "Wipro",
      "address1": "city-road",
      "address2": "Madiwala",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "686834",
      "createdDate": new Date().toISOString(),
      "lastUpdatedDate": new Date().toISOString()
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
            .to.have.property('tenantId')
            .to.eql('IVL');
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
            .to.have.property('emailId')
            .to.eql('vickysss@gmail.com');
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
      "emailId": "vickyram@yahoo.com",
      "emailVerified": true,
      "phoneNumber": "751789999",
      "mobileNumber": "89128586312",
      "mobileVerified": true,
      "faxNumber": "1223445631",
      "companyName": "Evolvus",
      "address1": "Mgroad",
      "address2": "Madiwala",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "686834",
      "createdDate": new Date().toISOString(),
      "lastUpdatedDate": new Date().toISOString()

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
        .to.eventually.have.property('emailId')
        .to.eql('vickyram@yahoo.com')
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
      let attributename = "emailId";
      let attributeValue = "vickyccc@gmail.com";
      let res = contact.findOne(attributename, attributeValue);
      expect(res)
        .to.eventually.have.property('emailId')
        .to.eql('vickyccc@gmail.com')
        .notify(done);
    });

    it("should return null as no contact is identified by this attribute ", (done) => {
      let res = contact.findOne(`emailId`, `wery`);
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
      "emailId": "contact1@yahoo.com",
      "emailVerified": true,
      "phoneNumber": "81009811111",
      "mobileNumber": "5688586312",
      "mobileVerified": true,
      "faxNumber": "1223436521",
      "companyName": "Evolvus",
      "address1": "Mgroad",
      "address2": "Madiwala",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "686834",
      "createdDate": new Date().toISOString(),
      "lastUpdatedDate": new Date().toISOString()
    };
    let contact2 = {
      //add valid object with one attribute value same as "contact1"
      "tenantId": "tenIdContact2",
      "firstName": "contact2",
      "middleName": "saran",
      "lastName": "R",
      "emailId": "contact2@yahoo.com",
      "emailVerified": true,
      "phoneNumber": "1000128963",
      "mobileNumber": "7888586312",
      "mobileVerified": true,
      "faxNumber": "1227896341",
      "companyName": "Evolvus",
      "address1": "Mgroad",
      "address2": "Madiwala",
      "city": "Bangalore",
      "state": "karnataka",
      "country": "India",
      "zipCode": "686834",
      "createdDate": new Date().toISOString(),
      "lastUpdatedDate": new Date().toISOString()
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
      let attributename = "emailId";
      let attributeValue = "contact2@yahoo.com";
      let res = contact.findMany(attributename, attributeValue);
      expect(res).to.eventually.be.a("array");
      //enter proper length according to input attribute
      expect(res).to.eventually.have.length(1);
      done();
    });

    it("should return empty array as no contact is identified by this attribute ", (done) => {
      let res = contact.findMany(`emailId`, `xyz`);
      expect(res)
        .to.eventually.to.eql([])
        .notify(done);
    });
  });
});