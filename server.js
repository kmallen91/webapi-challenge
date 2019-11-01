const express = require('express')

const server = express()

server.get('/', (req, res) => {
    res.send('Action and Projects API')
})

server.use(express.json())

module.exports = server