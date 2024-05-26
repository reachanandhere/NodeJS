const mongoose= require('mongoose')
mongoose.connect("mongodb+srv://anandverma552:rSaQnadyqe4ad8Q6@taskmanagercluster.sknxlk6.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=TaskmanagerCluster").then(()=>{
    console.log("Database connected")
}).catch(err=>{
    console.log("Connected to db!")
})
