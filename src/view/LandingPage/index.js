import React from "react";

import Header from "./Header";
import HeroSection from "./Sections/HeroSection/";
import FeaturesSection from "./Sections/FeaturesSection";
import TokenSection from "./Sections/TokenSection";
import TeamSection from "./Sections/TeamSection";
import TechnologiesSection from "./Sections/TechnologiesSection";
import Footer from "../../components/Footer";
import { Box } from "@mui/material";

function LandingPage() {
  return (
    <Box sx={{ backgroundColor: "#f5f8fb" }}>
      <div>
        <Header />
        <div id="hero"></div>
        <HeroSection />
        <div id="features"></div>
        <FeaturesSection />
        <div id="token"></div>
        <TokenSection />
        <div id="team"></div>
        <TeamSection />
        <div id="technologies"></div>
        <TechnologiesSection />
        <Footer />
      </div>
    </Box>
  );
}

export default LandingPage;
