import express from 'express'
import mongoose from 'mongoose'
import homeRouter from './home/home.routes.js'
import registerRouter from './register/register.routes.js'
import loginRouter from './login/login.routes.js'
import userRouter from './user/user.routes.js' 
import messageRouter from './message/message.routes.js'
export  function initApp(app) {
    app.use(express.json()) 
    app.use(express.static('public'))
    app.use(express.urlencoded({extended:true}))
    app.use(homeRouter)
    app.use(registerRouter)
    app.use(loginRouter)
    app.use(userRouter)
    app.use(messageRouter)
    mongoose.connect('mongodb+srv://mvc:mvc123@cluster0.pobnrmx.mongodb.net/SarahMVC')
    .then(_=>console.log("DB Connect Successfully") )
    .catch(error=>console.log("DB Error",error))
}