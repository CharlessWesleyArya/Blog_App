const express=require('express')
const app=express();

app.set('view engine','ejs')


app.get('/',(req,res)=>{
    res.render('pages/home')
})

app.get('/about',(req,res)=>{
    res.render('pages/about')
})













app.listen(3000,()=>{
    console.log("Server Started at 3000")
})