import SessionSchema from "./SessionSchema.js";

// insert new user
export const createNewSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

// delete  session
export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};

// get user
export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};

// delete many session
export const deleteManySessions = (filter) => {
  return SessionSchema.deleteMany(filter);
};
