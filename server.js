
const express = require("express");
const app = express();
var url = require('url');
const path = require('path');
var product= require('./product.js')
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
var cloudinary = require('cloudinary').v2;
var session;
const oneDay = 1000 * 60 * 60 * 24;
cloudinary.config({ 
    cloud_name: 'hmdahuj7l', 
    api_key: '779499346745353', 
    api_secret: 'AIHCfCxi9ZX23i93z41om9PlwYc' 
});

app.set('trust proxy', 1);
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
    res.sendFile(path.resolve(__dirname,'./adduser.html'))
})
app.post('/dangky',(req, res) => {
    
    const roblox_name= req.body.rname;
    const discord_name =req.body.dname;
    const member= req.body.member;
    const blooline= req.body.blooline;
    const element =req.body.element;
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

app.get('/addcategory',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    const cateID = data.cateid;
    const catename= data.catename;
    const decription=data.catedecription;
    if(cateID)
    {
        var query1 ="insert into public.category values('"+cateID+"'"+",'"+catename+"'"+",'"+decription+"')";
        myconect.query(query1,(err,result) =>{
            if(err)
            {
                console.log(err)
                return;
            }      
        })
        res.redirect("/home/?id=2")
    }
    else{
        res.sendFile(path.resolve(__dirname,'./addcategory.html'))
    }
})

app.get('/home',(req,res)=>{
    var q="";
    session=req.session;
    q = url.parse(req.url, true);
    var data=q.query;
    const id = data.id;
    if(req.session.usertype=="1"){
    if(id=='1'){
        query="SELECT * FROM public.product";
        myconect.query(query,(err,result) =>{
            if(err)
            {
                console.log(err);
            }else {
                res.render(path.join(__dirname,'./home.html'),{result: result,idp: id,username:session.userid})
            }
        })
    }
    else if(id=='2')
    {
        query="SELECT * FROM public.category";
        myconect.query(query,(err,result1) =>{
            if(err)
            {
                console.log(err);
            }else{
                res.render(path.join(__dirname,'./home.html'),{result1: result1,idp:id,username:session.userid})
            }
        })  
    }
    else if(id=='3')
    {
        query="SELECT * FROM public.invoice";
        myconect.query(query,(err,result3) =>{
            if(err)
            {
                console.log(err);
            }
            else{
                res.render(path.join(__dirname,'./home.html'),{result3: result3,idp:id,username:session.userid})
            }
        })  
    }
    else{
        res.render(path.resolve(__dirname,'./home.html'),{idp:0,username:session.userid})
    }  
}
else {
    res.redirect("/homepage")
}
})

app.get('/viewcategory',(req,res)=>{
    query="SELECT * FROM public.category";
    myconect.query(query,(err,result) =>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render(path.join(__dirname,'./viewcategory.html'),{result: result})
        }
    })
})
var productid = 2;
app.get('/checkout',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    if(data.productid){
        productid=data.productid
        res.render(path.join(__dirname,'./cart.html'))
        console.log(productid)
    }else{
        
    }
   
})

app.get('/productdelete',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    query1=`delete from public.product where id = '${data.productid}'`;
    myconect.query(query1,(err,result1) =>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.redirect('/home/?id=1')
        }       
    })
})

app.get('/categorydelete',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    query1=`delete from public.category where cateid = '${data.cateid}'`;
    myconect.query(query1,(err,result1) =>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.redirect('/home/?id=2')
        }
            
    })
})

app.get('/invoicedelete',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    query1=`delete from public.invoice where invoiceid = '${data.invoiceid}'`;
    myconect.query(query1,(err,result1) =>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.redirect('/home/?id=3')
        }
    })
})

app.get('/checkoutdelete',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    query1=`delete from public.checkout where proid = '${data.productid}'`;
    myconect.query(query1,(err,result1) =>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.redirect('/checkout')
        }  
    })
})

app.get('/homepage',(req,res)=>{
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    session=req.session;
    if(data.productid)
    {
        query=`select * from public.category`;
        query1=`select * from public.product where category= '${data.productid}'`;
        myconect.query(query,(err,result) =>{
            if(err)
            {
                console.log(err);
            }
            else{
                myconect.query(query1,(err1,result1) =>{
                    if(err1)
                    {
                        console.log(err1);
                    }
                    else{
                        res.render(path.join(__dirname,'/homepage.html'),{result1: result1,result: result,username:req.session.userid})
                    }
                })
            }
        })
    }else{
        query=`select * from public.category`;
        myconect.query(query,(err,result) =>{
            if(err)
            {
                console.log(err);
            }
            else{
                query1=`select * from public.product`;
                myconect.query(query1,(err1,result1) =>{
                    if(err1)
                    {
                        console.log(err1);
                    }
                    else{
                        res.render(path.join(__dirname,'/homepage.html'),{result1: result1,result: result,username:req.session.userid})
                    }
                })
            }
        })
    }
    
})

app.get("/login",(req,res)=>{
    session=req.session;
    if(session.userid){
        if(session.usertype=="1")
        {
            res.redirect("/home")
        }else if(session.usertype=="2")
        {
            res.redirect("/homepage")
        }
    }else{
        res.render(path.join(__dirname,'/login.html'),{status:""})
    }
})

app.post("/user",(req,res)=>{
    query ="SELECT * FROM public.account";
    myconect.query(query,(err,result) =>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            for(var i=0;i<result.rowCount;i++)
            {     
                if(req.body.username ==  result.rows[i].username && req.body.password == result.rows[i].password&&result.rows[i].type =="1"){
                    session=req.session;
                    session.userid=req.body.username;
                    session.usertype="1";
                    session.cart={items:[],total:0,quantity:[]}
                    break;
                }else if(req.body.username ==  result.rows[i].username && req.body.password == result.rows[i].password&&result.rows[i].type =="2"){
                    session=req.session;
                    session.userid=req.body.username;
                    session.usertype="2";
                    session.cart={items:[],total:0,quantity:[]}
                    break;
                }
            }  
            if(session.usertype)
            {
                if(session.usertype=="1"){
                    res.render(path.join(__dirname,'/home.html'),{username:session.userid,idp:0})
                }
                else if(session.usertype=="2")
                {
                    res.redirect("/homepage")
                }
                else{
                    res.render(path.join(__dirname,'/login.html'),{status:"wrong username or password"})
                }
            }else{
            res.render(path.join(__dirname,'/login.html'),{status:"wrong username or password"})
            }
        }
    })
})

app.get("/logout",(req,res) => {
    req.session= null;
    res.redirect('/homepage');
});
var total=0;
var displaycard={items:[],total:2}


app.get("/cart",(req,res) => {
    var q="";
    q = url.parse(req.url, true);
    var data=q.query;
    
    if(session.userid)
    {
       session.cart.items.push(data.productid) 
       session.cart.quantity.push(data.quantity);
       res.render(path.join(__dirname,'/cart.html'),{cart:session.cart})
    }
    else{
        
        res.redirect("/login")
    }
})

app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

          
    