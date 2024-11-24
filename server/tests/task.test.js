import server from "../src/app";
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
                    password: "password1"
                });
            expect(response.status).toBe(200);
            token = response.body.token;
        });

        test("It should return all tasks", async () => {
            const response = await supertest(server)
                .get("/api/v1/task/all")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
        });

        test("It shuold return success for a normal task", async () => {
            const taskId=1;
            
            const response = await supertest(server)
                .patch(`/api/v1/task/conclue/${taskId}`)
                .set("Authorization", `Bearer ${token}`)
            expect(response.status).toBe(204);
        })

        test("It should return sucess for a repeatable task", async () => {
            const taskId=8;
            
            const response = await supertest(server)
                .patch(`/api/v1/task/conclue/${taskId}`)
                .set("Authorization", `Bearer ${token}`)
            console.log(response.body)
            expect(response.status).toBe(204);
        })
    });
});