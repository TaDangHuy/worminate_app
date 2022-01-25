import React from "react";
import { Facebook, GitHub, LinkedIn } from "@mui/icons-material";
import { Grid, Link, IconButton } from "@mui/material";

function SocialLinks({ direction, socialLinks }) {
  const socialItems = [
    { icon: Facebook, url: socialLinks.facebook },
    { icon: GitHub, url: socialLinks.github },
    { icon: LinkedIn, url: socialLinks.linkedin },
  ];

  return (
    <Grid container direction={direction || "row"} sx={{ mt: -3, ml: 3 }}>
      {socialItems.map((item, i) => (
        <Grid item sm={4} key={i}>
          <Link href={item.url}>
            <IconButton
              sx={{
                ":hover": {
                  color: "primary.main",
                },
              }}
            >
              <item.icon />
            </IconButton>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default SocialLinks;
