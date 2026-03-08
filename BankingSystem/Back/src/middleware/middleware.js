// custom error handler

const logger = require("../utils/logger")
const {validationResult} = require("express-validator")


const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    
    if (error.name === "JsonWebTokenError"){
        response.status(401).json({ "error": 'Invalid Token' })
    }else if (error.name === "TokenExpiredError"){
        response.status(401).json({ "error": 'Token Expired' })
    }else if (error.code === "P2002"){
        response.status(409).json({ "Prisma error": 'Duplicate Entry' })
    }else if (error.code === "P2025"){
        response.status(404).json({ "Prisma error": 'Record not Found in DB' })
    }else if (error.message) {
        response.status(400).json({ error: error.message })
    }else{
        response.status(500).json({ "error": 'Internal Server Error' })
    }
}

const requestLogger = (request, response, next) => {
    logger.info('----------')
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('----------')
    next()
}


const validate = (request, response, next) => {
    const errors = validationResult(request)
    
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() })
    }
    next()
}

module.exports = {errorHandler, requestLogger, validate}