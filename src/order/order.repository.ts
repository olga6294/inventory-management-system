import { Order } from "./order.model";
import { MongoDB } from "../mongodb/mongodb";

export class OrderRepository {

  create = (order: Order) => MongoDB.order().insertOne(order);

}
