import express from "express"
import { userLogin, userRegistration } from "../Controllers/UserController";

const router = express.Router();

router.post("/registerUser", userRegistration);
router.post("/loginUser", userLogin);

export { router as UserRoute};