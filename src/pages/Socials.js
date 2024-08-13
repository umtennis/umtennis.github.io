import React, { useEffect, useState } from "react";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import "./Socials.css"


const Social = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Create an array of image paths
  const imageCount = 14;
  const images = [];

  for (let i = 1; i <= imageCount; i++) {
    images.push(require(`../assets/tournament2024/${i}.jpg`));
  }

  const openPopup = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="home-container">
        <div className="content-container">
          <div className="club-schedule-container">

            <div className="socials-container">
              <h2>UMTC First Annual Tournament 2024</h2>
              <div className="socials-gallery">
                {images.map((image, index) => (
                  <div key={index} className="socials-image-wrapper">
                    <img
                      src={image}
                      alt={`Tournament 2024 ${index + 1}`}
                      className="socials-image"
                      onClick={() => openPopup(image)}
                    />
                  </div>
                ))}
              </div>

              {/* Pop-up window for enlarged image */}
              {selectedImage && (
                <div className="popup-overlay">
                  <div className="popup-content">
                    <button className="close-button" onClick={closePopup}>×</button>
                    <img src={selectedImage} alt="Enlarged" className="enlarged-image" onClick={() => closePopup(selectedImage)} />
                  </div>
                </div>
              )}
            </div>


          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Social;
