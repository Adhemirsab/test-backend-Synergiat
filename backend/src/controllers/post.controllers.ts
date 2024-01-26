import { Request, Response } from "express";
import postModel from "../models/post";
import { Post } from "../interfaces/post.interface";
import { handleHttpError } from "../utils/handleError";
export const createPost = async (req: Request, res: Response) => {
  try {
    const { body, file } = req;

    if (!file || !file.path) {
      return res.status(400).send({ error: "No file uploaded" });
    }
    const fileData: Post = {
      title: body.title,
      body: body.body,
      url: file.path,
    };
    const data = await postModel.create(fileData);
    res.status(201).json(data);
  } catch (error) {
    handleHttpError(res, { message: "ERROR_CREATE_POST", error: error }, 500);
  }
};
export const getPosts = async (req: Request, res: Response) => {
  try {
    const data = await postModel.find({ isDeleted: false });
    res.status(200).json(data);
  } catch (error) {
    handleHttpError(res, { message: "ERROR_LIST_POSTS", error: error }, 500);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await postModel.findById(id);
    if (!data) {
      return res.status(404).send({ error: "Post not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    handleHttpError(res, { message: "ERROR_GET_POST", error: error }, 500);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { body, file, params } = req;
    const { id } = params;

    if (!file || !file.path) {
      return res.status(400).send({ error: "No file uploaded" });
    }

    const fileData: Post = {
      title: body.title,
      body: body.body,
      url: file.path,
    };

    const data = await postModel.findByIdAndUpdate(id, fileData, {
      new: true,
    });
    if (!data) {
      return res.status(404).send({ error: "Post not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    handleHttpError(res, { message: "ERROR_UPDATE_POST", error: error }, 500);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await postModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!data) {
      return res.status(404).send({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post successfully deleted" });
  } catch (error) {
    handleHttpError(res, { message: "ERROR_DELETE_POST", error: error }, 500);
  }
};
