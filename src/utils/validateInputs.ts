import validator from 'validator';

type FormDataProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  state: string;
  field?: string;
  products?: string;
  acceptAgreement: string;
  agriculturalProducts: [];
};

const validateRegisterInputs = (formData: FormDataProps) => {
  if (!validator.isLength(formData.firstName, { min: 2, max: 20 })) {
    return 'Provide your first name';
  }
  if (!validator.isLength(formData.lastName, { min: 2, max: 20 })) {
    return 'Provide your last name';
  }
  if (!validator.isEmail(formData.email)) {
    return 'Provide a valid Email';
  }
  if (!validator.isStrongPassword(formData.password)) {
    return 'Provide a strong password';
  }
  if (!validator.isLength(formData.state, { min: 2 })) {
    return 'Provide your state of residence';
  }

  if (!formData.acceptAgreement) {
    return 'Please Accept our terms and conditions';
  }
};

const validateLoginInputs = (formData: FormDataProps) => {
  if (!validator.isEmail(formData.email)) {
    return 'Provide a valid email';
  }
  if (!validator.isStrongPassword(formData.password)) {
    return 'Wrong password';
  }
};

const validateAgriculturalField = (formData: FormDataProps) => {
  if (formData.field.length < 2) {
    return 'Your agricultural field is required';
  }
};
const validateAgriculturalProducts = (formData: FormDataProps) => {
  if (formData.agriculturalProducts.length < 0) {
    return 'Your agricultural products are required';
  }
};
module.exports = {
  validateRegisterInputs,
  validateLoginInputs,
  validateAgriculturalProducts,
  validateAgriculturalField,
};
