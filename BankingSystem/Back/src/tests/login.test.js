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


describe("Testing Login feature", () => {
    test("Email/PW incorrect", async () => {
        const user = {
            email: "wrongEmail@gmail.com",
            password: TEST_PW
        }

        const result = await api.post("/api/auth/login")
                        .send(user)
                        .expect(400)
                        .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes("Incorrect"))

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


after(async () => {
    await prisma.$disconnect()
})