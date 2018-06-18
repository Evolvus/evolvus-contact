const mongoose = require('mongoose');
//const validator = require('validator');


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
        maxLength: 50
    },
    emailVerified: {
        type: Boolean
    },
    phoneNo: {
        type: String,
        minLength: 5,
        maxLength: 15
    },
    mobileNo: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15
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