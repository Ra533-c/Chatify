import express from "express";
const router = express.Router();
import { register, Login, Logout, getOtherUsers, getMe } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

router.route("/register")
    .post(register)

router.route("/login")
    .post(Login)

router.route("/logout")
    .get(Logout)

router.route("/me")
    .get(isAuthenticated, getMe)

router.route("/")
    .get(isAuthenticated, getOtherUsers)

export default router;