import Joi from "joi";

export const validateCreateUserData = (data: object) => {
  const object: Joi.Schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().min(3).max(255).required(),
    password: Joi.string().min(8).max(1024).required(),
    profilePic: Joi.string().allow(""),
  });

  return object.validate(data);
};
