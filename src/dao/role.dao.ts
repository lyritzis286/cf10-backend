import Role, { IRole } from "../models/role.model";
import { IRoleDTO } from "../dto/role.dto";

export const findAll = async (): Promise<IRoleDTO[]> => {
  return await Role.find().lean().exec();
};

export const findByRole = async (role: string): Promise<IRoleDTO | null> => {
  const result = await Role.findOne({ role: role }).lean().exec();
  return result;
};

export const createRole = async (data: Partial<IRole>): Promise<IRole> => {
  const role = await new Role(data).save();
  return role;
};

export const updateRole = async (
  role: string,
  payload: Partial<IRole>,
): Promise<IRoleDTO | null> => {
  return await Role.findOneAndUpdate({ role: role }, payload, { new: true })
    .lean()
    .exec();
};

export const deleteRole = async (role: string): Promise<boolean> => {
  const result = await Role.findOneAndDelete({ role }).exec();
  return !!result;
};
