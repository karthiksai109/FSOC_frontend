import React from "react";
import '../App.css';
import x from '../Images/NavBar'


function Home(){
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
      <button>
        <a
          className="App-link"
          href="http://localhost:3000/register"
          target="_blank"
          rel="noopener noreferrer"
          
        >
          Get Set Go
        </a>
        </button>
      </header>
      
      
    </div>
  
    )
}

export default Home