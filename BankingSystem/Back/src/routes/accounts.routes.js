// accessing accounts
// private thus token & userExtractor needed
// /api/accounts/

const accountRouter = require("express").Router()
const {getAccount, getAccounts, createAccount} = require("../controllers/accounts.controller")
const {tokenExtractor, userExtractor} = require("../middleware/middleware")

// get all accounts associated with the user
//                      middlewares to run before main handler
accountRouter.get("/", tokenExtractor, userExtractor, getAccounts)

//create accuont
accountRouter.post("/", tokenExtractor, userExtractor, createAccount)


accountRouter.get("/:id", tokenExtractor, userExtractor, getAccount)


module.exports = {accountRouter}