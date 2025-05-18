import {
  EMAIL_REQ,
  FNAME_REQ,
  LNAME_REQ,
  PASSWORD_REQ,
  PHONE_REQ,
  SESSION_REQ,
  TOKEN_REQ,
} from "./joiConst.js";
import { validateData } from "./joiValidation.js";

export const newUserDataValidation = (req, res, next) => {
  const obj = {
    fName: FNAME_REQ,
    lName: LNAME_REQ,
    email: EMAIL_REQ,
    phone: PHONE_REQ,
    password: PASSWORD_REQ,
  };

  validateData({ req, res, next, obj });
};

export const userActivationDataValidation = (req, res, next) => {
  // create schema or rules
  const obj = {
    sessionId: SESSION_REQ,
    t: TOKEN_REQ,
  };

  validateData({ req, res, next, obj });
};

export const loginDataValidation = (req, res, next) => {
  // create schema or rules
  const obj = {
    email: EMAIL_REQ,
    password: PASSWORD_REQ,
  };

  validateData({ req, res, next, obj });
};
