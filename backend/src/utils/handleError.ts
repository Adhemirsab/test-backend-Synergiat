import { Response } from "express";
export const handleHttpError = (res: Response, message: object, code = 403) => {
  res.status(code);
  res.send({ error: message });
};
