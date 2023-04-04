export function FormValidation(email, pass) {
  let errors = {};

  if (email === "") {
    errors.email = "Email is required";
  }
  if (pass === "") {
    errors.pass = "Password is required";
  }
  console.log({ email, pass, errors });
  return errors;
}
