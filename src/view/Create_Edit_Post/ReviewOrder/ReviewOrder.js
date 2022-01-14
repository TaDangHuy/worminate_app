import React from "react";
import { useFormikContext } from "formik";

import formModel from "../FormModel/checkoutFormModel";
import ReportField from "./ReportField";
import { Grid } from "@mui/material";

export default function ReviewOrder({ categories }) {
  const { formField } = formModel;
  const { values: formValues } = useFormikContext();

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <ReportField
          formValues={formValues}
          formData={formField}
          categories={categories}
        />
      </Grid>
    </React.Fragment>
  );
}
