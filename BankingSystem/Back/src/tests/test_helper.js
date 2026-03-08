const { TEST_FULLNAME, TEST_EMAIL, TEST_PW } = require("../config/env")

const generateUser = (type) => {
    switch (type){
        case "emailFound":
            return {
                fullname: TEST_FULLNAME,
                email: TEST_EMAIL,
                password: TEST_PW,
                confirmPW: TEST_PW
            }
        case "pwMisMatch":
            return {
                fullname: "mismatched",
                email: "mismatch@gmail.com",
                password: "mismatch100",
                confirmPW: "mismatch200"
            }

        case "pwTooShort":
            return {
                fullname: "mismatched",
                email: "mismatch@gmail.com",
                password: "short",
                confirmPW: "short"
            }

        case "emailFormat":
            return {
                fullname: "Testing User",
                email: "wronggmail.com",
                password: "password1234",
                confirmPW: "password1234"
            }

        case "emptyEmail":
            return {
                fullname: "Testing User",
                email: "        ",
                password: "password1234",
                confirmPW: "password1234"
            }

        case "emptyPW":
            return {
                fullname: "Testing User",
                email: "testing@gmail.com",
                password: "         ",  
                confirmPW: "password1234"
            }

        case "emptyName":
            return {
                fullname: "     ",
                email: "testing@gmail.com",
                password: "password1234",
                confirmPW: "password1234"
            }

        default:
            return {
                fullname: TEST_FULLNAME,
                email: TEST_EMAIL,
                password: TEST_PW,
                confirmPW: TEST_PW
            }
    }
}


module.exports = {generateUser}