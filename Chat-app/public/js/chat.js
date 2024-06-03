const socket = io();
socket.on('message',(message)=>{
    console.log(message)
})

document.getElementById('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = document.getElementById('form-input').value
    socket.emit('sendMessage', message)
})


