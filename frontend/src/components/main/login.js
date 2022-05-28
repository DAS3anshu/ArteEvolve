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
// import { GoogleLogin } from "react-google-login";

const Login = () => {
  const url = app_config.backend_url;

  const userForm = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const loginSubmit = (formdata) => {
    fetch(url + "/user/authenticate", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Successfully Logged In!",
          icon: "success",
        });

        res.json().then((data) => {
          if (data.isAdmin) {
            sessionStorage.setItem("admin", JSON.stringify(data));
            navigate("/admin/dashboard");
            return;
          } else {
            sessionStorage.setItem("user", JSON.stringify(data));
            navigate("/user/manageartwork");
            return;
          }
        });
      } else if (res.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops!!",
          text: "Login Failed",
        });
      }
    });
  };

  return (
    <div style={styles.container}>
      <Formik initialValues={userForm} onSubmit={loginSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <section class="vh-100">
            <div class="container py-5 h-100">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div
                    class="card shadow-2-strong"
                    style={{ borderRadius: "1rem" }}
                  >
                    <div class="card-body p-5 text-center">
                      <h2 class="mb-5">Login</h2>
                      <form onSubmit={handleSubmit}>
                        <div class="form-outline mb-4">
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
                        <div className="form-check d-flex justify-content-start mb-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="form1Example3"
                          />
                          <label
                            className="form-check-label"
                            for="form1Example3"
                          >
                            {" "}
                            Remember password{" "}
                          </label>
                        </div>
                        <Button
                          className="btn-block"
                          type="submit"
                          variant="contained"
                        >
                          Login
                        </Button>
                      </form>

                      <hr className="my-4" />
                    </div>
                  </div>
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
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  },
};

export default Login;
