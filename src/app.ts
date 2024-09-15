import express from "express";
import { routers } from "./context";
import { httpErrorHandler } from "./error-handler/error.handler";

export const app = express()
  .use(express.json())
  .use(routers)
  .use(httpErrorHandler)
