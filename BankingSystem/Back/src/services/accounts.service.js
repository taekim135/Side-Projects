const {prisma} = require("../utils/db")
const {generateAccNum} = require("../utils/banking")


const fetchAccount = async (accountID, userID) => {
    const oneAccount = await prisma.account.findUnique({
        where: {id: accountID}
    })

    if (!oneAccount) throw new Error("Account not found")
    
    if (oneAccount.userId != userID) throw new Error("Not Authorized to check other client's account")

    return oneAccount
}

const fetchAll = async (userID) => {
    const accounts = await prisma.account.findMany({
        where: {userId: userID}
    })

    if (accounts.length == 0) throw new Error("No accounts found under this user")

    return accounts
}

const openAccount = async (userId, accountType) => {
    const account = await prisma.account.create({
        data: {
            userId,
            accountType,
            accountNumber: generateAccNum()
        }
    })

    if (!account) throw new Error("Failed to open an account")

    return account
}

module.exports = {fetchAccount, fetchAll, openAccount}