const transactionService = require("../services/transactions.service")

// api handler functions

const makeDeposit = async (request,response) => {
    const {id} = request.user
    const {accoutNum, amount} = request.body

    const result = await transactionService.depositMoney(amount,id,accoutNum)
    response.status(200).send(result)
}


const makeWithDraw = async (request,response) => {
    const {id} = request.user
    const {accoutNum, amount} = request.body

    const result = await transactionService.withdrawMoney(amount,id,accoutNum)
    response.status(200).send(result)
   
}

module.exports = {makeDeposit, makeWithDraw}