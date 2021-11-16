import React from "react";

import Header from "./Header";
import HeroSection from "./Sections/HeroSection";
import FeaturesSection from "./Sections/FeaturesSection";
import TokenSection from "./Sections/TokenSection";
import TeamSection from "./Sections/TeamSection";
import TechnologiesSection from "./Sections/TechnologiesSection";
import Footer from "./Footer";

// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";

function LandingPage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TokenSection />
      <TeamSection />
      <TechnologiesSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
