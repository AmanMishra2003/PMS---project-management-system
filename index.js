const express = require('express');
const app = express();

//required modules
require('dotenv').config()
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const path = require('path')

//connection to database
const DbUrl = process.env.DBURL
mongoose.connect(DbUrl).then(()=>{
    console.log('Database Connected!!')
}).catch((err)=>{
    console.log(err)
})


//required Middelware
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public')))

//router
const UserRouter = require('./router/userRouter')
const ProjectRouter = require('./router/projectRouter')
const TaskRouter = require('./router/taskRouter')

//locals
app.use((req,res,next)=>{
    res.locals.currentPath = req.path

    next()
})

//routers
app.get('/',(req,res)=>{
    res.render('homePage')
})

app.use('/project',ProjectRouter)
app.use('/project/:projectId/tasks',TaskRouter)
app.use('/user',UserRouter)


app.listen(3000,()=>{
    console.log('Connection Listening!!')
})