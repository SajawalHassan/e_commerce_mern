import Joi, { ValidationResult } from "joi";

export const validateCreateUserData = (
  data: object
): ValidationResult<object> => {
  const object: Joi.Schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().min(3).max(255).required(),
  });

  return object.validate(data);
};
