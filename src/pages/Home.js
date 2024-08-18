import React, { useContext} from 'react';
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import Announcements from "../components/news/Announcements.jsx";
import LinkManagement from "../components/linkManagement/LinkManagement.jsx";
import { UserContext } from '../components/contexts/UserContext';
import './Home.css'; 

const Home = (props) => {
  // const { state } = useAppData();
  // const isAdmin = false;
  const { user } = useContext(UserContext);

  return (
    <div className="app-container">
      <Header 
        // isLoggedIn={state.isLoggedIn}
        // user={state.user}
      />
      <div className="home-container">
        <div className="content-container">
          <div className="news-container">
            <Announcements isAdmin={user?.isAdmin === 1} />
          </div>
          <div className="link-management-container">
            <LinkManagement isAdmin={user?.isAdmin === 1} />
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
    
  );
};

export default Home;
