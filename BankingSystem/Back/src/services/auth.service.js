const {prisma} = require("../utils/db")
const bcrypt = require("bcryptjs")
const {SALT} = require("../config/env")


const registerUser = async (email, password, fullname) => {
    const userFound = await prisma.user.findUnique({
        where: {email}
    })

    if (userFound){
        throw new Error("Email already registered. Please login")
    }

    const hashedPW = await bcrypt.hash(password, SALT)
    const user = await prisma.user.create({
        data: {
            email,
            fullname,
            hashPW: hashedPW
        },
        // don't give hashedPW as part of the response
        select: {
            id: true,
            email: true,
            fullname: true,
            role: true,
            createdAt: true
        }
    })

    if (!user){
        throw new Error("Failed to create a new user (Registration Failed)")
    }

    return user
}


const loginUser = async (email, password) => {
    const userFound = await prisma.user.findUnique({
        where: { email },
        select: { email: true, hashPW: true },
    });

    if (!userFound){
        throw new Error("Incorrect email or password")
    }

    const correctPW = await bcrypt.compare(password, hashPW)

    // token here
}

module.exports = {registerUser, loginUser}