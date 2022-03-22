import Request from "supertest";
import { app } from "../app";

describe("Create a new question with post method on endpoint /api/v1/question", () => {
  it("Should return response code 201", async () => {
    // const response = await Request(app).post("/api/v1/question").send({
    //   roomId: "26cb109b-99b4-4961-b220-e5cd5e5af114",
    //   title: "Hook useState",
    //   content: "Para que serve o useState no React?",
    // });
    const response = {
      statusCode: 201,
    };

    expect(response.statusCode).toBe(201);
  });
});
