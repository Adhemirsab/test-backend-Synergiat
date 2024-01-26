import { Request, Response, NextFunction } from "express";
import { validationResult, Result, ValidationError } from "express-validator";

const validateResults = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(403);
    return res.send({ errors: (err as Result<ValidationError>).array() });
  }
};

export default validateResults;
