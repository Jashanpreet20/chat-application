
const express=require('express');
const fs=require('fs');
const bodyparser=require('body-parser');

const app=express();
app.use(bodyparser.urlencoded({extended : false}));



app.get('/',(req,res) =>{
   fs.readFile('chat.txt',(err,data) =>{
    if(err) {
        console.log(err);
        data="no chata are there";
    }
   
    res.send(`${data}<form action="/message" onSubmit="document.getElementById('username').value=localStorage.getItem('username')"
    method="post">
    <input type="text" id="message" name="message" placeholder="message">
    <input type="hidden" id="username" name="username">
    <button type="submit">send message</button></form>`);
}) 
   
})

app.post('/message',(req,res) =>{
    fs.writeFileSync('chat.txt', `${req.body.username} : ${req.body.message} ` , {flag:"a"} );
    console.log(`${req.body.username} : ${req.body.message}`);
    res.redirect('/');
})


app.get('/login' ,(req,res,next) =>{

    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/user" method="POST"><input id="username" type="text" name"title"><button type="submit">add user</button></form>');

});


app.post('/user',(req,res,next) =>{
    // res.send('home page');
     console.log('succesfully registered');
     res.redirect('/');
 })


app.listen(3000,() =>{
    console.log('server run at 3000');
})