import jwt from "jsonwebtoken";

export const GenerateJWT = (payload: { id: number }) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};
