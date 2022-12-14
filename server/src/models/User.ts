import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  password: {
    type: String,
    min: 8,
    max: 1024,
    default: "",
  },
  profilePic: {
    type: String,
    defualt: "",
  },
});

export default model("users", userSchema);
