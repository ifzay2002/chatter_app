import express from "express";
import { getProfile, login, register, logout, getOtherUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();



router.post('/register', register)
router.post('/login', login)
router.post('/logout', isAuthenticated, logout)
router.get('/get-profile', isAuthenticated, getProfile)
router.get('/get-other-users', isAuthenticated, getOtherUser)  ///mere illawa baqi jo bh ho ga wo other user m hi ai ga meri id bs mere ho gy tu m pane se compare krwa kr login likh skti ho



export default router;

