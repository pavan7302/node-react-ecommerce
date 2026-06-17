import request from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../db.js";

jest.setTimeout(15000);

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Products API", () => {
  test("GET products returns 200", async () => {
    const response = await request(app).get("/api/products");

    expect(response.statusCode).toBe(200);
  });
});
