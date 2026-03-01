require("dotenv").config()
const app = require("./app.js")

const PORT = process.env.PORT || 3331

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`)
}) 