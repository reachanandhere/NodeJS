const express = require('express')

const app = express()

app.get('', ()=>{
    res.send("Hello from express!")
})

app.listen(3001, ()=>{
    console.log("Server is listening on port 3001.")
})