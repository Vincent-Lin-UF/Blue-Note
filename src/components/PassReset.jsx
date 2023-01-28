import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const { auth } = UserAuth();
    
/*
  const triggerResetEmail = async (e) => {
    e.preventDefault();
    setError('')
    try {
        await sendPasswordResetEmail(auth, email);
        navigate('/')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };
  */
  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent")
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
                        <h1 className="mb-5">Password Reset</h1>
                    </div>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Control  className="form-control form-control-lg" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <h5 className="mb-4">Required</h5>

                        <div className="d-grid gap-2">
                            <Button onClick={triggerResetEmail} class="btn btn-primary btn-lg btn-block mb-2" size="lg"type="submit">
                                Reset My Password
                            </Button>
                        </div>
                    </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
  );
};

export default ResetPassword;