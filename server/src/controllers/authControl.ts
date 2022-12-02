import { Request, Response } from "express";
import { validateCreateUserData } from "../validation/authValidation";

import { hash } from "bcrypt";
import User from "../models/User";
import { ExpressUser } from "../interfaces/interfaces";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void | Response<JSON, Record<string, any>>> => {
  const { username, email, password: unHashedPass, profilePic } = req.body;

  const { error } = validateCreateUserData(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const emailExists: ExpressUser | null = await User.findOne({
      email: req.body.email,
    });
    if (emailExists) return res.status(400).json("Email already exists");

    const password: string = await hash(unHashedPass, 10);

    const newUser: Express.User = await User.create({
      username,
      email,
      password,
      profilePic,
    });

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
