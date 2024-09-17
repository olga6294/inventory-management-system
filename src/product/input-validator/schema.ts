import * as yup from "yup";

const requiredString = yup.string().required().min(1).max(50);
const requiredNumber = yup.number().required();

export const productSchema = yup.object({
  id: requiredString,
  name: requiredString,
  description: requiredString,
  price: requiredNumber,
  stock: requiredNumber,
}).noUnknown();

export const createProductSchema = yup.object({
  body: yup.object({
    name: requiredString,
    description: requiredString,
    price: requiredNumber,
    stock: requiredNumber,
  }).noUnknown()
});

export const restockAndSellProductSchema = yup.object({
  params: yup.object({
    id: requiredString
  }),
  body: yup.object({
    quantity: requiredNumber
  }).noUnknown()
});
