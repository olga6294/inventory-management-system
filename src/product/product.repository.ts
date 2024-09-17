import { MongoDB } from "../mongodb/mongodb";
import { Product } from "./product.model";

export class ProductRepository {

  findAll = () => MongoDB.product().find({}, { projection: { _id: 0 }}).toArray();

  findManyById = (ids: string[]) => MongoDB.product().find({id: { $in: ids }}).toArray();

  findOne = (id: string) => MongoDB.product().findOne({id});

  create = (product: Product) => MongoDB.product().insertOne(product);

  changeStockQuantity = (id: string, quantity: number) => MongoDB.product().findOneAndUpdate({id}, {$inc: {stock: quantity}}, {returnDocument: "after"});

}
