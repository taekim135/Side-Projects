const {prisma} = require("../utils/db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {SECRET, EXPIRES_IN, SALT} = require("../config/env")


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

const openAccount = () => {

}

module.exports = {fetchAccount, fetchAll, openAccount}