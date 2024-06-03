const express= require('express')
const path = require('path')
const app = express()

const http = require('http')
const socketio =  require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

let count=0

io.on('connection',(socket)=>{
    
    socket.emit('message','Welcome!')

    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage',(message)=>{
        io.emit('message', message)
    })

    socket.on('location',(obj)=>{
        socket.broadcast.emit('message', `https://google.com/maps?q=${obj.latitute},${obj.longitude}`)
    })

    socket.on('disconnect',()=>{
        io.emit('message','A user has left!')
    })
})





const publicDir = path.join(__dirname, './public')

const PORT = process.env.PORT || 6008

app.use(express.static(publicDir))

server.listen(PORT, ()=>{
    console.log('Server is listening on 6008!')
})