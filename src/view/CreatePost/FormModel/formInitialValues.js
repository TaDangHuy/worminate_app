import checkoutFormModel from "./checkoutFormModel";
const {
  formField: { title, location, description, category, price, image },
} = checkoutFormModel;

const formInitialValues = {
  [title.name]: "",
  [location.name]: "",
  [description.name]: "",
  [price.name]: "",
  [category.name]: "",
  [image.name]: [],
};

export default formInitialValues;
