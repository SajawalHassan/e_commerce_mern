import { NextFunction, Request, Response } from "express";

export default (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response<JSON> => {
  if (req.user) next();
  else return res.status(401).json({ error: "Not authorized" });
};
