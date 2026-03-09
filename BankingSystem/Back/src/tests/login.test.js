const app = require("../../app")
const supertest = require("supertest")
const bcrypt = require("bcryptjs")
const assert = require("assert")
const {prisma} = require("../utils/db")
const {test, beforeEach, after, describe} = require("node:test")
const {generateUser} = require("./test_helper")
const { TEST_FULLNAME, TEST_EMAIL, TEST_PW } = require("../config/env")
const api = supertest(app)


beforeEach(async () => {
    await prisma.user.deleteMany({});
    const hashedPW = await bcrypt.hash(TEST_PW,10)

    await prisma.user.create({
        data: {
            fullname: TEST_FULLNAME,
            email: TEST_EMAIL,
            hashPW: hashedPW
        },
    })
})


describe("Login Fails", () => {
    test("Email incorrect", async () => {
        const user = {
            email: "wrongEmail@gmail.com",
            password: TEST_PW
        }

        const result = await api.post("/api/auth/login")
                        .send(user)
                        .expect(400)
                        .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes("Incorrect"))
    })

    test("PW incorrect", async () => {
         const user2 = {
            email: TEST_EMAIL,
            password: "wrongPW"
        }

        const result2 = await api.post("/api/auth/login")
                        .send(user2)
                        .expect(400)
                        .expect('Content-Type', /application\/json/)

        assert(result2.body.error.includes("Incorrect"))
    })

    test("Missing fields", async () => {
        const user = {
            email: "    ",
            password: TEST_PW
        }

        const result = await api.post("/api/auth/login")
                        .send(user)
                        .expect(400)
                        .expect('Content-Type', /application\/json/)

        assert.ok(result.body.errors)
        assert(result.body.errors[0].msg.includes("Incorrect"))
    })
})

describe("Login Success", () => {
    const testUser = {
            email: TEST_EMAIL,
            password: TEST_PW
    }

    test("Valid credentials with status 200", async () => {
        await api.post("/api/auth/login")
                                .send(testUser)
                                .expect(200)
                                .expect('Content-Type', /application\/json/)

    })

    test("When logged in - token, email, fullname received", async () => {
        const response = await api.post("/api/auth/login")
                                .send(testUser)
                                .expect(200)
                                .expect('Content-Type', /application\/json/)

        assert.ok(response.body.token)
        assert.ok(response.body.email)
        assert.ok(response.body.fullname)

    })

    test("No hashed PW at reponse", async () => {
        const response = await api.post("/api/auth/login")
                                .send(testUser)
                                .expect(200)
                                .expect('Content-Type', /application\/json/)

        assert.ok(!response.body.hashPW)

    })
})


after(async () => {
    await prisma.$disconnect()
})