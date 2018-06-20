const debug = require("debug")("evolvus-contact.test.index");
const chai = require("chai");
const mongoose = require("mongoose");

var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost/TestcontactCollection";
/*
 ** chaiAsPromised is needed to test promises
 ** it adds the "eventually" property
 **
 ** chai and others do not support async / await
 */
const chaiAsPromised = require("chai-as-promised");

const expect = chai.expect;
chai.use(chaiAsPromised);

const contact = require("../index");
const db = require("../db/contact");

describe('contact model validation', () => {
  let contactObject = {
    // add a valid contact Object here
    "tenantId": "tenIdContactObj",
    "firstName": "contactObj",
    "middleName": "saravanan",
    "lastName": "R",
    "email": "saravanan2@yahoo.com",
    "emailVerified": true,
    "phoneNo": "265123",
    "mobileNo": "98886312",
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

  let invalidObject = {
    //add invalid contact Object here
    "tenantId": "tenIdContactObj",
    "firstName": "contactObj",
    "middleName": "saravanan",
    "lastName": "R",
    "email": "saravanan2@yahoo.com",
    "emailVerified": true,
  };

  let undefinedObject; // object that is not defined
  let nullObject = null; // object that is null

  // before we start the tests, connect to the database
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      debug("ok got the connection");
      done();
    });
  });

  describe("validation against jsonschema", () => {
    it("valid contact should validate successfully", (done) => {
      try {
        var res = contact.validate(contactObject);
        expect(res)
          .to.eventually.equal(true)
          .notify(done);
        // if notify is not done the test will fail
        // with timeout
      } catch (e) {
        expect.fail(e, null, `valid contact object should not throw exception: ${e}`);
      }
    });

    it("invalid contact should return errors", (done) => {
      try {
        var res = contact.validate(invalidObject);
        expect(res)
          .to.be.rejected
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    if ("should error out for undefined objects", (done) => {
        try {
          var res = contact.validate(undefinedObject);
          expect(res)
            .to.be.rejected
            .notify(done);
        } catch (e) {
          expect.fail(e, null, `exception: ${e}`);
        }
      });

    if ("should error out for null objects", (done) => {
        try {
          var res = contact.validate(nullObject);
          expect(res)
            .to.be.rejected
            .notify(done);
        } catch (e) {
          expect.fail(e, null, `exception: ${e}`);
        }
      });

  });

  describe("testing contact.save method", () => {

    beforeEach((done) => {
      db.deleteAll().then((res) => {
        done();
      });
    });

    it('should save a valid contact object to database', (done) => {
      try {
        var result = contact.save(contactObject);
        //replace anyAttribute with one of the valid attribute of a contact Object
        expect(result)
          .to.eventually.have.property("email")
          .to.eql(contactObject.email)
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `saving contact object should not throw exception: ${e}`);
      }
    });

    it('should not save a invalid contact object to database', (done) => {
      try {
        var result = contact.save(invalidObject);
        expect(result)
          .to.be.rejected
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

  });

  describe('testing contact.getAll when there is data in database', () => {
    let object1 = {
        //add one valid contact object here
        "tenantId": "tenIdObj1",
        "firstName": "Obj1",
        "middleName": "saravanan",
        "lastName": "R",
        "email": "obj1@yahoo.com",
        "emailVerified": true,
        "phoneNo": "265123",
        "mobileNo": "9889586312",
        "mobileVerified": true,
        "faxNumber": "122341",
        "companyName": "Lesus",
        "Address1": "Mgroad",
        "Address2": "Madiwala",
        "city": "Bangalore",
        "state": "karnataka",
        "country": "India",
        "zipCode": "686834"
      },
      object2 = {
        //add one more valid contact object here
        "tenantId": "Obj2",
        "firstName": "Obj2",
        "middleName": "ravanan",
        "lastName": "R",
        "email": "ravanan2@yahoo.com",
        "emailVerified": true,
        "phoneNo": "265123",
        "mobileNo": "9888586312",
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

    object3 = {
      //add one more valid contact object here
      "tenantId": "Obj3",
      "firstName": "contactObj",
      "middleName": "vananm",
      "lastName": "R",
      "email": "svananmn2@yahoo.com",
      "emailVerified": true,
      "phoneNo": "265123",
      "mobileNo": "9888586312",
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
    beforeEach((done) => {
      db.deleteAll().then((res) => {
        db.save(object1).then((res) => {
          db.save(object2).then((res) => {
            db.save(object3).then((res) => {
              done();
            });
          });
        });
      });
    });

    it('should return limited records as specified by the limit parameter', (done) => {
      try {
        let res = contact.getAll(2);
        expect(res)
          .to.be.fulfilled.then((docs) => {
            expect(docs)
              .to.be.a('array');
            expect(docs.length)
              .to.equal(2);
            done();
          });
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should return all records if limit is -1', (done) => {
      try {
        let res = contact.getAll(-1);
        expect(res)
          .to.be.fulfilled.then((docs) => {
            expect(docs)
              .to.be.a('array');
            expect(docs.length)
              .to.equal(3);
            done();
          });
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should throw IllegalArgumentException for null value of limit', (done) => {
      try {
        let res = contact.getAll(null);
        expect(res)
          .to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should throw IllegalArgumentException for undefined value of limit', (done) => {
      try {
        let undefinedLimit;
        let res = contact.getAll(undefinedLimit);
        expect(res)
          .to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

  });

  describe('testing contact.getAll when there is no data', () => {

    beforeEach((done) => {
      db.deleteAll().then((res) => {
        done();
      });
    });

    it('should return empty array when limit is -1', (done) => {
      try {
        let res = contact.getAll(-1);
        expect(res)
          .to.be.fulfilled.then((docs) => {
            expect(docs)
              .to.be.a('array');
            expect(docs.length)
              .to.equal(0);
            expect(docs)
              .to.eql([]);
            done();
          });
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should return empty array when limit is positive value ', (done) => {
      try {
        let res = contact.getAll(2);
        expect(res)
          .to.be.fulfilled.then((docs) => {
            expect(docs)
              .to.be.a('array');
            expect(docs.length)
              .to.equal(0);
            expect(docs)
              .to.eql([]);
            done();
          });
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });
  });

  describe('testing getById', () => {
    // Insert one record , get its id
    // 1. Query by this id and it should return one contact object
    // 2. Query by an arbitrary id and it should return {}
    // 3. Query with null id and it should throw IllegalArgumentException
    // 4. Query with undefined and it should throw IllegalArgumentException
    var id;
    beforeEach((done) => {
      db.save(contactObject).then((res) => {
        id = res._id;
        done();
      });
    });

    it('should return one contact matching parameter id', (done) => {
      try {
        var res = contact.getById(id);
        expect(res).to.eventually.have.property('_id')
          .to.eql(id)
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should return empty object i.e. {} as no contact is identified by this Id ', (done) => {
      try {
        let badId = new mongoose.mongo.ObjectId();
        var res = contact.getById(badId);
        expect(res).to.eventually.to.eql({})
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for undefined Id parameter ", (done) => {
      try {
        let undefinedId;
        let res = contact.getById(undefinedId);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for null Id parameter ", (done) => {
      try {
        let res = contact.getById(null);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should be rejected for arbitrary object as Id parameter ", (done) => {
      // an id is a 12 byte string, -1 is an invalid id value
      let id = contactObject;
      let res = contact.getById(id);
      expect(res)
        .to.eventually.to.be.rejectedWith("must be a single String of 12 bytes")
        .notify(done);
    });

  });

  describe("testing contact.getOne", () => {
    let object1 = {
        //add one valid contact object here
        "tenantId": "IdObj1",
        "firstName": "idObj1",
        "middleName": "idsaravanan",
        "lastName": "Ros",
        "email": "obj1@yahoo.com",
        "emailVerified": true,
        "phoneNo": "265123",
        "mobileNo": "9889586312",
        "mobileVerified": true,
        "faxNumber": "122341",
        "companyName": "Lesus",
        "Address1": "Mgroad",
        "Address2": "Madiwala",
        "city": "Bangalore",
        "state": "karnataka",
        "country": "India",
        "zipCode": "686834"
      },
      object2 = {
        //add one more valid contact object here
        "tenantId": "tenIdj1",
        "firstName": "tenObj1",
        "middleName": "saravanan",
        "lastName": "Rer",
        "email": "obj1@yahoo.com",
        "emailVerified": true,
        "phoneNo": "265123",
        "mobileNo": "9889586312",
        "mobileVerified": true,
        "faxNumber": "122341",
        "companyName": "Lesus",
        "Address1": "Mgroad",
        "Address2": "Madiwala",
        "city": "Bangalore",
        "state": "karnataka",
        "country": "India",
        "zipCode": "686834"
      };
    beforeEach((done) => {
      db.deleteAll().then((res) => {
        db.save(object1).then((res) => {
          db.save(object2).then((res) => {
            done();
          });
        });
      });
    });

    it("should return one contact record identified by attribute", (done) => {
      try {
        // take one attribute from object1 or object2 and its value
        let res = contact.getOne(`email`, `obj1@yahoo.com`);
        expect(res)
          .to.eventually.be.a("object")
          .to.have.property('email')
          .to.eql('obj1@yahoo.com')
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should return empty object i.e. {} as no contact is identified by this attribute', (done) => {
      try {
        // replace validAttribute and add a bad value to it
        var res = contact.getOne(`email`, `yauva`);
        expect(res).to.eventually.to.eql({})
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for undefined Attribute parameter ", (done) => {
      try {
        //replace validvalue with a valid value for an attribute
        let undefinedAttribute;
        let res = contact.getOne(undefinedAttribute, `obj1@yahoo.com`);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for undefined Attribute parameter ", (done) => {
      try {
        // replace validAttribute with a valid attribute name
        let undefinedValue;
        let res = contact.getOne(`email`, undefinedValue);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for null attribute parameter ", (done) => {
      try {
        //replace validValue with a valid value for an attribute
        let res = contact.getOne(null, `obj1@yahoo.com`);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for null value parameter ", (done) => {
      try {
        //replace attributeValue with a valid attribute name
        let res = contact.getOne(`obj1@yahoo.com`, null);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });
  });


  describe("testing contact.getMany", () => {
    let object1 = {
        //add one valid contact object here
        "tenantId": "IdObject",
        "firstName": "getmany",
        "middleName": "idsaravanan",
        "lastName": "Ros",
        "email": "obj1@gmail.com",
        "emailVerified": true,
        "phoneNo": "265123",
        "mobileNo": "988956312",
        "mobileVerified": true,
        "faxNumber": "122341",
        "companyName": "Lesus",
        "Address1": "Mgroad",
        "Address2": "Madiwala",
        "city": "Bangalore",
        "state": "karnataka",
        "country": "china",
        "zipCode": "686834"
      },
      object2 = {
        //add one more valid contact object here
        "tenantId": "Object2",
        "firstName": "getting",
        "middleName": "idsaravanan",
        "lastName": "Ros",
        "email": "obj1@gamil.com",
        "emailVerified": true,
        "phoneNo": "265123",
        "mobileNo": "9889586312",
        "mobileVerified": true,
        "faxNumber": "122341",
        "companyName": "Lesus",
        "Address1": "Mgroad",
        "Address2": "Madiwala",
        "city": "Bangalore",
        "state": "karnataka",
        "country": "UK",
        "zipCode": "686834"
      };
    beforeEach((done) => {
      db.deleteAll().then((res) => {
        db.save(object1).then((res) => {
          db.save(object2).then((res) => {
            done();
          });
        });
      });
    });

    it("should return array of contact records identified by attribute", (done) => {
      try {
        // take one attribute from object1 or object2 and its value
        let res = contact.getMany(`email`, `obj1@gamil.com`);
        expect(res).to.eventually.be.a("array");
        //enter proper length according to input value
        expect(res).to.eventually.have.length(1);
        done();
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should return empty array i.e. [] as no contact is identified by this attribute', (done) => {
      try {
        // replace validAttribute and add a bad value to it
        var res = contact.getMany(`email`, `zxye`);
        expect(res).to.eventually.to.eql([])
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for undefined Attribute parameter ", (done) => {
      try {
        //replace validvalue with a valid value for an attribute
        let undefinedAttribute;
        let res = contact.getMany(undefinedAttribute, `obj1@gamil.com`);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for undefined Attribute parameter ", (done) => {
      try {
        // replace validAttribute with a valid attribute name
        let undefinedValue;
        let res = contact.getMany(`email`, undefinedValue);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for null attribute parameter ", (done) => {
      try {
        //replace validValue with a valid value for an attribute
        let res = contact.getMany(null, `obj1@gamil.com`);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for null value parameter ", (done) => {
      try {
        //replace attributeValue with a valid attribute name
        let res = contact.getMany('email', null);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });
  });
});