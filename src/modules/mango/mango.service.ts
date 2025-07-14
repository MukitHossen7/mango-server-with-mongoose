import { IMango } from "./mango.interface";
import Mango from "./mango.model";

const createMangoIntoDB = async (payload: IMango) => {
  const mango = new Mango(payload);
  const savedMango = await mango.save();
  return savedMango;
};

const getMangosFromDB = async () => {
  const mangos = await Mango.find();
  return mangos;
};

const getMangoByIdFromDB = async (id: string) => {
  const mango = await Mango.findById(id);
  return mango;
};
export const mangoServices = {
  createMangoIntoDB,
  getMangosFromDB,
  getMangoByIdFromDB,
};
