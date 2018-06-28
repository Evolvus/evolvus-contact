/*
 ** JSON Schema representation of the contact model
 */
module.exports.schema = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "contactModel",
  "type": "object",
  "properties": {
    "tenantId": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "firstName": {
      "type": "string",
      "minLength": 1,
      "maxLength": 50
    },
    "middleName": {
      "type": "string",
      "minLength": 1,
      "maxLength": 50
    },
    "lastName": {
      "type": "string",
      "minLength": 1,
      "maxLength": 50
    },
    "emailId": {
      "type": "string",
      "minLength": 8,
      "maxLength": 50,
      "unique": true
    },
    "emailVerified": {
      "type": "boolean"
    },
    "phoneNumber": {
      "type": "string",
      "minLength": 9,
      "maxLength": 15,
      "unique": true
    },
    "mobileNumber": {
      "type": "string",
      "minLength": 9,
      "maxLength": 15,
      "unique": true
    },
    "mobileVerified": {
      "type": "boolean"
    },
    "faxNumber": {
      "type": "string",
      "minLength": 9,
      "maxLength": 15
    },
    "companyName": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "address1": {
      "type": "string"
    },
    "address2": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "state": {
      "type": "string"
    },
    "country": {
      "type": "string"
    },
    "zipCode": {
      "type": "string"
    },
    "createdDate": {
      "type": "string",
      "format": "date-time"
    },
    "lastUpdatedDate": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": ["tenantId", "firstName", "lastName", "emailId", "mobileNumber", "phoneNumber", "faxNumber", "city", "state", "country", "createdDate", "lastUpdatedDate"]
};