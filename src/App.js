import React, { Component } from "react";
import "./App.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
var passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

var mobRegex = new RegExp(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/);
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      userName: null,
      mobileNumber: null,
      email: null,
      password: null,
      Cpassword: null,

      formErrors: {
        firstName: "",
        userName: "",
        mobileNumber: "",
        email: "",
        password: "",
        Cpassword: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        User Name: ${this.state.userName}
        Mobile Number ${this.state.mobileNumber}
        Email: ${this.state.email}
        Password: ${this.state.password}
        Confirm Password: ${this.state.Cpassword}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    var passval =this.state.password;
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 5 || value.length >30 ? "minimum 5 characaters and maximum 30 required" : "";
        break;
      case "userName":
        formErrors.userName =
        value.length < 5 || value.length >20 ? "minimum 5 characaters and maximum 20 required" : "";
        break;
      case "mobileNumber":
        formErrors.mobileNumber = mobRegex.test(value)
          ? "" : "Enter a valid mobile number with country code";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password = passRegex.test(value) && value.length > 7  && value.length < 16 ? ""
          : "Password should be contain one capital later, one small later, one symbol,one digit and length is at least 8 and at most 15" ;
        break;
      case "Cpassword":
        formErrors.Cpassword =
          passval != value ? "Password did not match   " : "";
          document.getElementById(this.state.password);
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="userName">
              <label htmlFor="userName">User Name</label>
              <input
                className={formErrors.userName.length > 0 ? "error" : null}
                placeholder="User Name"
                type="text"
                name="userName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.userName.length > 0 && (
                <span className="errorMessage">{formErrors.userName}</span>
              )}
            </div>
            <div className="mobileNumber">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                className={formErrors.mobileNumber.length > 0 ? "error" : null}
                placeholder="Mobile Number"
                type="text"
                name="mobileNumber"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.userName.length > 0 && (
                <span className="errorMessage">{formErrors.mobileNumber}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="Cpassword">
              <label htmlFor="Cpassword">Confirm Password</label>
              <input
                className={formErrors.Cpassword.length > 0 ? "error" : null}
                placeholder="Confirm Password"
                type="password"
                name="Cpassword"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Cpassword.length > 0 && (
                <span className="errorMessage">{formErrors.Cpassword}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">SIGN UP</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
