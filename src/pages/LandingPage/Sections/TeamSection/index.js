import React from "react";
import { Container, Grid, Typography, Box, Paper } from "@mui/material";
import TeamMember from "./TeamMember";

import MemberImage1 from "../../../../assets/images/members/member-1.png";
import MemberImage2 from "../../../../assets/images/members/member-2.png";
import MemberImage3 from "../../../../assets/images/members/member-3.png";
import MemberImage4 from "../../../../assets/images/members/member-4.png";

function TeamSection() {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Paper elevation={24} sx={{ px: 3, pb: 3 }}>
        <Box pt={4} mb={4} sx={{ textAlign: "center" }}>
          <Typography variant="h3">Team</Typography>
        </Box>
        <Grid container>
          {teamItems.map((item) => (
            <TeamMember {...item} />
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default TeamSection;

const teamItems = [
  {
    image: MemberImage1,
    name: "Nguyen Viet Hoang",
    job: "Backend Developer",
    socialLinks: {
      facebook: "",
      github: "",
      linkedin: "",
    },
  },
  {
    image: MemberImage2,
    name: "Nguyen Tien Dung",
    job: "Backend Developer",
    socialLinks: {
      facebook: "",
      github: "",
      linkedin: "",
    },
  },
  {
    image: MemberImage3,
    name: "Ta Dang Huy",
    job: "Frontend Developer",
    socialLinks: {
      facebook: "",
      github: "",
      linkedin: "",
    },
  },
  {
    image: MemberImage4,
    name: "Tran Huu Binh",
    job: "Frontend Developer",
    socialLinks: {
      facebook: "",
      github: "",
      linkedin: "",
    },
  },
];
