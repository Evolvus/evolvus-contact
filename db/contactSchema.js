const mongoose = require('mongoose');
const validator = require('validator');


var contactSchema = new mongoose.Schema({
  // Add all attributes below tenantId
  tenantId: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 64
  },
  firstName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50
  },
  middleName: {
    type: String,
    minLength: 1,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50
  },
  EmailID: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 50,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
      isAsync: false
    }
  },
  emailVerified: {
    type: Boolean
  },
  PhoneNumber: {
    type: String,
    minLength: 5,
    maxLength: 15,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[0-9\-\+]+$/.test(v);
      },
      message: "{PATH} can contain only Numbers"
    }
  },
  MobileNumber: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 15,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[0-9\-\+]+$/.test(v);
      },
      message: "{PATH} can contain only Numbers"
    }
  },
  mobileVerified: {
    type: Boolean
  },
  Fax: {
    type: String,
    minLength: 9,
    maxLength: 15,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9+-]*$/.test(v);
      },
      message: "{PATH} can contain only Numbers"
    }
  },
  companyName: {
    type: String,
    minLength: 1,
    maxLength: 64
  },
  Address1: {
    type: String
  },
  Address2: {
    type: String
  },
  City: {
    type: String,
    required: true
  },
  State: {
    type: String,
    required: true
  },
  Country: {
    type: String,
    required: true
  },
  zipCode: {
    type: String
  },
  createdDate: {
    type: Date,
    required: true
  },
  lastUpdatedDate: {
    type: Date,
    required: true
  }


});

module.exports = contactSchema;