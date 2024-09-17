import { validatorFactory } from "../../common/validator.factory";
import { createOrderSchema } from "./schema";

export const validateOrderCreationSchema = validatorFactory(createOrderSchema)
