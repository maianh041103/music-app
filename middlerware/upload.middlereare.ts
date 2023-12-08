import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../helper/uploadToCloundinary";

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await uploadToCloudinary(req["file"].buffer);
    req.body[req["file"].fieldname] = result;
  } catch (error) {
    console.log(error);
  }

  next();
};