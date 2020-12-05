import express from "express";

export const login = async (req: express.Request, res: express.Response) => {
  res.send(req.body.ok)
};
