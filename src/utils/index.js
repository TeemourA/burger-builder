export const updateObject = (prevObject, updatedProperties) => ({
  ...prevObject,
  ...updatedProperties,
});

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.length) {
    isValid = value.length === rules.length && isValid;
  }

  return isValid;
};
