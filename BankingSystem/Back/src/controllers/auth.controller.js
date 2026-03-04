// handling response/request

const authService = require("../services/auth.service")

const register = async (request,response) => {
    const {email, password, confirmPW, fullname} = request.body

    //confirm if pw & confirm pw match
    if (password !== confirmPW) throw new Error("Passwords don't match")

    const result = await authService.registerUser(email,password,fullname)

    console.log('user created & response received from service');
    response.status(201).send(result)
}


const login = async (request,response) => {
    const {email, password} = request.body

    const result = await authService.loginUser(email,password)

    console.log('Login Successful!');
    response.status(200).send(result)
}

module.exports = {register, login}