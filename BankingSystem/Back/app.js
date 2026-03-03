const {authRouter} = require("./src/routes/auth.routes")
const express = require("express")
const cors = require("cors")

const app = express()

// returns middleware
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)

app.get("/health", (request,response) => {
    response.json({status: "OK"})
})

module.exports = app