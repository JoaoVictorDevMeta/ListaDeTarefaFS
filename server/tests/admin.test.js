import server from "../src/app";
import supertest from "supertest";

describe("GET /api/v1/admin", () => {
    /*describe("when the user is not an admin", () => {
        it("returns status 401", async () => {
            const response = await supertest(server)
                .get("/api/v1/admin/users")
                .set("Authorization", "Bearer token");

            expect(response.status).toEqual(401);
        });
    });*/

    describe("when the user is an admin", () => {
        test("all users are returned", async () => {
            const response = await supertest(server)
                .get("/api/v1/admin/users")
                .set("Authorization", ""); //add token here
            expect(response.status).toBe(200);
        })

        test("It should return all tasks of the user on the params", async () => {
            const userId = 1
            const response = await supertest(server)
                .get(`/api/v1/admin/tasks/${userId}`)
                .set("Authorization", ""); //add token here
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.arrayContaining([]));
        })
        
        test("It should return a 404 status code if the user does not exist", async () => {
            const userId = 999
            const response = await supertest(server)
                .get(`/api/v1/admin/tasks/${userId}`)
                .set("Authorization", ""); //add token here
            expect(response.status).toBe(404);
        })

        /*test("It should delete the task with the id on the params", async () => {
            const taskId = 1
            const response = await supertest(server)
                .delete(`/api/v1/admin/delete/task/${taskId}`)
                .set("Authorization", ""); //add token here
            expect(response.status).toBe(204);
        })*/
    });
})