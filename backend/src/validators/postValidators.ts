import { check, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";
import validateResults from "../utils/handleValidator";
export const validatorPostRegistration: (
  | ValidationChain
  | ((req: Request, res: Response, next: NextFunction) => void)
)[] = [
  check("title").exists().notEmpty().isString(),
  check("body").exists().notEmpty().isString(),
  validateResults,
];
