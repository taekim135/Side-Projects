// this file handles all env variables
// export them for other files to use
// no direct access to process.env
require("dotenv").config()

const SALT = parseInt(process.env.SALT)
const PORT = parseInt(process.env.PORT)

const DBURL = process.env.DATABASE_URL
const TESTDBURL = process.env.TEST_DATABASE_URL

const SECRET = process.env.JWT_SECRET
const EXPIRES_IN = process.env.JWT_EXPIRE

const REFRESH = process.env.JWT_REFRESH
const EXPIRE_REFRESH = process.env.JWT_REFRESH_EXPIRE

const TEST_EMAIL = process.env.TEST_EMAIL
const TEST_FULLNAME = process.env.TEST_FULLNAME
const TEST_PW = process.env.TEST_PW

module.exports = {PORT, DBURL, SALT, SECRET,
        EXPIRES_IN, REFRESH, EXPIRE_REFRESH, TESTDBURL, 
        TEST_EMAIL, TEST_FULLNAME,TEST_PW}