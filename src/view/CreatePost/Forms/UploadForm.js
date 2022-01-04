import React, { useState, useEffect } from "react";
import { Field, useField } from "formik";
import UploadField from "../FormFields/UploadField";
import Thumb from "../common/Thumb";
import { Grid } from "@mui/material";
import axios from "axios";

const ImageForm = (props) => {
  const {
    formField: { image },
  } = props;

  const [field, meta, helper] = useField(image.name);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;
  const [fileNames, setFileNames] = useState([...value.name]);
  const [fileSrcs, setFileSrcs] = useState([...value.src]);

  // const _onChange = (e) => {
  //   let files = e.target.files;

  //   for (let i = 0; i < files.length; i++) {
  //     let reader = new FileReader();
  //     let tmpFile = files[i];
  //     if (tmpFile) {
  //       reader.onloadend = () =>
  //         setFileName((oldFileName) => [...oldFileName, tmpFile.name]);
  //       reader.readAsDataURL(tmpFile);
  //       setSrc((oldSrc) => [...oldSrc, reader]);
  //       setFile((oldFile) => [...oldFile, tmpFile]);
  //     }
  //   }
  // };
  const _onChange = (e) => {
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      // let reader = new FileReader();
      let tmpFile = files[i];
      // reader.onloadend = () =>
      //   setFileName((oldFileName) => [...oldFileName, tmpFile.name]);
      // reader.readAsDataURL(tmpFile);
      // setSrc((oldSrc) => [...oldSrc, reader]);
      // setFile((oldFile) => [...oldFile, tmpFile]);
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
        let fileName = res.data.public_id;
        setFileNames((oldFileNames) => [...oldFileNames, fileName]);
        setFileSrcs((oldSrc) => [...oldSrc, path]);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (fileNames && fileSrcs) {
      setValue({ src: [...fileSrcs], name: [...fileNames] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileSrcs, fileNames]);

  return (
    <React.Fragment>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={12}>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "1.2em",
            }}
          >
            <Field
              field={field}
              onChange={_onChange}
              isError={isError}
              component={UploadField}
            />
          </div>
        </Grid>

        {fileNames.map((fileName, i) => (
          <Grid item>
            {fileName && fileSrcs[i] && (
              <Thumb fileName={fileName} src={fileSrcs[i]}></Thumb>
            )}
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default ImageForm;
