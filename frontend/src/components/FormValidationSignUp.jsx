export function FormValidation(email, pass) {
  let errors = {};
  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordPattern = /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;

  // I could add an error message for length, but would it be good?
  // Wouldn't then I should add to each case a different error message?
  if (!emailPattern.test(email)) {
    errors.email = "You have entered an invalid email format!";
  }
  if (!passwordPattern.test(pass)) {
    errors.pass = (
      <>
        Password is not strong enough. The password must contain the following:
        <br />- minimum of 8 characters
        <br />- minimum 1 lower case letter
        <br />- minimum 1 upper case letter
        <br />- minimum 1 number
        <br />- minimum 1 symbol
      </>
    );
  }
  // console.log({ email, pass, errors });
  return errors;

  /*   if (email === "") {
    errors.email = "Email is required";
  } else if (!emailPattern.test(email)) {
    errors.email = "You have entered an invalid email format!";
  }
  if (pass === "") {
    errors.pass = "Password is required";
  } else if (!passwordPattern.test(pass)) {
    errors.pass = (
      <>
        Password is not strong enough. The password must contain the following:
        <br />- minimum of 8 characters
        <br />- minimum 1 lower case letter
        <br />- minimum 1 upper case letter
        <br />- minimum 1 number
        <br />- minimum 1 symbol
      </>
    );
  }
  // console.log({ email, pass, errors });
  return errors; */
}
