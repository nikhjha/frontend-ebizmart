 export const validatefirstName = (firstName,error) => {
  if (firstName.length === 0) {
    error("First Name is missing ");
    return false;
  }
  return true;

};
 export const validatelastName = (lastName,error) => {
  if (lastName.length === 0) {
    error("Last Name is missing ");
    return false;
  }
  return true;
};

export const validateEmail = (email,error) => {
  if (email.length === 0) {
    error("Please Enter Email");
    return false;
  }
  var regularExpression =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (!email.match(regularExpression)) {
    error("Invalid Email Address");
    return false;
  }
  return true;
};

export const validatePassword = (password,error) => {
  if (password.length === 0) {
    error("Please Enter Password");
    return false;
  }
  if (password.length < 8) {
    error("Password Too Short");
    return false;
  }
  if (password.length > 16) {
    error("Password Too Long");
    return false;
  }
  var digits = (password.match(/\d/g) || []).length;
  if (digits < 1) {
    error("Digit missing in the password");
    return false;
  }
  var upper = (password.match(/[A-Z]/g) || []).length;
  if (upper < 1) {
    error("Capital letter missing in the password");
    return false;
  }
  var regularExpression = /(?=.*[!@#$%^&*])/;
  if (!regularExpression.test(password)) {
    error("Special Character missing in the password");
    return false;
  }
  return true;
};

export const validatePhoneNumber = (phone,error) => {
  if (phone.length !== 10) {
    error("Invalid Phone Number");
    return false;
  }
  return true;
};
 