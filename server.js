process.on('uncaughtException',(err)=>{
    console.log('error',err);
})

import express from 'express'
import { dbConnection } from './databases/dbConnection.js'
import homeRouter from './src/home/home.routes.js';
import registerRouter from './src/register/register.routes.js';
import loginRouter from './src/login/login.routes.js';
import messageRouter from './src/messages/message.routes.js';
import userRouter from './src/user/user.routes.js';
import session from 'express-session';
import  MongoSession  from 'connect-mongodb-session';
import flash from "connect-flash"

const MongoDBStore = MongoSession(session)

var store = new MongoDBStore({
    uri: 'mongodb+srv://sara7aUser:8mluhqPuicRryJAe@cluster0.55oeadx.mongodb.net/sara7aApp',
    collection: 'mySessions'
  });
const app = express()
const port = process.env.PORT || 3000

app.use(session({
    secret: 'Magdy',
    resave: false,
    saveUninitialized: false,
    store
  }))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(flash())
app.use(homeRouter)
app.use(registerRouter)
app.use(loginRouter)
app.use(messageRouter)
app.use(userRouter)


app.get('/logout' ,(req,res) =>{
    req.session.destroy(function(err) {
        res.redirect('/login')

      })
})


app.use('*', (req, res, next) => {
    res.json({message: "can not get this endPoint"})
})

dbConnection()



process.on('unhandledRejection', (err) => {
    console.log('error',err);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//sara7aUser
//8mluhqPuicRryJAe