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
    "email": {
      "type": "string",
      "minLength": 8,
      "maxLength": 50,
      "unique": true
    },
    "emailVerified": {
      "type": "boolean"
    },
    "phoneNo": {
      "type": "string",
      "minLength": 5,
      "maxLength": 15,
      "unique": true
    },
    "mobileNo": {
      "type": "string",
      "minLength": 5,
      "maxLength": 15,
      "unique": true
    },
    "mobileVerified": {
      "type": "boolean"
    },
    "faxNumber": {
      "type": "string",
      "minLength": 1,
      "maxLength": 15
    },
    "companyName": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "Address1": {
      "type": "string"
    },
    "Address2": {
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
    }
  },
  "required": ["tenantId", "firstName", "lastName", "email", "mobileNo"]
};