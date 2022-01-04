import checkoutFormModel from "./checkoutFormModel";
const {
  formField: { title, location, description, category, price, image },
} = checkoutFormModel;

const formInitialValues = {
  [title.name]: "",
  [location.name]: "",
  [description.name]: "",
  [price.name]: null,
  [category.name]: "",
  [image.name]: {
    name: [],
    src: [],
  },
};

export default formInitialValues;
