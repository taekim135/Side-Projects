const accountService = require("../services/accounts.service")

// api handler functions

const getAccount = async (request,response) => {
    const {id} = request.user
    const accountID = parseInt(request.params.id)

    const result = await accountService.fetchAccount(accountID, id)
    response.status(200).send(result)
}


const getAccounts = async (request,response) => {
    // must match jwt token creation field as it's destructing
    const {id} = request.user
    const result = await accountService.fetchAll(id)
    response.status(200).send(result)
}



const createAccount = async (request,response) => {
    const {accountType} = request.body
    const {id} = request.user
    const result = await accountService.openAccount(id, accountType)
    response.status(200).send(result)
}

module.exports = {getAccount, getAccounts, createAccount}