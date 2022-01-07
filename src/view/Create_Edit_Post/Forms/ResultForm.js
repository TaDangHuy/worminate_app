import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InputField from "../FormFields/InputField";
import SelectField from "../FormFields/SelectField";

export default function ResultForm(props) {
  const {
    formField: { title, location, description, category, price },
  } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/posts/new")
      .then((res) => {
        let tmp = res.data.category.map((category) => ({
          value: category["_id"],
          label: category.name,
        }));
        setCategories([...tmp]);
      })
      .catch((err) => console.error(err));
  }, []);
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
