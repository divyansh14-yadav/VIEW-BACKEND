import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Auth = mongoose.model("auth", authSchema);

export default Auth;
