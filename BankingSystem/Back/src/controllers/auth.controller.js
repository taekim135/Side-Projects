// handling response/request

const authService = require("../services/auth.service")

const register = async (request,response) => {   
    const {email, password, fullname} = request.body
    const result = await authService.registerUser(email,password,fullname)
    
    response.status(201).send(result)
}


const login = async (request,response) => {
    const {email, password} = request.body

    const result = await authService.loginUser(email,password)

    response.status(200).send(result)
}

module.exports = {register, login}