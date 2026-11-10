// import User, { IUser } from "../models/user.model";
// import Role, { IRole } from "../models/role.model";
import { resourceLimits } from "node:worker_threads";
import * as userDao from "../dao/user.dao";
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
