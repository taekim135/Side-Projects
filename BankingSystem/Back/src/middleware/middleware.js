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


// for validating @routes input fields before posting to /register or /login
const validate = (request, response, next) => {
    const errors = validationResult(request)
    
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() })
    }
    next()
}


// token only needed after login
// or @routes where login is required
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")

  // no Bearer auth found, just move onto the next middleware
  if (authorization && authorization.startsWith("Bearer")){
    const Extractedtoken =  authorization.replace("Bearer ", "")
    // Middleware = ingredients prepping:
    // Extracts ingredients (token)
    // Puts them on the counter (request object)
    // Says "ready for the chef!" (calls next())

    // Route handler = chef:
    // Takes the ingredients (request.token)
    // Cooks the dish (creates blog)
    // Serves it (response.json())
    request.token = Extractedtoken
  }

  next()
}


// find who made the request
const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken?.id){
        return response.status(401).send({error: "User ID not Found in the request"})
    }
    request.user = await User.findById(decodedToken.id)
    next()
}

module.exports = {errorHandler, requestLogger, validate, tokenExtractor, userExtractor}