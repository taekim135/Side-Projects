const app = require("./app.js")
const {PORT} = require("./src/config/env.js")

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`)
    console.log(`Check the server is running:::: http://localhost:${PORT}/health`)
}) 