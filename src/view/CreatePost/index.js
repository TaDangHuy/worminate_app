import {
  Backdrop,
  Button,
  CircularProgress,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

import { Formik, Form } from "formik";

import UploadForm from "./Forms/UploadForm";
import ResultForm from "./Forms/ResultForm";

import ReviewOrder from "./ReviewOrder/ReviewOrder";

import validationSchema from "./FormModel/validationSchema";
import checkoutFormModel from "./FormModel/checkoutFormModel";
import formInitialValues from "./FormModel/formInitialValues";
import axios from "axios";
import SnackbarCustom from "../../components/SnackbarCustom";
import { useHistory } from "react-router-dom";

const debug = true;
const steps = ["Info", "Image", "Submit"];
const { formId, formField } = checkoutFormModel;
const token = localStorage.getItem("token");

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <ResultForm formField={formField} />;
    case 1:
      return <UploadForm formField={formField} />;
    case 2:
      return <ReviewOrder />;
    default:
      return <div>Not Found</div>;
  }
}

function _renderStepHeader(step) {
  switch (step) {
    case 0:
      return (
        <Typography variant="h6" sx={{ fontWeight: "500" }}>
          Product Infomation
        </Typography>
      );
    case 1:
      return (
        <Typography variant="h6" sx={{ fontWeight: "500" }}>
          Choose product's image
        </Typography>
      );
    case 2:
      return (
        <Typography variant="h6" sx={{ fontWeight: "500" }}>
          Summary
        </Typography>
      );
    default:
      return <></>;
  }
}

const snackbarProps = {
  success: {
    severity: "success",
    message: "Create Post success",
  },
  error: {
    severity: "error",
    message: "Cannot update password, password is invalid",
  },
};
function CreatePost() {
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarprops, setSnackbarProps] = React.useState({});

  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _submitForm(values, actions) {
    let images = values.image;
    let configImage = images.name.map((name, index) => ({
      fileName: name,
      path: images.src[index],
    }));
    const { image, ...rest } = values;
    const post = { ...rest, images: configImage };
    axios({
      method: "POST",
      url: `/posts`,
      headers: { Authorization: `Bearer ${token}` },
      data: { post },
    })
      .then((response) => {
        actions.setSubmitting(false);
        setSnackbarProps(snackbarProps.success);
        setOpenSnackbar(true);
        const idPost = response.data.post["_id"];
        history.push(`/posts/${idPost}`);
      })
      .catch((err) => console.log(err));
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  return (
    <div
      style={{
        background: "#f5f8fb",
        width: "100%",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      <Box
        sx={{
          width: 770,
          borderRadius: "10px",
          margin: "auto",
          pt: "50px",
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            mt: "56px",
            px: "23px",
            py: "28px",
          }}
        >
          {_renderStepHeader(activeStep)}
          <Box sx={{ pt: "35px" }}>
            <Formik
              initialValues={formInitialValues}
              validationSchema={currentValidationSchema}
              onSubmit={_handleSubmit}
              debug={debug}
            >
              {({ isSubmitting }) => (
                <Form id={formId}>
                  {_renderStepContent(activeStep)}

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ pt: "25px" }}
                  >
                    {activeStep !== 0 ? (
                      <Button onClick={_handleBack}>Back</Button>
                    ) : (
                      <Button disabled></Button>
                    )}
                    <div>
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        {isLastStep ? "Create" : "Next"}
                      </Button>
                    </div>
                  </Stack>
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={isSubmitting}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
      <SnackbarCustom
        openSnackbarProp={openSnackbar}
        setOpenSnackbarProp={(value) => {
          setOpenSnackbar(value);
        }}
        snackbarprops={snackbarprops}
      />
    </div>
  );
}

export default CreatePost;
