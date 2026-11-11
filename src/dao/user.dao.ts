import User, { IUser } from "../models/user.model";
import Role, { IRole } from "../models/role.model";
import { UserResponseDTO } from "../dto/user.dto";
import { IRoleDTO } from "../dto/role.dto";

export const findAll = async (): Promise<UserResponseDTO[]> => {
  return await User.find({}, { password: 0 })
    .populate<{ roles: IRoleDTO[] }>({ path: "roles", model: Role })
    .lean()
    .exec();
};

export const findByEmail = async (
  email: string,
): Promise<UserResponseDTO | null> => {
  const user = await User.findOne({ email: email })
    .populate<{ roles: IRoleDTO[] }>({ path: "roles", model: Role })
    .lean()
    .exec();
  return user;
};

export const createUser = async (data: Partial<IUser>): Promise<IUser> => {
  const user = await new User(data).save();
  return user;
};
