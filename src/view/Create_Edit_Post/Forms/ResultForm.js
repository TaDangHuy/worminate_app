import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import InputField from "../FormFields/InputField";
import SelectField from "../FormFields/SelectField";

export default function ResultForm(props) {
  const {
    formField: { title, location, description, category, price },
    categories,
  } = props;

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          columnGap: 4,
          rowGap: 2,
          gridTemplateRows: "auto",
          gridTemplateAreas: `"title location"
                              "price category"
                              "description description"`,
        }}
      >
        <Box sx={{ gridArea: "title" }}>
          <Typography sx={{ mb: 1 }}>Title</Typography>
          <InputField
            id="title"
            name={title.name}
            // label={title.label}
            fullWidth
          />
        </Box>
        <Box sx={{ gridArea: "location" }}>
          <Typography sx={{ mb: 1 }}>Location</Typography>
          <InputField
            id="location"
            name={location.name}
            // label={location.label}
            fullWidth
          />
        </Box>
        <Box sx={{ gridArea: "description" }}>
          <Typography sx={{ mb: 1 }}>Description</Typography>
          <InputField
            id="description"
            name={description.name}
            // label={description.label}
            fullWidth
            multiline
            rows={12}
          />
        </Box>
        <Box sx={{ gridArea: "category" }}>
          <Typography sx={{ mb: 1 }}>Category</Typography>
          <SelectField
            name={category.name}
            // label={category.label}
            data={categories}
            fullWidth
          />
        </Box>
        <Box sx={{ gridArea: "price" }}>
          <Typography sx={{ mb: 1 }}>Price</Typography>
          <InputField
            id="price"
            name={price.name}
            // label={price.label}
            fullWidth
          />
        </Box>
      </Box>
    </React.Fragment>
  );
}
