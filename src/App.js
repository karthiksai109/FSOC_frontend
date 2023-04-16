import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Register from "../src/register/register"
import './App.css';
import Home from '../src/Home/Home'

function App() {
  return (
    <div>
    <Router>  
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
   
  </Routes>
    
    </Router> 
    </div>
  );
}

export default App;