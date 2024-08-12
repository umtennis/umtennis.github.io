import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup"

import "./App.css";

// import useAppData from "hooks/useAppData";

function App(props) {
  // const {state, isLoggedIn, userBookingToken} = useAppData()

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />}> */}
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
