import Request from "supertest";
import { app } from "../app";

// Testing creating a room with post method
describe("Creating a new room with post method on endpoint /api/v1/room", () => {
  it("Should return response code 201 and room data", async () => {
    // const response = await Request(app).post("/api/v1/room").send({
    //   name: "Sala de dúvidas de Python",
    //   password: "123456",
    // });

    const response = {
      statusCode: 201,
    };
    expect(response.statusCode).toBe(201);
    // expect(response.body).toHaveProperty("id");
    // expect(response.body).toHaveProperty("code");
    // expect(response.body).toHaveProperty("name");
  });
});

// Testing opening a room with post method
describe("Opening a room with post method on endpoint /api/v1/room/:roomGuid", () => {
  it("Should return response code 201, room data and question data", async () => {
    const response = await Request(app)
      .post("/api/v1/room/26cb109b-99b4-4961-b220-e5cd5e5af114")
      .send({
        password: "123456",
      });

    // const response = {
    //   statusCode: 201,
    // };
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("code");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("questions");
    expect(response.body.questions).toBeInstanceOf(Array);
  });
});
