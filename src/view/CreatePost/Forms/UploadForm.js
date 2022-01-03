import React, { useState, useEffect } from "react";
import { Field, useField } from "formik";
import UploadField from "../FormFields/UploadField";
import Thumb from "../common/Thumb";
import { Grid } from "@mui/material";

const ImageForm = (props) => {
  const {
    formField: { image },
  } = props;

  const [field, meta, helper] = useField(image.name);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;

  console.log("value", value);
  const [fileName, setFileName] = useState(value.name ? [value.name] : []);
  const [file, setFile] = useState(value.file ? [value.file] : []);
  const [src, setSrc] = useState(value.src ? [value.src] : []);

  const _onChange = (e) => {
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      let tmpFile = files[i];
      if (tmpFile) {
        reader.onloadend = () =>
          setFileName((oldFileName) => [...oldFileName, tmpFile.name]);
        reader.readAsDataURL(tmpFile);
        setSrc((oldSrc) => [...oldSrc, reader]);
        setFile((oldFile) => [...oldFile, tmpFile]);
      }
    }
  };

  useEffect(() => {
    if (fileName && src) {
      setValue({ src: [...src], name: [...fileName], file: [...file] });
      console.log("fileName", fileName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, fileName]);

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

        {file.map((f, i) => (
          <Grid item>
            {f && src[i] && <Thumb file={f} src={src[i]}></Thumb>}
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default ImageForm;
