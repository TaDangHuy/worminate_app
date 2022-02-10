import React, { useState, useEffect } from "react";
import { Field, useField } from "formik";
import UploadField from "../FormFields/UploadField";
import Thumb from "../common/Thumb";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";

const ImageForm = (props) => {
  const {
    formField: { images },
    setDeleteImages,
  } = props;

  const [field, meta, helper] = useField(images.name);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;

  const [selectedImages, setSelectedImages] = useState([...value]);

  const _onChange = (e) => {
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      let tmpFile = files[i];
      handleFile(tmpFile);
    }
  };

  function handleFile(file) {
    const url = `https://api.cloudinary.com/v1_1/de8woxbuj/upload`;
    const fd = new FormData();

    fd.append("upload_preset", "j2xlmxdo");
    fd.append("tags", "browser_upload");
    fd.append("file", file);

    axios
      .post(url, fd)
      .then((res) => {
        let path = res.data["secure_url"];
        let filename = res.data.public_id;
        setSelectedImages((oldselectedImages) => [
          ...oldselectedImages,
          { filename, path },
        ]);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (selectedImages) {
      setValue(selectedImages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImages]);
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <br />
          <Button
            component="label"
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1.2em",
              border: "1px dashed ",
              width: "100%",
              height: "100px",
            }}
          >
            <Typography variant="text">
              drag or drop file here to upload
            </Typography>
            <Field
              field={field}
              onChange={_onChange}
              isError={isError}
              component={UploadField}
              hidden
            />
          </Button>
        </Grid>

        {selectedImages.length > 0 &&
          selectedImages.map((image, i) => (
            <Grid item>
              <Box
                sx={{
                  position: "relative",
                  "&:hover": {
                    "& .overlay": {
                      background: "rgba(0, 0, 0, 0.45)",
                      zIndex: 100,
                      opacity: "0.7",
                    },
                  },
                }}
              >
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: "0",
                    transition: ".5s ease",
                  }}
                >
                  <IconButton
                    color="primary"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                    onClick={() => {
                      setSelectedImages((oldState) => [
                        ...oldState.filter(
                          (element) => element.path !== image.path
                        ),
                      ]);
                      setDeleteImages(image);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Thumb
                  fileName={image.fileName || "no name"}
                  src={image.path}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );
};

export default ImageForm;
