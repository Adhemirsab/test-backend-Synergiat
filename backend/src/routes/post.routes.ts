import { Router } from "express";
import { parser } from "../utils/handleImage";
import { validatorPostRegistration } from "../validators/postValidators";
import {
  createPost,
  getPosts,
  updatePost,
  getPostById,
  deletePost,
} from "../controllers/post.controllers";
const router = Router();
router.post("/", parser.single("image"), validatorPostRegistration, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", parser.single("image"), updatePost);
router.delete("/:id", deletePost);

export default router;
