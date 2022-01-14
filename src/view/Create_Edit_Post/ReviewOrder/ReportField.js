import { Grid, Typography } from "@mui/material";
import React from "react";
import Thumb from "../common/Thumb";

const RenderData = (props) => {
  const { field, value, categories } = props;
  switch (field.type) {
    case "select":
      return (
        <Typography gutterBottom>{`${
          categories.find((category) => category.value === value).label
        }`}</Typography>
      );
    case "text":
      return `${value}`
        .split("\n")
        .map((line) => <Typography>{line}</Typography>);
    case "image":
      if (!value.length) {
        return <Typography>No image</Typography>;
      }
      return (
        <Grid container spacing={2}>
          {value.map((image, i) => (
            <Grid item>
              <Thumb
                fileName={image.fileName || "no name"}
                src={image.path}
              ></Thumb>
            </Grid>
          ))}
        </Grid>
      );
    default:
      return false;
  }
};

function ReportField(props) {
  const { formValues, formData, categories } = props;
  return Object.values(formData).map((field) => {
    return (
      <Grid
        item
        sx={12}
        sm={field.name === "images" || field.name === "description" ? 12 : 6}
        key={field.name}
      >
        <Typography variant="h6" gutterBottom>
          {field.label}
        </Typography>
        <RenderData
          field={field}
          value={formValues[field.name]}
          categories={categories}
        ></RenderData>
      </Grid>
    );
  });
}

export default ReportField;
