import mongoose from "mongoose";
import { Post } from "../interfaces/post.interface";
const PostScheme = new mongoose.Schema<Post>(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    url: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<Post>("post", PostScheme);
