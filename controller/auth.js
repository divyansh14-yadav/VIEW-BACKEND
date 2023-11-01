import express from "express";
import Auth from "../models/auth.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authController = express.Router();

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body, "body");

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Field is required" });
    }

    const user = await Auth.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already taken" });
    }

    const pass = await bcrypt.hash(password, 10);

    const auth = await Auth({
      name,
      email,
      password: pass,
    });

    const data = await auth.save();
    console.log(data,11111);

    res.status(200).json({ message: "Registration Successfully done", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Field is required" });
    }
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "Email not found" });
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkPassword) {
      return res.status(400).send({ message: "Password invalid" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        email,
      },
      process.env.SECRET,
      {
        expiresIn: "24h",
      }
    );
    let _id = user._id;

    const data = await user.save();

    res.status(200).send({ message: "You are logged in", _id, token, email });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export default { register, login, authController };
