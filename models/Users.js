import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  user_id: {
    type: String,
    maxlength: 60,
  },
  email: {
    type: String,
    required: true,
    maxlength: 200,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Users || mongoose.model("Users", UsersSchema);
