const transactionService = require("../services/transactions.service")

// api handler functions

const makeDeposit = async (request,response) => {
    const {id} = request.user
    const {accountID, amount} = request.body

    const result = await transactionService.depositMoney(amount,id,accountID)
    response.status(200).send(result)
}


const makeWithDraw = async (request,response) => {
   
}

module.exports = {makeDeposit, makeWithDraw}