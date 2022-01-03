import * as Yup from "yup";
import checkoutFormModel from "./checkoutFormModel";
const {
  formField: { title, location, description, category, price, image },
} = checkoutFormModel;

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// const FILE_SIZE = 10 * 1024 * 1024; // = 10 MB
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = [
  Yup.object().shape({
    // Client info
    [title.name]: Yup.string().required(`${title.requiredErrorMsg}`),
    [location.name]: Yup.string().required(`${location.requiredErrorMsg}`),
    [description.name]: Yup.string().required(
      `${description.requiredErrorMsg}`
    ),
    [category.name]: Yup.string()
      .nullable()
      .required(`${category.requiredErrorMsg}`),
    [price.name]: Yup.string().required(`${price.requiredErrorMsg}`),
  }),
  // Upload
  Yup.object().shape({
    [image.name]: Yup.array().nullable(),
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
