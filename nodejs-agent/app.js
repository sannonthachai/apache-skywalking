const express = require('express')
const { default: agent } = require("skywalking-backend-js");
const app = express()
const port = 3000
agent.start()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
