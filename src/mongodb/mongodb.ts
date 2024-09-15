import { MongoClient, Db } from "mongodb";
import { Product } from "../product/product.model";
import { Order } from "../order/order.model";

export class MongoDB {
  private static client: MongoClient;
  private static db: Db;

  public static connect = (databaseUrl: string) =>
    MongoClient.connect(databaseUrl)
      .then(client => MongoDB.client = client)
      .then(async client => {
        MongoDB.db = client.db();

        await MongoDB.product();
        await MongoDB.order();

        return MongoDB.db;
      });

  public static product = () => MongoDB.db.collection<Product>("product")
  public static order = () => MongoDB.db.collection<Order>("order");

  public static close = () => MongoDB.client.close();
}
