import React, { Component } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import '../css/login.css';
import "bootstrap/dist/css/bootstrap.min.css";
import authService from '../services/auth.service';
import AuthService from "../services/auth.service";
import CheckButton from "react-validation/build/button";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { withRouter } from '../common/with-router';
import Form from "react-validation/build/form";



class Login extends Component {

  constructor(props) {

    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      authService.login(this.state.username, this.state.password).then(
        () => {
          const user = AuthService.getCurrentUser();
          if (user.roles.includes("ROLE_ADMIN")) {
            this.props.router.navigate("/register");
          } else {
            this.props.router.navigate("/register");
          }

          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
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

            <MDBCol col='4' md='5' style={{ marginTop: '150px' }}>
              <Form onSubmit={this.handleLogin}
                ref={(c) => {
                  this.form = c;
                }}>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0"><h1>Login</h1></p>
                </div>

                <MDBInput wrapperClass='mb-4' placeholder='Username' required value={this.state.username}
                  onChange={this.onChangeUsername} label='Username' id='formControlLg' type='text' size="lg" />
                <MDBInput wrapperClass='mb-4' placeholder='Password' required value={this.state.password}
                  onChange={this.onChangePassword} label='Password' id='formControlLg' type='password' size="lg" />

                <div className="d-flex justify-content-between mb-4">
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                  <a href="!#">Forgot password?</a>
                </div>

                <div className='text-center text-md-start mt-4 pt-2'>
                  <MDBBtn className="mb-0 px-5" size='lg' type='submit'>Login</MDBBtn>
                  {this.state.message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
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

                  <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                </div>

              </Form>

            </MDBCol>

          </MDBRow>

        </MDBContainer>
      </div>
    );
  }
}

export default withRouter(Login);