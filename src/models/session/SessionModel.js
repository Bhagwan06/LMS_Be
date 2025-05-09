import SessionSchema from "./SessionSchema.js";

// insert new user
export const createNewSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

// delete new user
export const deleteNewSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};
