import { Request, Response } from "express";

interface APIResponseOptions {
  message?: string;
  code?: number;
  data?: any;
}

export const apiResponse = {
  sendSuccess: (res: Response, options?: APIResponseOptions) =>
    res.status(options.code || 200).send({
      success: true,
      message: options.message || "Successful response",
      data: options.data,
    }),
  sendUnauthorized: (res: Response, options?: APIResponseOptions) =>
    res.status(options.code || 401).send({
      success: false,
      message: options.message || "Unauthorized",
      data: options.data,
    }),
  sendBadRequest: (res: Response, options?: APIResponseOptions) =>
    res.status(options.code || 400).send({
      success: false,
      message: options.message || "Bad Request",
      data: options.data,
    }),
  sendNotFound: (res: Response, options?: APIResponseOptions) =>
    res.status(options.code || 404).send({
      success: false,
      message: options.message || "Not Found",
      data: options.data,
    }),
  sendUnexpected: (res: Response, options?: APIResponseOptions) =>
    res.status(options.code || 500).send({
      success: false,
      message: options.message || "Not Found",
      data: options.data,
    }),
};
