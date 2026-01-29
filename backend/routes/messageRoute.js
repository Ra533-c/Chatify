import express from "express";
const router = express.Router();
import { Message } from "../models/messageModel.js";
import { sendMessage , getMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";


router.route("/send/:id")
    .post(isAuthenticated , sendMessage);

router.route("/:id")
    .get(isAuthenticated ,getMessage)



export default router;