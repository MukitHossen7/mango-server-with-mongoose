import { Types } from "mongoose";

interface IAddress {
  zipcode: string;
  state: string;
  country: string;
  street: string;
}
export interface IOrder {
  user: Types.ObjectId;
  mango: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: "pending" | "process" | "complete";
  address: IAddress;
}
