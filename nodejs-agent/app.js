const express = require('express')
const { default: agent } = require("skywalking-backend-js")
const axios = require('axios')
const winston = require('winston');
const app = express()
const port = 3000

if (process.env.SW_AGENT_COLLECTOR_BACKEND_SERVICES) {
    agent.start()
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
})

app.get('/', (req, res) => {
    logger.info('Method: Get, Path: "/"')
    res.send('Hello World!')
})

app.get('/golang', async (req, res) => {
    logger.info(`Method: Get, Path: "/golang"`)
    const { data } = await axios.get('http://golang:8000')
    return res.json(data)
})

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`)
})
