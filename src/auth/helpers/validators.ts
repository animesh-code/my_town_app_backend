import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const registerValidationRules = () => {
  return [
    body("place_id", "place_id is required").notEmpty(),
    body("name", "Name is required").notEmpty(),
    body("number", "Number is required").notEmpty(),
  ];
};

export const loginValidationRules = () => {
  return [
    body("number", "Number is required").notEmpty().isLength({ max: 10 }),
  ];
};

export const checkValidationRules = () => {
  return [
    body("number", "Number is required")
      .notEmpty()
      .isLength({ min: 10, max: 10 }),
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any = [];
  errors
    .array({ onlyFirstError: true })
    .map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({ errors: extractedErrors });
};
