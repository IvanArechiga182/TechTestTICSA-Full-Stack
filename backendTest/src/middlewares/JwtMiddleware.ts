import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayloadCustom {
  userId: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadCustom;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ status: 401, message: "A token is required." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayloadCustom;
    req.user = decoded;
    next();
  } catch {
    return res
      .status(401)
      .json({ status: 401, message: "Invalid token was provided." });
  }
};
