import { responseClient } from "../middleware/responseClient.js";
import {
  createNewSession,
  deleteManySessions,
  deleteSession,
} from "../models/session/SessionModel.js";
import {
  createNewUser,
  getUserByEmail,
  updateUser,
} from "../models/user/UserModel.js";
import {
  userActivatedNotificationEmail,
  userActivationUrlEmail,
} from "../services/emailService.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { getJwts } from "../utils/jwt.js";

export const insertNewUser = async (req, res, next) => {
  try {
    // to dp signup process
    // receive the user data
    // encrypt the  password
    const { password } = req.body;
    req.body.password = hashPassword(password);

    // insert user into DB
    const user = await createNewUser(req.body);

    if (user?._id) {
      // create an unique user activation link and send to their email

      const session = await createNewSession({
        token: uuidv4(),
        association: user.email,
      });

      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`;

        // send this url to their email
        const emailId = await userActivationUrlEmail({
          email: user.email,
          url,
          name: user.fName,
        });

        if (emailId) {
          const message =
            "We have sent you an email with activation link. Please check your email and follow the instruction to activate your account";
          return responseClient({ req, res, message });
        }
      }
    }
    throw new Error("Unable to create an account, try again later.");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "The email already exist for another user. Try different email or rest the password";
      error.statusCode = 400;
    }
    next(error);
  }
};

export const activateUser = async (req, res, next) => {
  try {
    const { sessionId, t } = req.body;

    const session = await deleteSession({
      _id: sessionId,
      token: t,
    });

    if (session?._id) {
      // update user to active
      const user = await updateUser(
        { email: session.association },
        { status: "active" }
      );

      if (user?._id) {
        // respond  to frontend
        // send email notification

        userActivatedNotificationEmail({ email: user.email, name: user.fName });

        const message = "Your account has been activated, you may log in Now!.";
        return responseClient({ req, res, message });
      }
    }
    const message = "Invalid link or token expired!";
    const statusCode = 400;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // get user by email
    const user = await getUserByEmail(email);

    if (user?._id) {
      // compare password

      const isPassMatch = comparePassword(password, user.password);

      if (isPassMatch) {
        // create jwts
        const jwts = await getJwts(email);
        // response jwts
        return responseClient({
          req,
          res,
          message: "Login Successful!",
          payload: jwts,
        });
      }
    }

    const message = "Invalid login details!";
    const statusCode = 401;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    // get the token
    const { email } = req.userInfo;
    // update refreshJWT TO ""
    await updateUser({ email }, { refreshJWT: "" });
    // remove the accessJWT from session table
    await deleteManySessions({ association: email });
    responseClient({ req, res, message: "you are logged out!" });
  } catch (error) {
    next(error);
  }
};
