const express = require("express");
const app = express();
var url = require('url');
const xucxac={rows:[{id:"mot",name:"1️⃣",value:1},{id:"hai",name:"2️⃣",value:2},{id:"ba",name:"3️⃣",value:3},{id:"bon",name:"4️⃣",value:4},{id:"nam",name:"5️⃣",value:5},{id:"sau",name:"6️⃣",value:6}]}
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('cookie-session');
const port = process.env.PORT || 3000;
const fileUpload = require('express-fileupload')
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ extended: true })); 
app.use('/public',express.static((__dirname+ '/public')))
app.use(fileUpload({useTempFiles: true}))
const { Client, Intents } = require('discord.js');
const { token } = require('./Config.json');
const village=require('./village.json')
const spawm = require('./spawm.json')
const connection = require('pg').Pool;
const fetch = require('node-fetch');
const { json } = require("express");
const simsimi = require('simsimi')({
	key: 'Hw5nUcqXcCl4t-cD24OVih9Fq.Pt7KsUPD1e4hpa',
  });
const myconect = new connection({
    user: 'pyosvocvftheey',
    host: 'ec2-54-235-98-1.compute-1.amazonaws.com',
    database: 'd29hcfrealuu2b',
    password: '306335b244c09b26eee27679dab44de6b2130cfa90887e74194c0cdfe74ef697',
    port: 5432,
    ssl: {rejectUnauthorized: false},
    });
app.get('/dangky',(req, res) => {
    // res.render(path.join(__dirname,"adduser.html"),{message:""})
    res.sendFile(path.resolve(__dirname,'./dongdangki.html'))
})
app.post('/dangky',(req, res) => {
    
    const roblox_name= req.body.rname;
    const discord_name =req.body.dname;
    const member= req.body.member;
    const blooline= req.body.blooline;
    const element =req.body.element;
    if(discord_name.includes("#")&&roblox_name!=""&&discord_name!=""&&blooline!=""&&element!=""){
        var query2 ="insert into public.User_info values('"+roblox_name+"'"+",'"+discord_name+"'"+",'"+member+"'"+",'"+blooline+"'"+",'"+element+"')";
        myconect.query(query2,(err,result) =>{
            if(err)
            {
                console.log(err)
                res.render(path.join(__dirname,"adduser.html"),{message:"Roblox Name đã bị trùng"})
            }      
            else{
                res.redirect("/")
            }
                
        }) 
    }else{
        res.render(path.join(__dirname,"adduser.html"),{message:"ID discord sai hoặc bạn chưa nhập đủ thông tin"})
    }
   
})

app.get('/',(req,res)=>{
	let date= new Date();
	if((date.getHours()==0||date.getHours()==12)&&date.getMinutes()>=0&&date.getMinutes()<5){
		var query ="delete from public.diemdanhlog";
		myconect.query(query,(err,result) =>{
			if(err)
			{
				console.log(err)
				return;
			}      
			else{
			}
				
		}) 
	}

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


const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});
bot.on('guildMemberAdd', (member) => {
    const channelId = '919600155764858890'; // The Channel ID you just copied
    const welcomeMessage = `Chào <@${member.id}>! Hãy chat tại kênh này!`;
	var role= member.guild.roles.cache.find(role => role.name === "✅Member✅");
	member.roles.add(role)
    member.guild.channels.fetch(channelId).then(channel => {
        channel.send(welcomeMessage)
    });
});
bot.on('ready', () => {
	console.log('Ready!');
});

function formathour(hour,min){
if(min>=60){
	return hour+1
}else{
	return hour
}
}
let s="";
const banggia=`Tyn tailed gen 1 - 40k, gen 2 - 40k;
1 rank - 5k 
20k - 6 rank
max rank - 50k
max lv vĩ thú - 20k 
combo event boss
SHINDAI  - 40K
FORGED  - 40K
DEVA       - 20k
ĐẶC BIỆT: khi các bạn mua combo 3 event boss và 1 thập vĩ nx thì giá chỉ có 120k th ạ:3 
autoroll bloodline - (thương lượng theo rate)
lmited bloodline - đóng 
max ryo - 40K
1m ryo - 1k
săn tailed beast - 10k gen 2, 20k gen 1 `;
const help=`;[command] 
----list command---
random private code cho 1 làng: ;[village], lấy danh sách toàn bộ ps code làng đó: ;[village] list
thời gian của các item drop hiện tại ;spawm now
xem danh sách đã đăng kí ao làng ;aolang
đăng kí account chơi game ;dangky
điểm danh 24h/1 lần ;diemdanh
;[lệnh-game] số tiền đặt cược
lệnh-game gồm có chan, le, tai, xiu
luật chơi tài xỉu ;taixiu luat
hệ thông đổi coin ra voucher giảm giá sẽ đc update sau
`
bot.on('messageCreate', (message) => {
	var chatbox=message.guild.channels.cache.get("957142185168470017")
	if (message.author.bot) 
		return;
    if(message.content.toLowerCase().includes('bun') || message.content.toLowerCase().includes('đẹp trai'||message.content.toLowerCase().includes("dep trai")) ){
        message.channel.send('bunpro đẹp trai nhất nhóm!');
	}else if(message.content.toLowerCase() ===';banggia')
	message.channel.send(banggia);
    else if(message.content.toLowerCase() ===';help')
	message.channel.send(help);
	else if(message.content.toLowerCase() ===";aolang"){
		var query2 ="select * from public.User_info";
		myconect.query(query2,(err,result) =>{
			if(err)
			{
				message.channel.send("error pls contact to admin");
			}      
			else{
				var s=``
				for(var i= 0;i<result.rowCount;i++){
					s=s+result.rows[i].Roblox_ID + " - "+result.rows[i].DisName+"\n";	
				}
				message.channel.send(s);
			}	
		}) 
	}else if(message.content.toLowerCase().startsWith(`;spawm`)&&message.content.toLowerCase().includes("now"))	{
		const date = new Date();
		let ss=""
		var offset = -300; //Timezone offset for EST in minutes.
		var estDate = new Date(date.getTime() + offset*60*1000);
		var hours= estDate.getHours()>=12?estDate.getHours()-12:estDate.getHours()
		for(let i=0;i<spawm.rows.length;i++){
			
			if(spawm.rows[i].time.hour===hours&&spawm.rows[i].time.minute<=estDate.getMinutes()&&estDate.getMinutes()<=spawm.rows[i].time.minute+25){
				var des=spawm.rows[i].time.minute+25
				let hournow= formathour(spawm.rows[i].time.hour,des)
				if(des>=60){
					des=des-60;
				}else{			
				}
				ss=ss+`item :${spawm.rows[i].name},Location = ${spawm.rows[i].location}, Time spawm = ${spawm.rows[i].time.hour+":"+spawm.rows[i].time.minute}, Time to despawm = ${des==0?hournow+":00":hournow+":"+des}, tỷ lệ: ${spawm.rows[i].tyle} \n`;
			}else{
			}
		}
		ss===""?ss="không có item drop":ss
		message.channel.send(ss)
	}else if(message.content.toLowerCase().startsWith(`;spawm`)&&message.content.toLowerCase().includes("now"))	{
		const date = new Date();
		let ss=""
		var offset = -300; //Timezone offset for EST in minutes.
		var estDate = new Date(date.getTime() + offset*60*1000);

		var hours= estDate.getHours()>=12?estDate.getHours()-12:estDate.getHours()
		for(let i=0;i<spawm.rows.length;i++){
			
			if(spawm.rows[i].time.hour===hours&&spawm.rows[i].time.minute<=estDate.getMinutes()&&estDate.getMinutes()<=spawm.rows[i].time.minute+25){
				var des=spawm.rows[i].time.minute+25
				let hournow= formathour(spawm.rows[i].time.hour,des)
				if(des>=60){
					des=des-60;
				}else{
					
				}
				ss=ss+`item :${spawm.rows[i].name},Location = ${spawm.rows[i].location}, Time spawm = ${spawm.rows[i].time.hour+":"+spawm.rows[i].time.minute}, Time to despawm = ${hournow+":"+des}, tỷ lệ: ${spawm.rows[i].tyle} \n`;
			}else{}
		}
		ss===""?ss="không có item drop":ss
	}else if(message.channelId=="957142185168470017"){
			fetch(`https://api-sv2.simsimi.net/v2/?text=${message.content.toLowerCase()}&lc=vn&cf=false`,{mode: 'cors'})
			.then(result=> result.json())
			.then(data=>{
				chatbox.send(`Bun đẹp trai : ${data.success}`)
			})	
			// const response = await simsimi(message.content.toLowerCase())
			// chatbox.send(`Bun đẹp trai : ${response}`)
	}else if(message.content.toLowerCase()===(`;dangky`)){
		var query2 ="insert into public.User (ID,Name,Money) values('"+message.author.id+"'"+",'"+message.author.username+"'"+","+0+")";
		myconect.query(query2,(err,result) =>{
			if(err)
			{
				console.log(err)
				message.channel.send("error pls contact to admin");
			}      
			else{
				message.channel.send("đăng kí thành công");
			}
		}) 
	}else if(message.content.toLowerCase()===(`;diemdanh`)){
		var check=false;
		var query2 ="select * from public.user";
		myconect.query(query2,(err,result) =>{
			if(err)
			{
				console.log(err)
				message.channel.send("error pls contact to admin");
			}      
			else{
				for(let i=0;i<result.rowCount;i++){
					if(result.rows[i].id==message.author.id){
						var date=new Date();
						var query1 ="insert into public.diemdanhlog values('"+message.author.id+"'"+",'"+date +"')";
						myconect.query(query1,(err1,result1) =>{
							if(err1)
							{
								console.log(err1)
								message.channel.send(`Bạn đã điểm danh hôm nay r `);
							}      
							else{
								var query3 ="update public.user set money= money+"+ 100 +"where id='"+message.author.id+"'";
								myconect.query(query3,(err2,result3) =>{
									if(err2)
									{
										console.log(err2)
										message.channel.send("error pls contact to admin");
									}      
									else{
										message.channel.send("Điểm danh thành công và nhận đc 100 coin 🪙");
									}
								}) 	
							}
						}) 
						check=true;
						break;
						}
					}
					if(!check){
						message.channel.send("hãy đăng kí account")
					}
				}
			})
		}else if(message.content.toLowerCase().startsWith(`;coin`)){
			var words =message.content.toLowerCase().split(" ")
			if(words[1] && words[2]&&message.member.roles.cache.some(role =>role.id!="914502815060230204"))
			{
				var sotien = parseInt(words[2])
				var query2 ="update public.user set money= money +"+ sotien +"where id='"+words[1]+"'";
				
				myconect.query(query2,(err,result) =>{
					if(err)
					{
						console.log(err)
						message.channel.send("ko thấy id hoặc số tiền sai");
					}      
					else{
						message.channel.send(`đã thêm ${sotien} coin🪙 thành công`)
					}	
				}) 

			}else{
				
				var query2 ="select * from public.user";
				myconect.query(query2,(err,result) =>{
					if(err)
					{
						console.log(err)
						message.channel.send("error pls contact to admin");
					}      
					else{
						for(let i=0;i<result.rowCount;i++){
							if(result.rows[i].id==message.author.id){
								message.channel.send(`Người chơi: ${result.rows[i].name}, coin: ${result.rows[i].money} 🪙`);
							}
						}
					}	
				}) 
				
			}
			
		}else if(message.content.toLowerCase()===(`;doiitem`)){
			var query2 ="select * from public.voucher";
			let s=""
			myconect.query(query2,(err,result) =>{
				if(err)
				{
					console.log(err)
					message.channel.send("error pls contact to admin");
				}      
				else{
					for(let i=0;i<result.rowCount;i++){
						s=s+`id: ${result.rows[i].voucherid}, ${result.rows[i].name}`
					}
					message.channel.send(s);
				}	
			}) 
		}
		else if(message.content.toLowerCase()==(`;taixiu luat`)){
			message.channel.send(`Với tài xỉu, bạn sử dụng 3 viên xúc xắc. Mỗi viên xúc xắc có 6 mặt và người chơi sẽ đặt cược kết quả sau khi nhà cái lắc xúc xắc. Nếu kết quả trên tổng 3 mặt của xúc xắc là 4 đến 10 thì đó gọi là Xỉu, còn nếu là 11 đến 17 thì đó là Tài`)
		}else if(message.content.toLowerCase().startsWith(`;tai`)||message.content.toLowerCase().startsWith(`;xiu`)||message.content.toLowerCase().startsWith(`;le`)||message.content.toLowerCase().startsWith(`;chan`)){
			const word = message.content.split(' ')
			var sotien=parseInt(word[1])
			if(Number.isInteger(sotien)){
				var query2 ="select * from public.user";
				myconect.query(query2,(err,result) =>{
					if(err)
					{
						console.log(err)
						message.channel.send("error pls contact to admin");
					}      
					else{
						let messages="";
						let randomitem=[]
						for(let i=0;i<result.rowCount;i++){
							if(message.author.id==result.rows[i].id){
								if(result.rows[i].money>=sotien){
									messages=""
									var item = xucxac.rows[Math.floor(Math.random()*xucxac.rows.length)];
									var item1 = xucxac.rows[Math.floor(Math.random()*xucxac.rows.length)];
									var item2 = xucxac.rows[Math.floor(Math.random()*xucxac.rows.length)];
									randomitem.push(item)
									randomitem.push(item1)
									randomitem.push(item2)
									for(let j =0;j<10000;j=j+2000){
										item = xucxac.rows[Math.floor(Math.random()*xucxac.rows.length)];
										item1 = xucxac.rows[Math.floor(Math.random()*xucxac.rows.length)];
										item2 = xucxac.rows[Math.floor(Math.random()*xucxac.rows.length)];
										message.channel.send("đang xúc xắc"+item.name+" "+item1.name+" "+item2.name).then(msg => {
											setTimeout(() => msg.delete(), 1000)
										  }).catch()
									}
									let sum =randomitem[0].value+randomitem[1].value+randomitem[2].value
									if(message.content.toLowerCase().startsWith(`;tai`)||message.content.toLowerCase().startsWith(`;xiu`)){
										message.channel.send("xúc xắc xong: "+randomitem[0].name+" "+randomitem[1].name+" "+randomitem[2].name+" tổng điểm là : "+sum +" ("+(sum>=11?" tài ":" xỉu ")+")")
									}else{
										message.channel.send("xúc xắc xong: "+randomitem[0].name+" "+randomitem[1].name+" "+randomitem[2].name+" tổng điểm là : "+sum +" ("+(sum%2==0?" chẵn ":" lẻ ")+")")
									}
									
										if((message.content.toLowerCase().startsWith(`;tai`) && sum>=11)||(message.content.toLowerCase().startsWith(`;xiu`) && sum <11)||(message.content.toLowerCase().startsWith(`;le`) && sum %2!=0)||(message.content.toLowerCase().startsWith(`;chan`) && sum %2==0)){
											var query3 ="update public.user set money= money+"+ sotien +"where id='"+message.author.id+"'";
											myconect.query(query3,(err2,result3) =>{
												if(err2)
												{
													console.log(err2)
													message.channel.send("error pls contact to admin");
												}      
												else{
													message.channel.send(`bạn đã thắng ${sotien*2} coin 🪙`)
												}
											}) 
											  }else{
												var query3 ="update public.user set money= money -"+ sotien +"where id='"+message.author.id+"'";
												myconect.query(query3,(err2,result3) =>{
													if(err2)
													{
														console.log(err2)
														message.channel.send("error pls contact to admin");
													}      
													else{
														message.channel.send(`bạn đã thua ${sotien} coin 🪙`)
														
													}
												}) 	
												
											  }	  
									break;
								}else{
									messages="bạn không đủ tiền"
								}
								break;
							}else{
								messages="vui lòng đăng kí account"
							}
						}
						if(messages!=""){
							message.channel.send(messages)
						}
					}	
					
				}) 
				// message.channel.send("đã đặt cược "+sotien)
			}else{
				message.channel.send("hãy nhập số tiền")
			}
		}
		else if(message.content.toLowerCase().includes("https://discord.gg")&&message.member.roles.cache.some(role => role.id === '914502815060230204')){
				message.reply("tin nhắn đã bị chặn do quảng cáo").then(msg => {
					setTimeout(() => {message.delete()},1000)
					})
					.catch()	
		}
	
				
			

		for(let i=0;i<village.rows.length;i++){
			if(message.content.toLowerCase().startsWith(`;${village.rows[i].name}`)&&message.content.toLowerCase().includes("list")){
				for(let j=0;j<village.rows[i].code.length;j++){
					s=s+village.rows[i].code[j]+"\n"
				}	
				message.channel.send(s);
			}
			else if(message.content.toLowerCase() ===`;${village.rows[i].name}`){
				var item = village.rows[i].code[Math.floor(Math.random()*village.rows[i].code.length)]
				message.channel.send(item);
			}
	}
});
bot.login(process.env.DISCORD_TOKEN);
app.listen(port, () => {
    console.log(`Application started and Listening on port ${port}`);
});

          
    