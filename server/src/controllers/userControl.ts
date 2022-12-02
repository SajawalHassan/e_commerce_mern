import { Request, Response } from "express";

export const getCurrentUser = (
  req: Request,
  res: Response
): void | Response<JSON> => {
  res.json({ user: req.user });
};
