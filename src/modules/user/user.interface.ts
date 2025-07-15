export enum Role {
  ADMIN = "admin",
  CUSTOMER = "customer",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: Role;
}
