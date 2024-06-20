const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateLocationMessage, generateMessage} = require('./utils/message')

const app = express()
const server = http.createServer(app)
io = socketio(server)

const PORT = 3000
const public = path.join(__dirname, '../public')

app.use(express.static(public))

app.get('/', (req, res) => {})

io.on('connection', (socket) => {

    socket.on('join', (username, room) => {
        socket.join(room)
        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has entered the chat!`))
    })
    
    socket.on('sendMessage', (message, callback) => {

        const filter = new Filter()
        if (filter.isProfane(message)) return callback('Profanity is not allowed!')
        io.to(room).emit("message", generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (pos, callback) => {
        io.to(room).emit('locationMessage', generateLocationMessage(pos))
        callback()
    })

    socket.on('disconnect', () => {
        io.to(room).emit('message', generateMessage('A user has left the chat!'))
    })

})

server.listen(PORT, () => {
    console.log("Running application~")
})