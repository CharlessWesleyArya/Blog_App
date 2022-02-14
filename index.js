const express=require('express')
const app=express();
const session=require('express-session')
const publicRoutes=require('./routes/public.routes')
const PostRoutes=require('./routes/post.route');
const path=require('path')
const FileStore=require('session-file-store')(session)

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.set('view engine','ejs')

app.use(session({
    secret:'secret@12',
    resave:false,
    saveUninitialized:false,
    store:new FileStore({
        retries:0
    })
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',publicRoutes)
app.use('/posts',PostRoutes)

app.listen(3000,()=>{
    console.log("Server Started at 3000")
})