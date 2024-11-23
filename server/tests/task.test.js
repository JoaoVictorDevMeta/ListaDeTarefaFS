import { server } from "../src/app";
import supertest from "supertest";

describe("GET /api/v1/task", () => {
    describe("when the user is not logged", () => {
        test("returns status 401", async () => {
            const response = await supertest(server)
                .get("/api/v1/task/all")
                .set("Authorization", "Bearer token");

            expect(response.status).toBe(401);
        });
    });

    describe("when the user is logged", () => {
        let token = "";
        test("log the user", async () => {
            const response = await supertest(server)
                .post("/api/v1/auth/login")
                .set("Authorization", token)
                .send({
                    email: "user1@example.com",
                    password: "password123"
                });
            expect(response.status).toBe(200);
            token = response.body.token;
            console.log(token);
        });
    });
});