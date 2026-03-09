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
})


describe("Registration Fails: ", () => {
    test("Email already exists", async () => { 
        const hashedPW = await bcrypt.hash(TEST_PW,10)

        // adding data to db using prisma
        await prisma.user.create({
            data: {
                fullname: TEST_FULLNAME,
                email: TEST_EMAIL,
                hashPW: hashedPW
            },
        })

        const testUser = generateUser()

        // send register request to db + same email
        const result = await api.post("/api/auth/register")
                                .send(testUser)
                                .expect(400)
                                .expect('Content-Type', /application\/json/)                       

        assert.ok(result.body.error)
        assert(result.body.error.includes("already registered"))

    })

    test("Passwords don't match", async () => {
        const mismatchedPWUser = generateUser("pwMisMatch")

        const result = await api.post("/api/auth/register")
                                .send(mismatchedPWUser)
                                .expect(400)
                                .expect('Content-Type', /application\/json/)
        
        assert.ok(result.body.errors)
        assert(result.body.errors[0].msg.includes("don't match"))
    })

    test("Passwords too short", async () => {
        const shortUser = generateUser("pwTooShort")

        const result = await api.post("/api/auth/register")
                                .send(shortUser)
                                .expect(400)
                                .expect('Content-Type', /application\/json/)
        
        assert.ok(result.body.errors)
        assert(result.body.errors[0].msg.includes("at least 8"))

    })

    test("Invalid email format", async () => {
        const emailUser = generateUser("emailFormat")

        const result = await api.post("/api/auth/register")
                                .send(emailUser)
                                .expect(400)
                                .expect('Content-Type', /application\/json/)
        

        assert.ok(result.body.errors)
        assert(result.body.errors[0].msg.includes("email format"))

    })

    test("Empty email", async () => {
        const emptyEmailUser = generateUser("emptyEmail")

        const result = await api.post("/api/auth/register")
                                .send(emptyEmailUser)
                                .expect(400)
                                .expect('Content-Type', /application\/json/)
        
        assert.ok(result.body.errors)
        assert(result.body.errors[0].msg.includes("required"))
    })

    test("Empty password", async () => {
        const emptyPWUser = generateUser("emptyPW")

        const result = await api.post("/api/auth/register")
                                .send(emptyPWUser)
                                .expect(400)
                                .expect('Content-Type', /application\/json/)

        assert.ok(result.body.errors)
        assert(result.body.errors[0].msg.includes("required"))
    })

    test("Empty fullname", async () => {
        const emptyFullNameUser = generateUser("emptyName")

        const result = await api.post("/api/auth/register")
                                .send(emptyFullNameUser)
                                .expect(400)
                                .expect('Content-Type', /application\/json/)

        assert.ok(result.body.errors)
        assert(result.body.errors[0].msg.includes("required"))
    })
})


describe("Registration Successful", () => {
    const testUser = generateUser()

    test("Valid inputs used to create user", async () => {
        const user = await api.post("/api/auth/register")
                .send(testUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

        assert.strictEqual(user.body.email, "tester1@test.com")
        assert.strictEqual(user.body.fullname, "Tester Tester")
        assert.ok(user.body.id)
    })

    test("created user exists in db", async () => {
        await api.post("/api/auth/register")
                .send(testUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

        const userInDB = await prisma.user.findUnique({
            where: {email: TEST_EMAIL}
        })

        assert.ok(userInDB)
        assert.strictEqual(userInDB.email, TEST_EMAIL)
    })

    test("hashed pw not in response body", async () => {
        const result = await api.post("/api/auth/register")
                .send(testUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

        assert.ok(!result.hashPW)
    })


})


after(async () => {
    await prisma.$disconnect()
})