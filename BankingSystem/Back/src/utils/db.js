// db.js creates a single instance of PrismaClient and 
// exports it so any file in the project can import it to interact with the database.
// Centralising it here means the app only ever creates one database connection 
// rather than creating a new one in every file that needs it

// all connection, schema defs are in prisma.config.js
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = {prisma}