import { Request, Response } from "express";
import Mango from "./mango.model";
import { mangoServices } from "./mango.service";
import { catchAsync } from "../../utils/catchAsync";

const createMango = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const savedMango = await mangoServices.createMangoIntoDB(payload);
  res.status(201).json({
    status: "success",
    message: "Mango created successfully",
    data: savedMango,
  });
});

const getMangos = async (req: Request, res: Response) => {
  try {
    const mangos = await mangoServices.getMangosFromDB();
    res.status(201).json({
      status: "success",
      message: "Mangos retrieved successfully",
      data: mangos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve mango",
      error,
    });
  }
};

const getMangoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mangos = await mangoServices.getMangoByIdFromDB(id);
    res.status(201).json({
      status: "success",
      message: "Mango retrieved by Id  successfully",
      data: mangos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve by id mango",
      error,
    });
  }
};

const updateMangoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const mangos = await Mango.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: "success",
      message: "Mango update by Id successfully",
      data: mangos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update by id mango",
      error,
    });
  }
};

const deleteMangoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mango = await Mango.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "Mango delete by Id successfully",
      data: mango,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete by id mango",
      error,
    });
  }
};

export const mangoController = {
  createMango,
  getMangos,
  getMangoById,
  updateMangoById,
  deleteMangoById,
};
