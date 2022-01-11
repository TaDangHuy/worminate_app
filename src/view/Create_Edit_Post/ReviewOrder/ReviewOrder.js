import React from "react";
import { useFormikContext } from "formik";

import formModel from "../FormModel/checkoutFormModel";
import ReportField from "./ReportField";
import { Grid } from "@mui/material";

export default function ReviewOrder() {
  const { formField } = formModel;
  const { values: formValues } = useFormikContext();

  console.log(formValues);
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <ReportField formValues={formValues} formData={formField} />
      </Grid>
    </React.Fragment>
  );
}
