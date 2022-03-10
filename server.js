
const express = require("express");
const app = express();
var url = require('url');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('cookie-session');
const port = process.env.PORT || 3000;
var invoiceid=0;
const fileUpload = require('express-fileupload')
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ extended: true })); 
app.use('/public/images',express.static((__dirname+ '/public/images')))
app.use(fileUpload({useTempFiles: true}))

const connection = require('pg').Pool;
const myconect = new connection({
    user: 'pyosvocvftheey',
    host: 'ec2-54-235-98-1.compute-1.amazonaws.com',
    database: 'd29hcfrealuu2b',
    password: '306335b244c09b26eee27679dab44de6b2130cfa90887e74194c0cdfe74ef697',
    port: 5432,
    ssl: {rejectUnauthorized: false},
    });
app.get('/dangky',(req, res) => {
    res.render(path.join(__dirname,"adduser.html"),{message:""})
})
app.post('/dangky',(req, res) => {
    
    const roblox_name= req.body.rname;
    const discord_name =req.body.dname;
    const member= req.body.member;
    const blooline= req.body.blooline;
    const element =req.body.element;
    if(discord_name.includes("#")){
        var query2 ="insert into public.User_info values('"+roblox_name+"'"+",'"+discord_name+"'"+",'"+member+"'"+",'"+blooline+"'"+",'"+element+"')";
        myconect.query(query2,(err,result) =>{
            if(err)
            {
                console.log(err)
                return;
            }      
            else{
                res.redirect("/")
            }
                
        }) 
    }else{
        res.render(path.join(__dirname,"adduser.html"),{message:"ID discord sai"})
    }
   
})

app.get('/',(req,res)=>{
    var query2 ="select * from public.User_info";
    myconect.query(query2,(err,result) =>{
        if(err)
        {
            console.log(err)
            return;
        }      
        else{
            res.render(path.join(__dirname,'./home.html'),{result: result})
        }
            
    }) 
       
})

app.get('/luat',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./luat.html'))
       
})
app.get('/thongtin',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./thongtin.html'))
       
})
app.get('/bangdau',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./bangdau.html'))
       
})
app.get('/giaithuong',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./giaithuong.html'))
       
})

app.get('/home',(req,res)=>{
    var query2 ="select * from public.User_info";
    myconect.query(query2,(err,result) =>{
        if(err)
        {
            console.log(err)
            return;
        }      
        else{
            res.render(path.join(__dirname,'./home.html'),{result: result})
        }
            
    }) 
})


app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

          
    