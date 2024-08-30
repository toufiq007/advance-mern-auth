import jwt from "jsonwebtoken";

export const generateJwtTokenAndSetCookies = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("auth_token", token, {
    httpOnly: true, // this means the cookie can't be accessed by the frontend javascript code
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
