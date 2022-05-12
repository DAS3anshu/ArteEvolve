import { Button, Card, CardContent, CardMedia, Container, TextField } from "@mui/material";
import { Formik } from "formik";
import Swal from "sweetalert2";
import app_config from "../../config";

const Login = () => {

  const url = app_config.backend_url;

  const loginForm = {
    email: "",
    password: "",
  };

  const loginSubmit = (formdata) => {
    console.log(formdata);

    fetch(url+'/user/authenticate', { 
      method : 'POST', 
      body : JSON.stringify(formdata),
      headers : { 'Content-Type':"application/json" }, 
    })
    .then( res => {
      if(res.status === 200) {
        Swal.fire({
          icon: 'success',
          title : 'Success!!',
          text : "Successfully loggedin"
        })
      }else{
        Swal.fire({
          icon: 'error',
          title : 'Oops!!',
          text : "Login failed"
        }); 
      }
    });
  };


    return <Container maxWidth="sm" sx={{ height: "90vh" ,display: "flex" , alignItems:"center" }}>
      <Card className="w-100">
        <CardMedia
         component="img"
         image="data:image/jpeg;base64,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"
         height={300}
        >
        </CardMedia>
        <p className="text-center mt-3 mb-2  h2" > Signin </p>
        <CardContent>

          <Formik initialValues={loginForm} onSubmit={loginSubmit}>
            { ( {values, handleChange, handleSubmit} ) => (
              <form onSubmit={handleSubmit}>
                 <TextField  
                    className="w-100 mb-4" 
                    label="Email" 
                    varient="filled" 
                    type="email"
                    helperText="Enter email" 
                    id="email" 
                    value={values.email} 
                    onChange={handleChange} 
                  />
                 <TextField 
                 
                    className="w-100 mb-4" 
                    label="Password" 
                    varient="filled"  
                    type="password"
                    helperText="Enter Correct password"
                    id="password" 
                    value={values.password} 
                    onChange={handleChange}
                  />
                 <Button 
                    varient="conatined" 
                    className="w-100" 
                    color="success"
                    type="submit" 
                    >                    
                     Submit
                 </Button>
              </form>
            ) }
          </Formik>
          
          
        </CardContent>
      </Card>
    </Container>
};
export default Login;