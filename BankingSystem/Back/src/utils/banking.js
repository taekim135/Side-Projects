const crypt = require("crypto")

// 10 digit account number + 3 char prefix
const generateAccNum = () => {
    const num = crypt.randomInt(10_000_000_000_000, 99_999_999_999_999)

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let char = ""
    for (let i = 0; i < 3; i++) {
        char += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return (char + num).toString()
}

module.exports = {generateAccNum}