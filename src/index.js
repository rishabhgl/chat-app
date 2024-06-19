const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
io = socketio(server)

const PORT = 3000
const public = path.join(__dirname, '../public')

app.use(express.static(public))

app.get('/', (req, res) => {})

io.on('connection', (socket) => {

    socket.emit('message', 'Welcome to the chat!')
    socket.broadcast.emit('message', "A user has entered the chat!")

    socket.on('sendMessage', (message, callback) => {

        const filter = new Filter()
        if (filter.isProfane(message)) return callback('Profanity is not allowed!')
        io.emit("message", message)
        callback()
    })

    socket.on('sendLocation', (pos, callback) => {
        io.emit('message', "https://www.google.com/maps?q=" + pos.lat + "," + pos.long)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat!')
    })

})

server.listen(PORT, () => {
    console.log("Running application~")
})