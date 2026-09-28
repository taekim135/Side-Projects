const {authRouter} = require("./src/routes/auth.routes")
const { accountRouter } = require("./src/routes/accounts.routes")
const { transactionRouter } = require("./src/routes/transactions.routes")
const express = require("express")
const cors = require("cors")
const {errorHandler, requestLogger, validate} = require("./src/middleware/middleware") 

// global patch for convenience (account balance is in BigInt)
// For a larger codebase 
// explicit serialization at the API boundary 
// to avoid mutating a global built-in

// front end will receive the balance amount as string too
BigInt.prototype.toJSON = function () {
  return this.toString();
};



const app = express()

// returns middleware
app.use(cors())
app.use(express.json())

app.use(requestLogger)

app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/transactions", transactionRouter)

app.get("/health", (request,response) => {
    response.json({status: "OK"})
})

app.use(validate)
app.use(errorHandler)

module.exports = app