import supertest from "supertest";
import {web} from "../application/web";
import {logger} from "../application/logging";
import {UserTest} from "./test-util";
import e from "express";

describe('POST /api/users', () => {

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should reject register new user if request invalid',  async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: "",
                password: "",
                name: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    });

    it('should register new user', async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "test",
                name: "test",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.name).toBe("test")
    });
})

describe('POST /api/users/login', () => {

    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to login', async() => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
              username: "test",
              password: "test"
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.name).toBe("test")
        expect(response.body.data.token).toBeDefined()
    });
    it('should reject login if username is wrong', async() => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "salah",
                password: "test"
            })

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    });
});


describe('DELETE /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create()
    });

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to logout', async () => {
        const response = await supertest(web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "test")

        logger.debug(response.body);
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("ok")

        const user = await UserTest.get()
        expect(user.token).toBe(null)
    });
});