import { randomNumber, randomString } from "../../../../utils/utils";
import { CreateProductCommand } from "../../../../../src/product/commands/models/product.command";

export const getRandomCreateProductCommand = (createProductComand?: Partial<CreateProductCommand>) => ({
  name: randomString(),
  description: randomString(),
  price: randomNumber(),
  stock: randomNumber(),
  ...createProductComand
});
