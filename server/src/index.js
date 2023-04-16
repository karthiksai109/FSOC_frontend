const express=require('express')
const mongoose=require('mongoose')
const app=express()
const cors=require('cors')
const route=require('./routes/route')

app.use(express.json())

mongoose.set('strictQuery',true)
mongoose.connect('mongodb+srv://group21Database:f8HsIED1oiOyc6yi@karthikcluster.b2ikjot.mongodb.net/Register',)
.then(()=>console.log('mongoose connected'))
.catch((err)=>console.log(err))
app.use('/',route)
app.listen(4000,function(){
    console.log('mongodb running on port 4000')
})