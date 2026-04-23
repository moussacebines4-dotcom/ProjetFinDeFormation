import express from "express" ;
const router = express.Router()
import { signup , login, logout , verifyEmail, forgotPassword, resetPassword , verifyToken ,checkAuth} from "../controllers/auth.controller.js";

router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logout)
router.post("/verify-email", verifyEmail)
router.post("./forgot passwort", forgotPassword)
router.post("/reset passWord/:Token", resetPassword)
router.get("/check-auth", verifyToken, checkAuth)
export default router;
