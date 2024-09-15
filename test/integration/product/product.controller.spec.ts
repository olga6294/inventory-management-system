import { MongoDB } from "../../../src/mongodb/mongodb";
import configuration from "../../../src/common/configuration";
import request from "supertest";
import { app } from "../../../src/app";
import { getRandomProduct } from "../../unit/order/commands/handlers/utils";
import { getRandomCreateProductCommand } from "../../unit/product/commands/handlers/utils";
import { randomNumber } from "../../utils/utils";

describe("product controller integration tests", () => {

  beforeAll(() => MongoDB.connect(configuration.DB_URL));
  beforeEach(() => MongoDB.product().deleteMany({}));
  afterEach(() => MongoDB.product().deleteMany({}));
  afterAll(() => MongoDB.close());

  it("should get all products", async () => {
    const randomProduct1 = getRandomProduct();
    const randomProduct2 = getRandomProduct();

    await MongoDB.product().insertMany([{...randomProduct1}, {...randomProduct2}]);

    const response = await request(app)
      .get("/products")
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject([randomProduct1, randomProduct2]);
  });

  it("should create new product", async () => {
    const response = await request(app)
      .post("/products")
      .send(getRandomCreateProductCommand());

    expect(response.statusCode).toEqual(201);
  });

  it("should restock product", async () => {
    const randomProduct = getRandomProduct();
    await MongoDB.product().insertOne(randomProduct);

    const response = await request(app)
      .post(`/products/${randomProduct.id}/restock`)
      .send({quantity: randomNumber()});

    expect(response.statusCode).toEqual(200);
  });

  it("should sell product", async () => {
    const randomProduct = getRandomProduct();
    await MongoDB.product().insertOne(randomProduct);

    const response = await request(app)
      .post(`/products/${randomProduct.id}/sell`)
      .send({quantity: randomProduct.stock-2});

    expect(response.statusCode).toEqual(200);
  });
});
