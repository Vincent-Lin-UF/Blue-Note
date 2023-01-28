import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      navigate('/account')
    }).catch((error) => {
      console.log("error")
    });
  
  }

  return (
    <section class="vh-100 bg-dark" >
      <div class="py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong rounded" >
              <div class="card-body p-5 text-center">
                <div>
                  <div>
                    <h1 className="mb-5">Sign In</h1>
                  </div>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Control  className="form-control form-control-lg" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Control className="form-control form-control-lg" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button class="btn btn-primary btn-lg btn-block mb-2" size="lg"type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>

                  <hr></hr>
                  <div className="d-grid gap">
                    <Button onClick={signInWithGoogle} class="mt-2 btn btn-lg btn-block" variant="secondary" size="lg" bg= "primary" type="submit">
                      <i class="fab fa-google me-2"></i> 
                      Sign in with Google
                    </Button>
                  </div>

                  <h5 className="mt-5">
                    Don't have an account yet?{' '}
                    <Link to='/signup'>
                      Sign up.
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
  );
};

export default Signin;