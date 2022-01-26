import React from "react";
import { Container, Grid, Typography, Box, Paper } from "@mui/material";
import TeamMember from "./TeamMember";

function TeamSection() {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ px: 3, pb: 3, borderRadius: 3 }}>
        <Box pt={4} mb={4} sx={{ textAlign: "center" }}>
          <Typography variant="h3">Team</Typography>
        </Box>
        <Grid container>
          {teamItems.map((item, i) => (
            <TeamMember {...item} key={i} />
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default TeamSection;

const teamItems = [
  {
    image: require("../../../../assets/images/members/NVH.jpg").default,
    name: "Nguyen Viet Hoang",
    job: "Backend Developer",
    socialLinks: {
      facebook: "",
      github: "",
      linkedin: "",
    },
  },
  {
    image: require("../../../../assets/images/members/NTD.png").default,
    name: "Nguyen Tien Dung",
    job: "Backend Developer",
    socialLinks: {
      facebook: "",
      github: "",
      linkedin: "",
    },
  },
  {
    image: require("../../../../assets/images/members/TDH.png").default,
    name: "Ta Dang Huy",
    job: "Frontend Developer",
    socialLinks: {
      facebook: "",
      github: "",
      linkedin: "",
    },
  },
  {
    image: require("../../../../assets/images/members/THB.png").default,
    name: "Tran Huu Binh",
    job: "Frontend Developer",
    socialLinks: {
      facebook: "",
      github: "",
      linkedin: "",
    },
  },
];
