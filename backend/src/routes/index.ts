import { Router, Response } from "express";
const router = Router();

router.get("/health", (_, res: Response) => {
  res.status(200).json({ message: "Ok" });
});

import postRouter from "./post.routes";

router.use("/post", postRouter);

export default router;
