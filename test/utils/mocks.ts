import { ProductRepository } from "../../src/product/product.repository";
import { OrderRepository } from "../../src/order/order.repository";

export const productRepositoryMock = {
  findAll: jest.fn(),
  findManyById: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  changeStockQuantity: jest.fn()
} as any as ProductRepository

export const orderRepositoryMock = {
  create: jest.fn()
} as any as OrderRepository;
