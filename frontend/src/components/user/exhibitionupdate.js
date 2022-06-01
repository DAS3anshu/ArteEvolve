import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import app_config from "../../config";

const UpdateExhibition = ({ userForm, loadDataFromBackend, showForm }) => {
  const url = app_config.backend_url;
  const userSubmit = (formdata) => {
    console.log(formdata);

    // to send request on backend
    // 1. url
    // 2. request method
    // 3. data
    // 4. data format

    fetch(url + "exhibition/update/" + userForm._id, {
      method: "PUT",
      body: JSON.stringify(formdata), //convert javascript to json
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        console.log("data updated");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Updated Successfully!!👍",
        });
        loadDataFromBackend();
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <Formik initialValues={userForm} onSubmit={userSubmit}>
            {({ handleSubmit, handleChange, values }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Title"
                  variant="outlined"
                  className="w-100 mb-4"
                  id="title"
                  onChange={handleChange}
                  value={values.title}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  className="w-100 mb-4"
                  id="description"
                  onChange={handleChange}
                  value={values.description}
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  className="w-100 mb-4"
                  id="price"
                  onChange={handleChange}
                  value={values.price}
                />

                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={(e) => showForm(false)}
                  variant="contained"
                  color="error"
                >
                  Cancel
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateExhibition;
