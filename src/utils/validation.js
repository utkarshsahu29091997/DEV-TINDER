const validator = require("validator");

const validateSignUpData = (req) => {
  const { email, firstName, lastName, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!email || !validator.isEmail(email)) {
    throw new Error("Email is not valid!");
  } else if (!password || !validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password!");
  }
};

const validateLoginData = (req) => {
  const { email, password } = req.body;

  if (!email || !validator.isEmail(email)) {
    throw new Error("Invalid credentials!");
  } else if (!password) {
    console.log("password issue");
    throw new Error("Password is required!");
  }
};

const validatedEditProfileData = (req) => {
  const editFieldsAllowed = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  const isAllowed = Object.keys(req.body).every((key) =>
    editFieldsAllowed.includes(key),
  );
  return isAllowed;
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validatedEditProfileData,
};
