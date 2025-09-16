import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { sendMessage } from "../controllers/message.controller.js";
import { getMessages } from "../controllers/message.controller.js";


const router = express.Router();


router.post('/send/:receiverId', isAuthenticated, sendMessage);
router.get('/get-messages/:otherParticipantId', isAuthenticated, getMessages);


export default router;

