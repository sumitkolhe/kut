import express from "express";
import { HttpError } from "http-errors";

export const errorHandler = (
  err: HttpError,
  _req: any,
  res: express.Response,
  _next: any
) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};
