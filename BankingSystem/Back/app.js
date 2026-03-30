const {authRouter} = require("./src/routes/auth.routes")
const { accountRouter } = require("./src/routes/accounts.routes")
const express = require("express")
const cors = require("cors")
const {errorHandler, requestLogger, validate} = require("./src/middleware/middleware") 

const app = express()

// returns middleware
app.use(cors())
app.use(express.json())

app.use(requestLogger)

app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)

app.get("/health", (request,response) => {
    response.json({status: "OK"})
})

app.use(validate)
app.use(errorHandler)

module.exports = app