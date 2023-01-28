import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (password === password2) {
        await createUser(email, password);
        navigate("/summarize");
      }
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <section class="vh-100 bg-dark">
      <div class="py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong rounded">
              <div class="card-body p-5 text-center">
                <div>
                  <div>
                    <h1 className="mb-5">Account Registration</h1>
                  </div>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Control
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Control
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Control
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setPassword2(e.target.value)}
                      />
                    </Form.Group>

                    <div className="d-grid gap-2">
                      <Button
                        class="btn btn-primary btn-lg btn-block mb-2"
                        size="lg"
                        type="submit"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </Form>

                  <hr></hr>
                  <div className="d-grid gap">
                    <button
                      class="mt-2 btn btn-lg btn-block btn-secondary"
                      size="lg"
                      bg="primary"
                      type="submit"
                    >
                      <i class="fab fa-google me-2"></i>
                      Sign up with Google
                    </button>
                  </div>
                  <h5 className="mt-5">
                    Already have an account yet? <Link to="/">Login</Link>
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

export default Signup;
