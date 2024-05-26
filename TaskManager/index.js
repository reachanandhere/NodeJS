const express = require('express')
const app = express()
require('./src/DB/connection')

const User = require('./models/user')
const Task = require('./models/task')
const port = process.env.PORT || 3002

app.use(express.json())

app.post('/users', (req, res)=>{
    const user = new User(req.body)
    user.save().then(()=>{
        res.status(200).send('user Saved')
    }).catch(err=>{
       res.status(400).send(err)
    })
    
})

app.post('/tasks', (req, res)=>{
    const task = new Task(req.body)
    task.save().then(()=>{
        res.status(200).send(task)
    }).catch((e)=>{
        res.status(400).send()
    })

})

app.listen(port, ()=>{
    console.log("Server is listening!")
})