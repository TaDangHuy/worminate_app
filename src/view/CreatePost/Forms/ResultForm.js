import { Box } from "@mui/system";
import React from "react";
import InputField from "../FormFields/InputField";
import SelectField from "../FormFields/SelectField";

const categories = [
  {
    value: undefined,
    label: "None",
  },
  {
    value: "1",
    label: "Xe",
  },
  {
    value: "2",
    label: "Dien Thoai",
  },
  {
    value: "3",
    label: "May tinh",
  },
];

export default function ResultForm(props) {
  const {
    formField: { title, location, description, category, price },
  } = props;
  return (
    <React.Fragment>
      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name={title.name} label={title.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={location.name} label={location.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={description.name}
            label={description.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={category.name}
            label={category.label}
            data={categories}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <InputField name={price.name} label={price.label} fullWidth />
        </Grid>
      </Grid> */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          columnGap: 4,
          rowGap: 2,
          gridTemplateRows: "auto",
          gridTemplateAreas: `"title location"
                              "description category"
                              "description price"`,
        }}
      >
        <Box sx={{ gridArea: "title" }}>
          <InputField
            id="title"
            name={title.name}
            label={title.label}
            fullWidth
          />
        </Box>
        <Box sx={{ gridArea: "location" }}>
          <InputField
            id="location"
            name={location.name}
            label={location.label}
            fullWidth
          />
        </Box>
        <Box sx={{ gridArea: "description" }}>
          <InputField
            id="description"
            name={description.name}
            label={description.label}
            fullWidth
            multiline
            rows={4}
          />
        </Box>
        <Box sx={{ gridArea: "category" }}>
          <SelectField
            name={category.name}
            label={category.label}
            data={categories}
            fullWidth
          />
        </Box>
        <Box sx={{ gridArea: "price" }}>
          <InputField
            id="price"
            name={price.name}
            label={price.label}
            fullWidth
          />
        </Box>
      </Box>
    </React.Fragment>
  );
}
