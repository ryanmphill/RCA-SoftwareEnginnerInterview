/**
 * Validates the user input for the registration form
 * @param {Object} data - The user input data
 * @param {string} data.password - The user's password
 * @param {string} data.passwordConfirm - The user's password confirmation
 * @returns {Array} - The validation errors
 */
export function validateUserRegisterInput(data) {
  let currentValidation = [];

  if (data.password !== data.passwordConfirm) {
    currentValidation = [...currentValidation, "Passwords do not match"];
  }

  if (data.password.length <= 8) {
    currentValidation = [
      ...currentValidation,
      "Password must be longer than 8 characters",
    ];
  }

  if (!containsUppercase(data.password)) {
    currentValidation = [
      ...currentValidation,
      "Password must contain at least one uppercase letter",
    ];
  }

  if (!containsSpecialCharacter(data.password)) {
    currentValidation = [
      ...currentValidation,
      "Password must contain at least one special character: !@#$%^&*()-+={}[]:;\"'<>,.?/|\\~`_",
    ];
  }

  return currentValidation;
}

function containsUppercase(str) {
  return /[A-Z]/.test(str);
}

function containsSpecialCharacter(str) {
  const regex = /[!@#$%^&*()\-_~`+={}[\]:;"'<>,.?/|\\]/;
  return regex.test(str);
}
