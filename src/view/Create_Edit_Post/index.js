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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";

import UploadForm from "./Forms/UploadForm";
import ResultForm from "./Forms/ResultForm";

import ReviewOrder from "./ReviewOrder/ReviewOrder";

import validationSchema from "./FormModel/validationSchema";
import checkoutFormModel from "./FormModel/checkoutFormModel";
import axios from "axios";
import SnackbarCustom from "../../components/SnackbarCustom";
import { Link, useHistory } from "react-router-dom";

const debug = true;
const steps = ["Info", "Image", "Submit"];
const { formId, formField } = checkoutFormModel;
const token = localStorage.getItem("token");

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

function Create_Edit_Post({ post }) {
  const history = useHistory();
  const {
    formField: { title, location, description, category, price, images },
  } = checkoutFormModel;

  const [formInitialValues, setFormInitialValues] = useState({});
  useEffect(() => {
    setFormInitialValues({
      [title.name]: post ? post.title : "",
      [location.name]: post?.location || "",
      [description.name]: post?.description,
      [price.name]: post?.price || null,
      [category.name]: post?.category["_id"] || "",
      [images.name]: post ? post.images : [],
    });
  }, [post]);

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

  const [deleteImages, setDeleteImages] = useState([]);

  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarprops, setSnackbarProps] = React.useState({});

  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _renderStepContent(step) {
    switch (step) {
      case 0:
        return <ResultForm formField={formField} categories={categories} />;
      case 1:
        return (
          <UploadForm
            formField={formField}
            setDeleteImages={(image) =>
              setDeleteImages([...deleteImages, image])
            }
          />
        );
      case 2:
        return <ReviewOrder categories={categories} />;
      default:
        return <div>Not Found</div>;
    }
  }

  function _submitForm(values, actions) {
    console.log({ values });
    console.log({ deleteImages });
    axios({
      method: "POST",
      url: `/posts`,
      headers: { Authorization: `Bearer ${token}` },
      data: { post: values },
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

  function _updateForm(values, actions) {
    console.log("updata");
    console.log({ values });
    console.log({ deleteImages });
    axios({
      method: "PUT",
      url: `/posts/${post["_id"]}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        post: {
          ...values,
          deleteImages: deleteImages.map((e) => {
            const { path, ...rest } = e;
            return rest;
          }),
        },
      },
    })
      .then((response) => {
        actions.setSubmitting(false);
        setSnackbarProps(snackbarProps.success);
        setOpenSnackbar(true);
        const idPost = response.data.post["_id"];

        history.push(`/posts/${idPost}`);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      if (!post) {
        _submitForm(values, actions);
      } else {
        _updateForm(values, actions);
      }
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
        minHeight: "110vh",
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
          mb: "30px",
        }}
      >
        {/* <Link
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        > */}
        <Button
          alignSelf="flex-start"
          sx={{ width: 100 }}
          startIcon={<ArrowBackIcon />}
          onClick={history.goBack}
        >
          Back
        </Button>
        {/* </Link> */}
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
          <Box sx={{ pt: "10px" }}>
            <Formik
              enableReinitialize
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
                        {!isLastStep ? "Next" : post ? "Update" : "Create"}
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

export default Create_Edit_Post;
