import { Formik } from "formik";
import React from "react";
// import Swal from "sweetalert2";
import * as Yup from "yup";
import app_config from "../../config";



const AddArtwork = () => {
  const url = app_config.backend_url;

  const userForm ={
    image : "",
    description : "",
    price : "",
    artist : "",
    details : "",

  };
  
  const userSubmit = (formdata) => {
    console.log(formdata);


    fetch(url+'/artwork/add', {
      method : 'POST',
      body : JSON.stringify(formdata),
      headers : {
        'Content-Type' : 'application/json'
      }
    }).then(res => {
      if(res.status == 200){
        res.json().then(data => {
          console.log(data);
        })
      }
    })
  };

  const arkworkForm = () => {
    
  }

  return (
    <>
      <div className="mycontainer">
        
        <div className="two-sub-con">
          <Formik
            initialValues={userForm} 
           
            onSubmit={userSubmit}
          >
            {({ values, handleSubmit, handleChange, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <div className="main-head">
                  <h1>Add Artwork</h1>
                  <p>Let's set up your personal account</p>

                  <input
                    name="artist"
                    id="artist"
                    value={values.artist}
                    onChange={handleChange}
                    placeholder="Artist Name"
                  />
                  {errors.artist && touched.artist ? (
                    <div className="error">{errors.artist}</div>
                  ) : null}
                  <input
                    name="description"
                    id="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Description"
                  />
                  {errors.description && touched.description ? (
                    <div className="error">{errors.description}</div>
                  ) : null}
                  <input
                    name="price"
                    type="number"
                    id="price"
                    value={values.price}
                    onChange={handleChange}
                    placeholder="PRICE $34.5"
                  />
                  {errors.price && touched.price ? (
                    <div className="error">{errors.price}</div>
                  ) : null}
                  <input
                    name="image"
                    type="string"
                    id="image"
                    value={values.image}
                    onChange={handleChange}
                    placeholder="image"
                  />
                  {errors.image && touched.image ? (
                    <div className="error">{errors.image}</div>
                  ) : null}
                  <button type="submit">Confirm </button>
                </div>
                
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddArtwork;
