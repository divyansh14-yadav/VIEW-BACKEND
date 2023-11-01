import express from "express";
import authController from "../controller/auth.js"

const authRoute = express.Router();

authRoute.post("/register", authController.register);

authRoute.post("/login", authController.login);

export default authRoute;
