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
  email: {
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
  phoneNo: {
    type: String,
    minLength: 5,
    maxLength: 15,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[0-9\-\+]{9,15}$/.test(v);
      },
      message: "{PATH} can contain only Numbers"
    }
  },
  mobileNo: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 15,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[0-9\-\+]{9,15}$/.test(v);
      },
      message: "{PATH} can contain only Numbers"
    }
  },
  mobileVerified: {
    type: Boolean
  },
  faxNumber: {
    type: String,
    minLength: 1,
    maxLength: 15
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
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  zipCode: {
    type: String
  }


});

module.exports = contactSchema;