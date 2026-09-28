const {prisma} = require("../utils/db")
const { fetchAccount } = require("./accounts.service")


const depositMoney = async (amount, userID, accountNum) => {
    if (amount <= 0) throw new Error("Deposit failed - Invalid Amount")
    
        // not sure if i'm meant to use this var
        // validation all inside fetchAccount method already
    const targetAccount = await fetchAccount(accountNum, userID)

    // one method as a whole for atomicity
    // multiple db writes all-or-nothing
    const result = await prisma.$transaction(async (tx) => {

        // since balanceCents is BigInt
        // amount is in regular number
        // if problem, use BigInt(amount)
        // 9/27 -> global conversion used

        const updatedAcc = await tx.account.update({
                                where: {
                                    accountNumber: accountNum
                                },
                                data: {
                                    balanceCents: {increment: amount}
                                }
                            })

        const updatedTrans = await tx.transaction.create({
            data:{
                toAccountId: updatedAcc.id,
                fromAccountId: null,
                amountCents: amount,
                type: "deposit",
                status: "completed"
            }
        })
        
        return {account: updatedAcc, transaction: updatedTrans}
    })

    
    return result
    
}



const withdrawMoney = async () =>{



}


module.exports = {depositMoney,withdrawMoney}