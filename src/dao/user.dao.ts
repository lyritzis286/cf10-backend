import User, { IUser } from "../models/user.model";
import Role, { IRole } from "../models/role.model";
import { UserResponseDTO } from "../dto/user.dto";
import { CreateUserDTO } from "../dto/user.dto";

export const findAll = async (): Promise<IUser[]> => {
  return await User.find({}, { password: 0 })
    .populate({ path: "roles", model: Role })
    .lean()
    .exec();
};

export const findByEmail = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email: email })
    .populate({ path: "roles", model: Role })
    .lean()
    .exec();
  return user;
};

export const createUser = async (data: Partial<IUser>): Promise<IUser> => {
  const user = await new User(data).save();
  return user;
};
