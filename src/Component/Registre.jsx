import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

import "bootstrap/dist/css/bootstrap.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../css/registre.css';

function Register() {
  return (
    <div>


<MDBContainer fluid className="p-3" >

<MDBRow>

  <MDBCol col='10' md='6'style={{marginTop:'80px'}}>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
  </MDBCol>

  <MDBCol col='4' md='5' style={{marginTop:'70px'}}>

    <div className="divider d-flex align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0"><h1>Create Account</h1></p>
    </div>

    <MDBInput wrapperClass='mb-4' label='Nom' id='formControlLg' type='email' size="lg" />
    <MDBInput wrapperClass='mb-4' label='Prenom' id='formControlLg' type='email' size="lg" />
    <MDBInput wrapperClass='mb-4' label='Tel' id='formControlLg' type='email' size="lg" />
    <MDBInput wrapperClass='mb-4' label='Email' id='formControlLg' type='email' size="lg" />
    <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='email' size="lg" />
    <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" />

    <div className='text-center text-md-start mt-4 pt-2'>
      <MDBBtn className="mb-0 px-5" style={{marginLeft:'250px'}} size='lg'>Register</MDBBtn>
      <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <a href="#!" className="link-danger">Login</a></p>
    </div>

  </MDBCol>

</MDBRow>

</MDBContainer>
    </div>
  );
}
 
export default Register;