// this file handles all env variables
// export them for other files to use
// no direct access to process.env
require("dotenv").config()

const SALT = parseInt(process.env.SALT)
const PORT = process.env.PORT
const DBURL = process.env.DATABASE_URL
const SECRET = process.env.JWT_SECRET
const EXPIRES_IN = process.env.JWT_EXPIRE

module.exports = {PORT, DBURL, SALT, SECRET, EXPIRES_IN}