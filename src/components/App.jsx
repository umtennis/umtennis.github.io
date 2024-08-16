import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ClubSchedule from "../pages/ClubSchedule";
import About from "../pages/About";
import Signup from "../pages/Signup";
import Programs from "../pages/Programs";
import Socials from "../pages/Socials";
import { NewsProvider } from "./contexts/NewsContext"; // Import the NewsProvider
import { LinkProvider } from "./contexts/LinkContext"; // Import the LinkProvider
import { EventProvider } from './contexts/EventContext';


import "./App.css";

function App(props) {
  // const {state, isLoggedIn, userBookingToken} = useAppData()

  return (
    <NewsProvider>
      <LinkProvider>
      <EventProvider>

        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="programs" element={<Programs />} />
            <Route path="schedule" element={<ClubSchedule />} />
            <Route path="socials" element={<Socials />} />
          </Routes>
        </Router>
 
    </EventProvider>
      </LinkProvider>
    </NewsProvider>
  );
}

export default App;
