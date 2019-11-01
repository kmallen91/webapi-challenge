const express = require('express')

const projectRouter = require('./projectRouter')

const server = express()

server.get('/', (req, res) => {
    res.send('Action and Projects API')
})

server.use(express.json())
server.use(`api/projects`, projectRouter)


module.exports = server