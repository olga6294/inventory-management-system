export interface CreateProductCommand {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface RestockProductCommand {
  id: string
  quantity: number;
}

export type UpdateProductQuantityDto = {
  quantity: number;
}

export type SellProductCommand = RestockProductCommand;
