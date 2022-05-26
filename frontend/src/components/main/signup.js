import { Button, Card, CardContent, Container, TextField } from "@mui/material";
import React from "react";
import { Formik } from "formik";
import app_config from "../../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Stack from "@mui/material/Stack";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./signup.css";

const Signup = () => {
  const signupStyles = {
    background: "url(https://wallpaperaccess.com/full/1223823.jpg)",
    height: "100%",
  };

  const url = app_config.backend_url;

  //   1. Create the form object

  const userForm = {
    name: "",
    mobile: "",
    email: "",
    password: "",
    createdAt: new Date(),
  };

  const navigate = useNavigate();

  const addHomePage = (formdata) => {
    fetch(url + "/webpage/add", {
      method: "POST",
      body: JSON.stringify({
        title: `${formdata.username}'s Webpage`,
        createdBy: formdata._id,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status === 200) {
        console.log("webpage added!");
      }
    });
  };

  const formSubmit = (formdata) => {
    console.log(formdata);

    // asynchronous function returns promise
    fetch(url + "/user/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          addHomePage(data);
          Swal.fire({
            icon: "success",
            title: "Registered Successfully!!",
          });
        });
      }
    });
  };

  return (
    <div style={styles.container}>
      <Formik initialValues={userForm} onSubmit={formSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <section className="text-center text-lg-start">
            <div className="container py-4">
              <div className="row g-0 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="card cascading-right">
                    <div className="card-body p-5 shadow-5 text-center">
                      <h2 className="fw-bold mb-5">Sign up now</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <TextField
                                variant="standard"
                                type="text"
                                label="Full Name"
                                id="name"
                                onChange={handleChange}
                                value={values.name}
                                className="w-100"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <TextField
                                variant="standard"
                                type="email"
                                label="Email Address"
                                id="email"
                                onChange={handleChange}
                                value={values.email}
                                className="w-100"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <TextField
                            variant="standard"
                            type="text"
                            label="Mobile No."
                            id="mobile"
                            onChange={handleChange}
                            value={values.mobile}
                            className="w-100"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <TextField
                            variant="standard"
                            type="password"
                            label="Password"
                            id="password"
                            onChange={handleChange}
                            value={values.password}
                            className="w-100"
                          />
                        </div>

                        <div className="form-check d-flex justify-content-center mb-4">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example33"
                            checked
                          />
                          <label
                            className="form-check-label"
                            for="form2Example33"
                          >
                            Subscribe to our newsletter
                          </label>
                        </div>

                        <Button
                          type="submit"
                          className="btn-block mb-4"
                          variant="outlined"
                        >
                          Sign up
                        </Button>

                        <div className="text-center">
                          <p>or sign up with:</p>
                          <button
                            type="button"
                            className="btn btn-link btn-floating mx-1"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </button>

                          <button
                            type="button"
                            className="btn btn-link btn-floating mx-1"
                          >
                            <i className="fab fa-google"></i>
                          </button>

                          <button
                            type="button"
                            className="btn btn-link btn-floating mx-1"
                          >
                            <i className="fab fa-twitter"></i>
                          </button>

                          <button
                            type="button"
                            className="btn btn-link btn-floating mx-1"
                          >
                            <i className="fab fa-github"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mb-5 mb-lg-0">
                  <img
                    src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                    className="w-100 rounded-4 shadow-4"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </Formik>
    </div>
  );
};

const styles = {
  container: {
    background:
      "linear-gradient(to right, #44004982, #44004982), url(https://wallpapershome.com/images/wallpapers/vr-3840x2160-virtual-reality-space-12369.jpg)",
    height: "100vh",
    backgroundSize: "cover",
  },
};

export default Signup;
