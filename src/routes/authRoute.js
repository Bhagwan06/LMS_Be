import express from "express";
import { activateUser, insertNewUser } from "../controllers/authController.js";
import {
  newUserDataValidation,
  userActivationDataValidation,
} from "../middleware/validation/authDataValidation.js";

const router = express.Router();

// user signup

router.post("/register", newUserDataValidation, insertNewUser);
router.post("/activate-user", userActivationDataValidation, activateUser);
router.post("/login");

export default router;
