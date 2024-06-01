const express=require('express')
const bodyParser = require('body-parser')
const dotenv=require('dotenv')
const contactRoutes=require('./Routes/contactRoutes')
const spamRoutes=require('./Routes/spamRoutes')
const searchRoutes=require('./Routes/searchRoutes')
const authRoutes=require('./Routes/authRoutes')

dotenv.config();

const app=express()

app.use(bodyParser.json())


//app.use ('/api/auth',authRoutes)
app.use('/api/contacts',contactRoutes)
app.use('/api/spam',spamRoutes)
app.use('/api/search',searchRoutes)

// app.get('/',(req,res)=>{

//     return res.send
// })

module.exports=app;