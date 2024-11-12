const express = require('express')
const { default: agent } = require("skywalking-backend-js")
const axios = require('axios')
const winston = require('winston');
const app = express()
const port = 3000
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
})
agent.start()

app.get('/', (req, res) => {
    logger.info('Method: Get, Path: "/"')
    res.send('Hello World!')
})

app.get('/golang', async (req, res) => {
    logger.info(`Method: Get, Path: "/golang", Time: ${new Date().toLocaleString}`)
    const { data } = await axios.get('http://golang:8000')
    return res.json(data)
})

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`)
})
