const express=require('express')
const app=express();
const session=require('express-session')
const PublicRoutes=require('./routes/public.routes')

app.set('view engine','ejs')

app.use(session({
    secret:'secret@12',
    resave:false,
    saveUninitialized:false
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',PublicRoutes)

app.listen(3000,()=>{
    console.log("Server Started at 3000")
})