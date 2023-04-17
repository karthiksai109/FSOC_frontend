import React from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import '../App.css';
import x from '../Images/NavBar';



function Register(){
  const Navigate=useNavigate()

  const [user,setUser]=useState({
      name:'',
      email:'',
      url:'',
      range:''
  })
  let name,value
  const handleInputs=(e)=>{
    console.log(e)
      name=e.target.name
      value=e.target.value
      setUser({...user,[name]:value})
  }

const postData= async (e)=>{
  e.preventDefault();
  const {name,email,url,range}=user
   
const res=await fetch('/register',{
  method:'POST',
  headers:{
      'Content-Type':"application/json",
           
             },
  body:JSON.stringify({
      name,email,url,range
  })
  
})

var data=await res.json();

let Imparr=['name','email','url','range']

if(data.status===false && data.message===`please enter valid name`){
    window.alert(`please enter valid name`)
    Navigate('/register')
}
else if(data.status===false && data.message===`please enter valid email`){
    window.alert(`please enter valid email`)
  
    Navigate('/register')
}
else if(data.status===false && data.message===`please enter your produt url`){
    window.alert(`please provide us your product link`)
    Navigate('/register')
}else if(data.status===false && data.message===`please enter valid url`){
  window.alert(`please provide us valid product link`)
  Navigate('/register')
}

else if(data.status===false && data.message===`email already registered`){
    window.alert(`you have already registered you will be notified ones your product reaches your specified range`)
    Navigate('/')
}
else if(data.status===false && data.message===`please enter a valid natural number as your range` ){
    window.alert(`please enter a valid natural in range colum`)
    Navigate('/register')
}
else if(data.status===false && data.message===`please enter valid attributes is required`){
    window.alert(`please fill all required feilds correctly`)
    Navigate('/register')
}
else if(data.status===false){
  for(let i=0;i<Imparr.length;i++){
    if(data.status===false && data.message===`please enter your ${Imparr[i]}`){
      window.alert(`please enter your ${Imparr[i]}`)
      Navigate('/register')
    }
    }
}
else{
  window.alert(`response saved successfully you will be notified via email when your product reaches your spectified range Thank you!`)
  console.log(data)
 Navigate('/')
 await fetch('http://localhost:4000/data')
}
    }
    return(
        <div className="App" style={{backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5AIxk_SWNwnscfeLWRIbmdztpmOAIrUyqQ&usqp=CAU")`,backgroundRepeat: "no-repeat",
        backgroundSize: "cover"}}>
      <header className="App-header" >
        <p className="nav">
          <x.NavBar/>
        </p>
        <div className='App-register' style={{backgroundColor:"white"}}>
        <form method="POST" className="register-Form" id="register-Form">

        <div className="name-feild">
        <input type="text" name="name" id="name" value={user.name} onChange={handleInputs} placeholder="enter your name"/>
        </div>

        <div className="email-feild">
        <input type="email" name="email" id="email" value={user.email} onChange={handleInputs} placeholder="enter your email"/>
        </div>
        <div className="name-feild">
        <input type="text" name="url" id="Link" value={user.url} onChange={handleInputs} autoComplete='off' placeholder="enter your url"/>
        </div>
        
        <div className="range-feild">
        <input type="text" name="range" id="num" value={user.range} onChange={handleInputs} autoComplete='off' placeholder="enter your Range"/>
        </div>
        
        </form>
      </div>
      <button 
  
          className="App-link"
          target="_blank"

          rel="noopener noreferrer"
          onClick={postData}>

        submit
        </button>
    
      </header>
      
      
    </div>
  
    )
    }

  
  
export default Register