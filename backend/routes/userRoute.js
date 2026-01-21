import express from "express";
const router = express.Router();
import { register, Login } from "../controllers/userController.js";

router.route("/register")
    .get(Login)
    .post(register);


export default router;