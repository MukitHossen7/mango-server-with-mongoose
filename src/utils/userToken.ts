import config from "../config";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";

export const createUserToken = (user: Partial<IUser>) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    payload,
    config.JWT_ACCESS_SECRET,
    config.JWT_ACCESS_EXPIRATION
  );
  return {
    accessToken,
  };
};
