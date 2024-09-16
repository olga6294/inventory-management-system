import request from "supertest";
import { app } from "../../../src/app";
import { getRandomCreateOrderCommand } from "../../unit/order/commands/handlers/utils";
import { MongoDB } from "../../../src/mongodb/mongodb";
import configuration from "../../../src/common/configuration";

describe("order controller integration tests", () => {

  beforeAll(() => MongoDB.connect(configuration.DB_URL));
  afterEach(() => MongoDB.order().deleteMany({}));
  afterAll(() => MongoDB.close());

  it("should return status code 201 from POST /orders", async () => {
    const response = await request(app)
      .post("/orders")
      .send(getRandomCreateOrderCommand());

    expect(response.statusCode).toEqual(201);
  })
});
