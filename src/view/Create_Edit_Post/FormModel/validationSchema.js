import * as Yup from "yup";
import checkoutFormModel from "./checkoutFormModel";
const {
  formField: { title, location, description, category, price, images },
} = checkoutFormModel;

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// const FILE_SIZE = 10 * 1024 * 1024; // = 10 MB
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = [
  Yup.object().shape({
    // Client info
    [title.name]: Yup.string()
      .required(`${title.requiredErrorMsg}`)
      .test(
        "len",
        "Must be from 3 to 25 characters",
        (val) => val?.length && val.length > 2 && val.length < 26
      ),
    [location.name]: Yup.string().required(`${location.requiredErrorMsg}`),
    [description.name]: Yup.string().required(
      `${description.requiredErrorMsg}`
    ),
    [category.name]: Yup.string().required(`${category.requiredErrorMsg}`),
    [price.name]: Yup.number("Price must be a number").required(
      `${price.requiredErrorMsg}`
    ),
  }),
  // Upload
  Yup.object().shape({
    [images.name]: Yup.array(),
    // .test(
    //   "fileSize",
    //   "File too large",
    //   (value) => value && value.file && value.file.size <= FILE_SIZE
    // )
    // .test(
    //   "fileFormat",
    //   "Unsupported Format",
    //   (value) =>
    //     value && value.file && SUPPORTED_FORMATS.includes(value.file.type)
    // ),
  }),
];

export default validationSchema;
