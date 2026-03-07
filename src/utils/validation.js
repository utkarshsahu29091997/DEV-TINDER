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

const validateLoginData = req => {
    const {email, password} = req.body
    console.log('req.body', req.body)

    if(!email || !validator.isEmail(email)) {
        throw new Error("Invalid credentials!")
    } else if (!password) {
        console.log('password issue')
        throw new Error("Password is required!")
    }
}

module.exports = { validateSignUpData, validateLoginData };
