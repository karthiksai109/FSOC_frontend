const express=require('express')
const userModel=require('../Models/registeratin')
const router=express.Router()
const nodemailer = require("nodemailer");
var cron = require('node-cron');

const axios=require('axios')
const regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
const validator = require("validator");
function nameValidate(text) {
    let reg = /^[A-Za-z ]+$/; 
    return reg.test(text);
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const {JSDOM}=require('jsdom');
const { findByIdAndUpdate, updateOne } = require('../Models/registeratin');
router.post('/register',async function(req,res){
    try{
    let data=req.body
    if(!data){
        return res.status(400).send({status:false,message:"please enter all feilds..."})
    }
   let arr=['name','email','url','range']
   let keys=Object.keys(data)
   for(let i=0;i<keys.length;i++){
   if(!arr.includes(keys[i])){
        return res.status(400).send({status:false,message:`please enter valid attributes is required`})
    }
   }
   let {name,email,url,range}=data
   if(!name){
    return res.status(400).send({status:false,message:`please enter your name`})
   }
   if(name &&!nameValidate(name)){
    return res.status(400).send({status:false,message:`please enter valid name`})
   }

   if(!email){
    return res.status(400).send({status:false,message:`please enter your email`})
   }
   if(email && !validateEmail(email)){
    return res.status(400).send({status:false,message:`please enter valid email`})
   }

    if(!url){
        return res.status(400).send({status:false,message:`please enter your url`})
       }
       if((url) && !(regex.test(url))){
        return res.status(400).send({status:false,message:`please enter valid url`})
       }
       let isEmail=await userModel.findOne({email:email , url:url})
       if(isEmail){
       return res.status(400).send({status:false,message:`email already registered`})
       }
    if(!range){
        return res.status(400).send({status:false,message:`please enter your range`})
    }
    if(range && ! /^[1-9]\d*$/.test(range)){
        return res.status(400).send({status:false,message:`please enter a valid natural number as your range`})
    }
    let userData=await userModel.create(data)
return res.status(200).send({status:"success",message:"thankYou for regestering you will be notified via mail when the product price reaches lessthan or equal to your specified range "})
}
catch(err){
    return res.status(400).send({status:false,message:err.message})
}
})


router.get('/data',async function(req,res){
try{
        let a=await userModel.find({isDeleted:false}).select({url:1,_id:0,email:1,name:1,range:1})
        
       let arr=[]
       let resName=[]
       let resEmail=[]
       let resRange=[]
       a.forEach((x,i,z)=>{
        arr.push(x["url"])
        resEmail.push(x["email"])
        resName.push(x['name'])
        resRange.push(x['range'])

       })
      

const getProductUrl=(url)=>url
async function getPrices(url){
   const productUrl=getProductUrl(url)
const {data:html}=await axios.get(productUrl)

const dom=new JSDOM(html)
const title=dom.window.document.querySelector('#title').textContent.trim()
const pinnedPrice=dom.window.document.querySelector('.a-price .a-offscreen').textContent
const link=url


let pinnedPrices=pinnedPrice.slice(1)
let pinned=pinnedPrices.split('')
let price=pinned.splice(pinned.length-3,3)
let Finalprice=pinned.join('')
let finalprice=''
for(let i=0;i<Finalprice.length;i++){
    if(!isNaN(Finalprice[i])){
        finalprice+=Finalprice[i]
    }
}
console.log(finalprice)
const pinnedItem={
   title:title,
price:pinnedPrice,
link:link,
finalprice:finalprice

}
return (pinnedItem)
 }
 let ab=[]
for(let i=0;i<arr.length;i++){
    
ab.push(await getPrices(arr[i]))
}




const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
  user: 'p39744857@gmail.com',
  pass: 'lagjrqdjlztikdmh',
 },
});

const sendEmail = (name,email,title,productPrice,link,range) => {
 const mailOptions = {
  from: 'p39744857@gmail.com',
  to: email,
  subject: 'Email verification',
  html:
`<p>here is your product ${name} </p>`+
`<p>Now you can buy it as the product was less tha or equal to amount you specified in  range :${range}</p>`+
`<p>title:${title} </p>`+
`<p>price:${productPrice} </p>`+
`<p>link:"${link}</p>`


};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log('Error in sending email  ' + error);
    return true;
  } else {
   console.log('Email sent: ' + info.response);
   return false;
  }
 });
};



for(let i=0;i<ab.length;i++){
    cron.schedule('* * * * *', () => {
        ab[i]['name']=resName[i]
        ab[i]['email']=resEmail[i]
        ab[i]['range']=resRange[i]
        if(Number(ab[i]['finalprice'])<=Number(resRange[i])){
        sendEmail(resName[i],resEmail[i],ab[i]['title'],ab[i]['price'],ab[i]['link'],ab[i]['range'])
        }else{
            console.log('sorry your product price havent reached your specified range yet')
            
        }
   })
}

res.send({data:ab})
    }
catch(err){
    return res.status(400).send({status:false,message:err.message})
 }
    })


module.exports=router