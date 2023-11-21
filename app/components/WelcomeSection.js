import React from "react";
import "../styles/welcomeSection.scss";

function WelcomeSection({ selectedHotel }) {
  // const isHotelSelected = selectedHotel;
  if (selectedHotel.name) {
    return (
      <section className="welcome-section-wrapper">
        <div className="p-20">
          <h2 className="col-span-full pr-8 max-lg:mb-6 lg:col-span-4 lg:pr-20">
            Welcome to Comwell {selectedHotel.name}
          </h2>
          <p className="wysiwyg body-large md:col-span-6">
            {selectedHotel.welcome}
          </p>
        </div>
      </section>
    );
  }
  return;
  <div></div>;
}

export default WelcomeSection;
