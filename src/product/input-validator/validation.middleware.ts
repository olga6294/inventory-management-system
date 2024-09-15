import { validatorFactory } from "../../common/validator.factory";
import { createProductSchema, restockAndSellProductSchema } from "./schema";

export const validateProductCreationSchema = validatorFactory(createProductSchema);
export const validateProductRestockAndSellSchema = validatorFactory(restockAndSellProductSchema);
