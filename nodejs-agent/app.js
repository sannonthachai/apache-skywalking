const express = require('express')
const { default: agent } = require("skywalking-backend-js")
const axios = require('axios')
const app = express()
const port = 3000
agent.start()

app.get('/', (req, res) => {
    console.log('Method: Get, Path: "/"')
    res.send('Hello World!')
})

app.get('/golang', async (req, res) => {
    console.log(`Method: Get, Path: "/golang", Time: ${new Date().toLocaleString}`)
    const { data } = await axios.get('http://golang:8000')
    return res.json(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
