import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Auth from '../models/auth.js';

dotenv.config();

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Only authenticated users" });
  }

  const token = authorization.replace("Bearer ", "");

  let details;

  try {
    details = await jwt.verify(token, process.env.SECRET);
    
    const { _id } = details;
    const userdata = await Auth.findById(_id);
    req.user = userdata
    // console.log(userdata);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Only authenticated users" });
  }
}

export default verifyToken;