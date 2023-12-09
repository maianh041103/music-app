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

export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
  try {
    for (const key in req['files']) {
      req.body[key] = [];
      for (let item of req['files'][key]) {
        const tmp = await uploadToCloudinary(item.buffer);
        req.body[key].push(tmp);
      }
    }
  } catch (error) {
    console.log(error);
  }

  next();
};