// any transaction requests received here
// transactions can only happen after login
// thus, token & userExtractor needed
// /api/transactions/

const transactionRouter = require("express").Router()
const {makeDeposit, makeWithDraw} = require("../controllers/transactions.controller")
const {tokenExtractor, userExtractor} = require("../middleware/middleware")


// route requests to wherever needed
transactionRouter.post("/deposit", tokenExtractor, userExtractor, makeDeposit)
transactionRouter.post("/withdraw", tokenExtractor, userExtractor, makeWithDraw)
//transactionRouter.get("/:accountID", tokenExtractor, userExtractor, makeTransfer)


module.exports = {transactionRouter}