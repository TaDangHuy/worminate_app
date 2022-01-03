const checkoutFormModel = {
  formId: "smileForm",
  formField: {
    title: {
      name: "title",
      label: "Title*",
      requiredErrorMsg: "Title is required",
      type: "text",
    },
    location: {
      name: "location",
      label: "Location*",
      requiredErrorMsg: "Location is required",
      type: "text",
    },
    description: {
      name: "description",
      label: "Description*",
      requiredErrorMsg: "Description is required",
      type: "text",
    },
    category: {
      name: "category",
      label: "Category*",
      requiredErrorMsg: "Category is required",
      type: "select",
    },
    price: {
      name: "price",
      label: "price*",
      requiredErrorMsg: "price is required",
      type: "text",
    },

    image: {
      name: "image",
      label: "8. Please upload an image:",
      type: "image",
    },
  },
};

export default checkoutFormModel;
