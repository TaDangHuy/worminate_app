import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import SnackbarCustom from "../../../components/SnackbarCustom";

const CustomInput = styled(OutlinedInput)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(4),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    // position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    // border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const validationSchema = yup.object({
  title: yup.string("title").required("title is required"),
  location: yup.string("Location"),
  description: yup.string("Description"),
  category: yup.string("Category"),
  price: yup.string("Price"),
  image: yup.string("Image"),
});

function ProductForm() {
  const formik = useFormik({
    initialValues: {
      title: "title",
      location: "location",
      description: "description",
      category: "category",
      price: "price",
      image: "image",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      //   let { confirmPassword, ...data } = values;
      //   data = { ...data, image: avatar };
      //   axios({
      //     method: "PUT",
      //     url: `/user/${id}`,
      //     headers: { Authorization: `Bearer ${token}` },
      //     data: data,
      //   })
      //     .then((response) => {
      //       localStorage.setItem("UserName", response.data.user.fullName);
      //       localStorage.setItem("avatar", response.data.user.image.path);
      //       // setIsChangedAvatarProp(true);
      //       setFullNameProp(response.data.user.fullName);
      //       setSnackbarProps(snackbarProps.success);
      //       setOpenSnackbar(true);
      //     })
      //     .catch((error) => {
      //       setSnackbarProps(snackbarProps.error);
      //       setOpenSnackbar(true);
      //     });
    },
  });

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [snackbarprops, setSnackbarProps] = React.useState({});
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          columnGap: 4,
          rowGap: 2,
          gridTemplateRows: "auto",
          gridTemplateAreas: `"title location"
                              "description category"
                              "description price"
                              "submit submit"`,
        }}
      >
        <Box sx={{ gridArea: "title" }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="title">
              <Typography variant="h5" color="textSecondary">
                Title
              </Typography>
            </InputLabel>
            <CustomInput
              id="title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
            />
          </FormControl>
        </Box>
        <Box sx={{ gridArea: "location" }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="location">
              <Typography variant="h5" color="textSecondary">
                Location
              </Typography>
            </InputLabel>
            <CustomInput
              id="location"
              type="text"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
            />
          </FormControl>
        </Box>
        <Box sx={{ gridArea: "description" }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="description">
              <Typography variant="h5" color="textSecondary">
                Description
              </Typography>
            </InputLabel>
            <CustomInput
              id="description"
              multiline
              sx={{
                "& .MuiInputBase-input": { maxHeight: 100, p: 1 },
                padding: 1,
                height: 133,
              }}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
            />
          </FormControl>
        </Box>
        <Box sx={{ gridArea: "category" }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="category">
              <Typography variant="h5" color="textSecondary">
                Category
              </Typography>
            </InputLabel>
            <CustomInput
              id="category"
              type="text"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
            />
          </FormControl>
        </Box>
        <Box sx={{ gridArea: "price" }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="price">
              <Typography variant="h5" color="textSecondary">
                Price
              </Typography>
            </InputLabel>
            <CustomInput
              id="price"
              type="text"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
            />
          </FormControl>
        </Box>
      </Box>
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="image">
          <Typography variant="h5" color="textSecondary">
            Image
          </Typography>
        </InputLabel>
        <CustomInput
          id="image"
          type="text"
          value={formik.values.image}
          onChange={formik.handleChange}
          error={formik.touched.image && Boolean(formik.errors.image)}
        />
      </FormControl>
      <Box sx={{ gridArea: "submit" }}>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </Box>

      {/* <SnackbarCustom
        openSnackbarProp={openSnackbar}
        setOpenSnackbarProp={(value) => {
          setOpenSnackbar(value);
        }}
        snackbarprops={snackbarprops}
      /> */}
    </form>
  );
}

export default ProductForm;
