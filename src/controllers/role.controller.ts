import { Request, Response, NextFunction } from "express";
import * as roleService from "../services/role.service";
import { UpdateRoleDTO } from "../dto/role.dto";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await roleService.findRoles();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getOneByRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const param = req.params.role;
    if (typeof param != "string") {
      throw new Error("Expected one role parameter");
    }
    const role: string = param;
    const result = await roleService.findRoleByName(role);
    if (!result)
      return res.status(404).json({ message: "Role not found by name" });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const result = await roleService.createRole(data);
    if (!result) {
      return res.status(404).json({ message: "role not created" });
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const param = req.params.role;
    if (typeof param != "string") {
      throw new Error("Expected one role parameter");
    }
    const role: string = param;
    const data: UpdateRoleDTO = req.body;
    const result = await roleService.updateRole(role, data);
    if (!result) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const param = req.params.role;
    if (typeof param != "string") {
      throw new Error("Expected one role as parameter");
    }
    const role: string = param;
    const result = await roleService.deleteRole(role);
    if (!result) {
      return res.status(404).json({ message: "Role not found" });
    }
    return res.status(200).json({ deleted: result });
  } catch (err) {
    next(err);
  }
};
