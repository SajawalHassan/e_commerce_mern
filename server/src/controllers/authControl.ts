import { Request, Response } from "express";
import { validateCreateUserData } from "../validation/authValidation";
import { ExpressUser } from "../interfaces/interfaces";

import User from "../models/User";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void | Response<JSON>> => {
  const { username, email } = req.body;

  const { error } = validateCreateUserData(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Makes sure email does not already exist
    const emailExists: ExpressUser | null = await User.findOne({
      email,
    });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser: Express.User = await User.create({
      username,
      email,
    });

    res.json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
