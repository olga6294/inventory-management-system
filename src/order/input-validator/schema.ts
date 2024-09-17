import * as yup from "yup";
import { productSchema } from "../../product/input-validator/schema";

export const createOrderSchema = yup.object({
  body: yup.object({
    customerId: yup.string().required(),
    products: yup.array().of(productSchema).required().min(1)
  })
});
