import jwt from "jsonwebtoken";

export const generateJWT = async (id: string) => {
  const secret = process.env.SECRET_JWT ?? "";
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, secret, { expiresIn: '1d' }, (error, token) => {
      if (error) return reject(error);
      resolve(token);
    });
  });
};
