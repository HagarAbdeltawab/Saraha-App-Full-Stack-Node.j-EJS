import express from 'express' 
import { initApp } from './src/index.routes.js'
import session from 'express-session'
import mongoSession from 'connect-mongodb-session';
import flash from 'connect-flash'
const app = express()
const port =process.env.PORT || 3000 
var MongoDBStore = mongoSession(session)

var store = new MongoDBStore({
    uri: 'mongodb+srv://mvc:mvc123@cluster0.pobnrmx.mongodb.net/SarahMVC',
    collection: 'mySessions'
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,  
    store
}))

app.use(flash())

initApp(app)

app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{ 
        res.redirect('/login')
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))