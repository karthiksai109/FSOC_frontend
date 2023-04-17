import React from "react";
import '../App.css';
import x from '../Images/NavBar'
import {useNavigate} from "react-router-dom";

function Home(){
  let Navigate=useNavigate()
  function handlesubmit(){
    Navigate('/register')
  }
    return (
        <div className="App">
      <header className="App-header" style={{backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5AIxk_SWNwnscfeLWRIbmdztpmOAIrUyqQ&usqp=CAU")`,backgroundRepeat: "no-repeat",
      backgroundSize: "cover"}}>
        <p className="nav">
          <x.NavBar/>
        </p>
        <div className='App-logo'>
      <x.Images1/>
      </div>
      <button
       
          className="App-link"
         onClick={handlesubmit}
        >
          Get Set Go
      
        </button>
      </header>
      
      
    </div>
  
    )
}

export default Home