import React, { Component } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

import "bootstrap/dist/css/bootstrap.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../css/registre.css';
import Form from "react-validation/build/form";

import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service"



const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      phonrNumber: "",
      successful: false,
      message: ""
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePhoneNumber(e) {
    this.setState({
      phonrNumber: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }



  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    // Check if there are no validation errors
    if (this.checkBtn.context._errors.length === 0) {
      // Check if the password matches the confirmPassword


      // If passwords match, proceed with registration
      AuthService.register(
        this.state.username,
        this.state.firstName,
        this.state.lastName,
        this.state.password,
        this.state.email,
        this.state.phonrNumber
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div>


        <MDBContainer fluid className="p-3" >

          <MDBRow>

            <MDBCol col='10' md='6' style={{ marginTop: '80px' }}>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
            </MDBCol>

            <MDBCol col='4' md='5' style={{ marginTop: '70px' }}>
              <Form
                onSubmit={this.handleRegister}
                ref={(c) => {
                  this.form = c;
                }}
              >

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0"><h1>Create Account</h1></p>
                </div>

                <MDBInput wrapperClass='mb-4' required placeholder='Nom' value={this.state.lastName} onChange={this.onChangeLastName} label='Nom' id='formControlLg' type='text' size="lg" />
                <MDBInput wrapperClass='mb-4' required placeholder='Prenom' value={this.state.firstName} onChange={this.onChangeFirstName} label='Prenom' id='formControlLg' type='text' size="lg" />
                <MDBInput wrapperClass='mb-4' required placeholder='Tel' value={this.state.phonrNumber} onChange={this.onChangePhoneNumber} label='Tel' id='formControlLg' type='text' size="lg" />
                <MDBInput wrapperClass='mb-4' required placeholder='Email' value={this.state.email} onChange={this.onChangeEmail} label='Email' id='formControlLg' type='email' size="lg" />
                <MDBInput wrapperClass='mb-4' required placeholder='Username' value={this.state.username} onChange={this.onChangeUsername} label='Username' id='formControlLg' type='text' size="lg" />
                <MDBInput wrapperClass='mb-4' required placeholder='Password' value={this.state.password} onChange={this.onChangePassword} label='Password' id='formControlLg' type='password' size="lg" />

                <div className='text-center text-md-start mt-4 pt-2'>
                  <MDBBtn className="mb-0 px-5" type='submit' style={{ marginLeft: '250px' }} size='lg'>Register</MDBBtn>
                  <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <a href="/" className="link-danger">Login</a></p>
                </div>
                {this.state.message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                />

              </Form>

            </MDBCol>

          </MDBRow>

        </MDBContainer>
      </div>
    );
  }
}

