import mongoose from "mongoose";

const devSchema = mongoose.Schema(
  {
    git_id: {
      type: String,
      required: true,
    },
    git_user_exists: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: String,
    avatar: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dev",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dev",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Dev", devSchema);
