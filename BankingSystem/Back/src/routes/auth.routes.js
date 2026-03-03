// endpoints

const authRouter = require("express").Router()
const {register, login} = require("../controllers/auth.controller")


authRouter.post("/register", register)
authRouter.post('/login', login)

module.exports = {authRouter}