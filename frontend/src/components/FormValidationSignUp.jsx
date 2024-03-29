export function FormValidation(email, pass) {
  let errors = {};
  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordPattern = /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;

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
  return errors;
}
