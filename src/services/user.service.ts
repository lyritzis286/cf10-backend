// import User, { IUser } from "../models/user.model";
import Role, { IRole } from "../models/role.model";
import { resourceLimits } from "node:worker_threads";
import * as userDao from "../dao/user.dao";
import { IUser } from "../models/user.model";
import { CreateUserDTO } from "../dto/user.dto";
import { Types } from "mongoose";
// export const findUsers = async (): Promise<IUser[]> => {
export const findUsers = async () => {
  // const users = await User.find()
  //   .populate({ path: "roles", model: Role })
  //   .lean()
  //   .exec();
  const users = await userDao.findAll();
  console.log(">>>>>", users);
  return users;
};

export const findUserByEmail = async (email: string) => {
  const user = await userDao.findByEmail(email);
  if (user) {
    return user;
  }
};

export const createUser = async (payload: Partial<CreateUserDTO>) => {
  let roleIds: Types.ObjectId[] = [];
  if (payload.roles && payload.roles.length > 0) {
    let rolesIds = payload.roles.map((id) => new Types.ObjectId(id));
  } else {
    let reader: IRole | null = await Role.findOne({ role: "Reader" });
    if (!reader) {
      reader = await Role.create({
        role: "READER",
        description: "Deafault role",
        active: true,
      });
      roleIds = [reader._id];
    }
  }

  const user = await userDao.createUser({
    ...payload,
    roles: roleIds,
  });
  if (user) {
    return user;
  }
};
