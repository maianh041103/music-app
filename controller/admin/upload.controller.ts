import { Request, Response } from "express";

export const upload = async (req: Request, res: Response): Promise<void> => {
  res.json({
    location: req.body.file
  })
}