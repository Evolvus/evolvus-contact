const debug = require("debug")("evolvus-contact:index");
const contactSchema = require("./model/contactSchema")
  .schema;
const contactCollection = require("./db/contact");
const validate = require("jsonschema")
  .validate;
const docketClient=require("evolvus-docket-client");

var docketObject={
  // required fields
  application:"PLATFORM",
  source:"contact",
  name:"",
  createdBy:"",
  ipAddress:"",
  status:"SUCCESS", //by default
  eventDateTime:Date.now(),
  keyDataAsJSON:"",
  details:"",
  //non required fields
  level:""
};

module.exports.validate = (contactObject) => {
  return new Promise((resolve, reject) => {
    try {
      if(typeof contactObject==="undefined" ) {
        throw new Error("IllegalArgumentException:contactObject is undefined");
      }
      var res = validate(contactObject, contactSchema);
      debug("validation status: ", JSON.stringify(res));
      if(res.valid) {
        resolve(res.valid);
      } else {
        reject(res.errors);
      }
    } catch (err) {
      reject(err);
    }
  });
};

// All validations must be performed before we save the object here
// Once the db layer is called its is assumed the object is valid.
module.exports.save = (contactObject) => {
  return new Promise((resolve, reject) => {
    try {
      if(typeof contactObject === 'undefined' || contactObject == null) {
         throw new Error("IllegalArgumentException: contactObject is null or undefined");
      }
      docketObject.name="contact_save";
      docketObject.keyDataAsJSON=JSON.stringify(contactObject);
      docketObject.details=`contact creation initiated`;
      docketClient.postToDocket(docketObject);
      var res = validate(contactObject, contactSchema);
      debug("validation status: ", JSON.stringify(res));
      if(!res.valid) {
        reject(res.errors);
      }

      // Other validations here


      // if the object is valid, save the object to the database
      contactCollection.save(contactObject).then((result) => {
        debug(`saved successfully ${result}`);
        resolve(result);
      }).catch((e) => {
        debug(`failed to save with an error: ${e}`);
        reject(e);
      });
    } catch (e) {
      docketObject.name="contact_ExceptionOnSave";
      docketObject.keyDataAsJSON=JSON.stringify(contactObject);
      docketObject.details=`caught Exception on contact_save ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

// List all the objects in the database
// makes sense to return on a limited number
// (what if there are 1000000 records in the collection)
module.exports.getAll = (limit) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof(limit) == "undefined" || limit == null) {
        throw new Error("IllegalArgumentException: limit is null or undefined");
      }
      docketObject.name="contact_getAll";
      docketObject.keyDataAsJSON=`getAll with limit ${limit}`;
      docketObject.details=`contact getAll method`;
      docketClient.postToDocket(docketObject);

      contactCollection.findAll(limit).then((docs) => {
        debug(`contact(s) stored in the database are ${docs}`);
        resolve(docs);
      }).catch((e) => {
        debug(`failed to find all the contact(s) ${e}`);
        reject(e);
      });
    } catch (e) {
      docketObject.name="contact_ExceptionOngetAll";
      docketObject.keyDataAsJSON="contactObject";
      docketObject.details=`caught Exception on contact_getAll ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};


// Get the entity idenfied by the id parameter
module.exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    try {

      if (typeof(id) == "undefined" || id == null) {
        throw new Error("IllegalArgumentException: id is null or undefined");
      }
      docketObject.name="contact_getById";
      docketObject.keyDataAsJSON=`contactObject id is ${id}`;
      docketObject.details=`contact getById initiated`;
      docketClient.postToDocket(docketObject);

      contactCollection.findById(id)
        .then((res) => {
          if (res) {
            debug(`contact found by id ${id} is ${res}`);
            resolve(res);
          } else {
            // return empty object in place of null
            debug(`no contact found by this id ${id}`);
            resolve({});
          }
        }).catch((e) => {
          debug(`failed to find contact ${e}`);
          reject(e);
        });

    } catch (e) {
      docketObject.name="contact_ExceptionOngetById";
      docketObject.keyDataAsJSON=`contactObject id is ${id}`;
      docketObject.details=`caught Exception on contact_getById ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

module.exports.getOne=(attribute,value)=> {
  return new Promise((resolve,reject)=> {
    try {
      if (attribute == null || value == null || typeof attribute === 'undefined' || typeof value === 'undefined') {
        throw new Error("IllegalArgumentException: attribute/value is null or undefined");
      }

      docketObject.name="contact_getOne";
      docketObject.keyDataAsJSON=`contactObject ${attribute} with value ${value}`;
      docketObject.details=`contact getOne initiated`;
      docketClient.postToDocket(docketObject);
      contactCollection.findOne(attribute,value).then((data)=> {
        if (data) {
          debug(`contact found ${data}`);
          resolve(data);
        } else {
          // return empty object in place of null
          debug(`no contact found by this ${attribute} ${value}`);
          resolve({});
        }
      }).catch((e)=> {
        debug(`failed to find ${e}`);
      });
    } catch (e) {
      docketObject.name="contact_ExceptionOngetOne";
      docketObject.keyDataAsJSON=`contactObject ${attribute} with value ${value}`;
      docketObject.details=`caught Exception on contact_getOne ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

module.exports.getMany=(attribute,value)=> {
  return new Promise((resolve,reject)=> {
    try {
      if (attribute == null || value == null || typeof attribute === 'undefined' || typeof value === 'undefined') {
        throw new Error("IllegalArgumentException: attribute/value is null or undefined");
      }

      docketObject.name="contact_getMany";
      docketObject.keyDataAsJSON=`contactObject ${attribute} with value ${value}`;
      docketObject.details=`contact getMany initiated`;
      docketClient.postToDocket(docketObject);
      contactCollection.findMany(attribute,value).then((data)=> {
        if (data) {
          debug(`contact found ${data}`);
          resolve(data);
        } else {
          // return empty object in place of null
          debug(`no contact found by this ${attribute} ${value}`);
          resolve([]);
        }
      }).catch((e)=> {
        debug(`failed to find ${e}`);
      });
    } catch (e) {
      docketObject.name="contact_ExceptionOngetMany";
      docketObject.keyDataAsJSON=`contactObject ${attribute} with value ${value}`;
      docketObject.details=`caught Exception on contact_getMany ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};
