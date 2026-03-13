// endpoints
// /api/auth
const authRouter = require("express").Router()
const {register, login} = require("../controllers/auth.controller")
const { body } = require('express-validator')
const {validate} = require("../middleware/middleware")

// check the inputs
authRouter.post("/register", [
    body('email').trim().notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email format'),
    
    body('password').trim().notEmpty().withMessage('Password is required')
                .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

    body('confirmPW').trim().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords don't match")
        }
        return true
    }),
    body('fullname').trim().notEmpty().withMessage('Full name is required')
], validate, register)


authRouter.post('/login', [
    body('email').trim().notEmpty().withMessage('Incorrect Email or PW')
            .isEmail().withMessage('Invalid email format'),
    
    body('password').trim().notEmpty().withMessage('Incorrect Email or PW')
] , validate, login)

module.exports = {authRouter}