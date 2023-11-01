import express from "express";
import linkController from "../controller/link.js";
import verifyToken from "../middleware/auth.js";

const linkRoute = express.Router();

linkRoute.post("/createLink",verifyToken,linkController.createLink);

linkRoute.get("get",verifyToken, linkController.getAllLinks);

linkRoute.put("/update/:id",verifyToken, linkController.updateLink);

linkRoute.delete("/delete/:id",verifyToken, linkController.deleteLink);

export default linkRoute;
