import { Grid, Typography } from "@mui/material";
import React from "react";
import Thumb from "../common/Thumb";

const RenderData = (props) => {
  const { field, value } = props;
  switch (field.type) {
    case "select":
      return <Typography gutterBottom>{`${value}`}</Typography>;
    case "text":
      return <Typography gutterBottom>{`${value}`}</Typography>;
    case "image":
      // return <Thumb file={value.file} src={value.src} varian={"small"}></Thumb>
      if (!value.file.length) {
        return <Typography>No image</Typography>;
      }
      return value.file.map((f, i) => (
        <Grid item>
          {f && value.src[i] && <Thumb file={f} src={value.src[i]}></Thumb>}
        </Grid>
      ));
    default:
      return false;
  }
};

function ReportField(props) {
  const { formValues, formData } = props;
  return Object.values(formData).map((field) => {
    return (
      <Grid
        item
        xs={12}
        sm={`${field.type === "image" ? 12 : 6}`}
        key={field.name}
      >
        <Typography variant="h6" gutterBottom>
          {field.label}
        </Typography>
        <RenderData field={field} value={formValues[field.name]}></RenderData>
      </Grid>
    );
  });
}

export default ReportField;
