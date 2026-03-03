// this file handles all env variables
// export them for other files to use
// no direct access to process.env
require("dotenv").config()

const SALT = parseInt(process.env.SALT)
const PORT = process.env.PORT
const DBURL = process.env.DATABASE_URL

module.exports = {PORT, DBURL, SALT}