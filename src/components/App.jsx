import { HashRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About"
import Signup from "../pages/Signup"
import Programs from "../pages/Programs"

import "./App.css";

// import useAppData from "hooks/useAppData";

function App(props) {
  // const {state, isLoggedIn, userBookingToken} = useAppData()
              
  return ( 
    <>
      <Router>
        <Routes>        
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />        
          <Route path="programs" element={<Programs />} />        
        </Routes>
      </Router>
    </>
  );
}

export default App;
