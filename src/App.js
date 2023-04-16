import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Register from "../src/register/register"
import './App.css';
import Home from '../src/Home/Home'
import Logout from "./Logout/logout";
function App() {
  return (
    <div>
    <Router>  
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/logout" element={<Logout/>}/>
  </Routes>
    
    </Router> 
    </div>
  );
}

export default App;