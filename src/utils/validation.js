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

module.exports = { validateSignUpData };
