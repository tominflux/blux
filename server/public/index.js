const express = require("express")

const app = express()
const port = parseInt(process.env.PORT) || 3000

async function run() {
    app.use(express.static("./public"))
    app.listen(
        port, () => {
            console.log(
                `Public server listening on port ${port}!`
            )
        }
    )
}

run()