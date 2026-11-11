import { Types } from "mongoose";

import { IRoleDTO } from "./role.dto";

export interface IPhoneDTO {
  type: string;
  number: string;
}

export interface UserResponseDTO {
  _id: Types.ObjectId;
  username: string;
  firstname?: string;
  lastname?: string;
  email: string;
  address?: {
    area?: string;
    street?: string;
    number?: string;
    po?: string;
    municipality?: string;
  };
  phone?: IPhoneDTO[];
  // phone: IPhone[]
  roles: IRoleDTO[];
  // roles: IRole;
}

export interface CreateUserDTO {
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
  email: string;
  address?: {
    area?: string;
    street?: string;
    number?: string;
    po?: string;
    municipality?: string;
  };
  phone?: IPhoneDTO[];
  roles?: string[];
}
