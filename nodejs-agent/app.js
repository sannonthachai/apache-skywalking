const express = require('express')
const { default: agent } = require("skywalking-backend-js")
const axios = require('axios')
const app = express()
const port = 3000
agent.start()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/golang', async (req, res) => {
    const { data } = await axios.get('https://golang')
    return res.json(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
