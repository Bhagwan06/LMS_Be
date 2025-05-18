import UserSchema from "./UserSchema.js";

// insert new user
export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};

// update  user
export const updateUser = (filter, update) => {
  return UserSchema.findOneAndUpdate(filter, update, { new: true });
};

// get  user; email: type string
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

// get one user
export const getOneUser = (filter) => {
  return UserSchema.findOne(filter);
};
