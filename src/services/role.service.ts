import * as roleDao from "../dao/role.dao";
import { IRole } from "../models/role.model";
import { CreateRoleDTO, UpdateRoleDTO } from "../dto/role.dto";

export const findRoles = async () => {
  const roles = await roleDao.findAll();
  return roles;
};

export const findRoleByName = async (role: string) => {
  const result = await roleDao.findByRole(role);
  if (result) {
    return result;
  }
};

export const createRole = async (payload: CreateRoleDTO) => {
  const role = await roleDao.createRole(payload);
  if (role) {
    return role;
  }
};

export const updateRole = async (role: string, payload: UpdateRoleDTO) => {
  const updateData: Partial<IRole> = {};

  if (payload.description !== undefined)
    updateData.description = payload.description;
  if (payload.active !== undefined) updateData.active = payload.active;

  const result = await roleDao.updateRole(role, updateData);
  return result;
};

export const deleteRole = async (role: string) => {
  const result = await roleDao.deleteRole(role);
  return result;
};
