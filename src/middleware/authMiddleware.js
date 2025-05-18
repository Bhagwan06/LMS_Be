import { getSession } from "../models/session/SessionModel.js";
import { getOneUser, getUserByEmail } from "../models/user/UserModel.js";
import {
  createAccessJWT,
  verifyAccessJWT,
  verifyRefreshJWT,
} from "../utils/jwt.js";
import { responseClient } from "./responseClient.js";

export const userAuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";

  // get accessJWT
  if (authorization) {
    const token = authorization.split(" ")[1];

    // check if valid
    const decoded = verifyAccessJWT(token);
    if (decoded.email) {
      // check if exist in session table
      const tokenSession = await getSession({ token });

      if (tokenSession?._id) {
        // get user by email
        const user = await getUserByEmail(decoded.email);

        if (user?._id && user.status === "active") {
          // return the user
          req.userInfo = user;
          return next();
        }
      }
    }

    //   message to show if jwt expired
    message = decoded === "jwt expired" ? decoded : "Unauthorized";
  }

  responseClient({ req, res, message, statusCode: 401 });
};

export const renewAccessJWTMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";

  // get accessJWT
  if (authorization) {
    const token = authorization.split(" ")[1];

    // check if valid
    const decoded = verifyRefreshJWT(token);
    if (decoded.email) {
      // check if exist in session table
      const user = await getOneUser({
        email: decoded.email,
        refreshJWT: token,
      });

      if (user?._id) {
        // create new accessJWT
        const token = await createAccessJWT(decoded.email);
        // return accessJWT
        return responseClient({
          req,
          res,
          message: "Here is the accessJWT",
          payload: token,
        });
      }
    }
  }

  responseClient({ req, res, message, statusCode: 401 });
};
