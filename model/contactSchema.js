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
    "EmailID": {
      "type": "string",
      "minLength": 8,
      "maxLength": 50,
      "unique": true
    },
    "emailVerified": {
      "type": "boolean"
    },
    "PhoneNumber": {
      "type": "string",
      "minLength": 9,
      "maxLength": 15,
      "unique": true
    },
    "MobileNumber": {
      "type": "string",
      "minLength": 9,
      "maxLength": 15,
      "unique": true
    },
    "mobileVerified": {
      "type": "boolean"
    },
    "Fax": {
      "type": "string",
      "minLength": 9,
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
    "City": {
      "type": "string"
    },
    "State": {
      "type": "string"
    },
    "Country": {
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
  "required": ["tenantId", "firstName", "lastName", "EmailID", "MobileNumber", "PhoneNumber", "Fax", "City", "State", "Country", "createdDate", "lastUpdatedDate"]
};