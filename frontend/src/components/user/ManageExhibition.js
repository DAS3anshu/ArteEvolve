import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import app_config from "../../config";

const ManageExhibition = () => {
  const url = app_config.backend_url;
  const [selImage, setSelImage] = useState("");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [addNew, setAddNew] = useState(false);
  const navigate = useNavigate();
  const [exhibitionList, setExhibitionList] = useState([]);
  const [artworkList, setArtworkList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aLoading, setALoading] = useState(true);

  const fetchData = () => {
    fetch(url + "/exhibition/getbyuser/" + currentUser._id).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setExhibitionList(data);
          setLoading(false);
        });
      }
    });
    fetch(url + "/artwork/getbyuser/" + currentUser._id).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setArtworkList(data);
          setALoading(false);
        });
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = (id) => {
    fetch(url + "/exhibition/delete/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchData();
        toast.success("Successfully Deleted!!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  const addArtworkTo = (id, exid) => {
    fetch(url + "/exhibition/pushupdate/" + exid, {
      method: "PUT",
      body: JSON.stringify({ artworks: id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          // setExhibitionList(data);
          // setLoading(false);
          fetchData();
        });
      }
    });
  };

  const showAvailArtwork = (exid) => {
    if (!aLoading) {
      return artworkList.map((art) => (
        <li className="list-group-item">
          {art.title}
          <button
            className="btn btn-primary"
            onClick={(e) => addArtworkTo(art._id, exid)}
          >
            Add
          </button>
        </li>
      ));
    }
  };

  const showData = () => {
    if (!loading) {
      return exhibitionList.map(
        ({
          _id,
          title,
          thumbnail,
          description,
          price,
          createdAt,
          artworks,
        }) => (
          <div className="col-md-3">
            <div className="card">
              <img
                className="card-img-top"
                src={url + "/uploads/" + thumbnail}
                alt={title}
              />
              <div className="card-body">
                <h3 className="text-muted">{title}</h3>
                <button className="btn btn-primary">
                  <i class="fas fa-pen"></i> Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => deleteData(_id)}
                >
                  <i class="fas fa-trash"></i> Delete
                </button>
                <button
                  className="btn btn-success"
                  onClick={(e) => navigate("/main/exhibition/" + _id)}
                >
                  <i class="fas fa-eye"></i> View
                </button>
                <ul className="list-group">{showAvailArtwork(_id)}</ul>
                <div className="row mt-5">
                  {artworks.map((art) => (
                    <div className="col-md-2">
                      <div className="card">
                        <img
                          src={url + "/uploads/" + art.image}
                          className="card-img-top"
                          alt=""
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      );
    }
  };

  const userForm = {
    title: "",
    theme: "",
    thumbnail: "",
    ticketprice: 0,
    createdBy: currentUser._id,
    createdAt: new Date(),
  };

  const userSubmit = (formdata) => {
    formdata.thumbnail = selImage;
    console.log(formdata);

    fetch(url + "/exhibition/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "Exhibition Added!!",
          });
          fetchData();
        });
      }
    });
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setSelImage(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch(url + "/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Image Uploaded!!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    });
  };

  const exhibitionAddForm = () => {
    return (
      <Formik initialValues={userForm} onSubmit={userSubmit}>
        {({ values, handleSubmit, handleChange, errors, touched }) => (
          <div className="card">
            <div className="card-header">
              <h3>Add New Artwork Here</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="standard"
                  className="mt-4 w-100"
                  label="Title"
                  id="title"
                  onChange={handleChange}
                  value={values.title}
                />
                <TextField
                  variant="standard"
                  className="mt-4 w-100"
                  label="Ticket Price"
                  id="ticketprice"
                  onChange={handleChange}
                  value={values.ticketprice}
                />

                <input
                  type="file"
                  className="mt-4 form-control"
                  onChange={uploadFile}
                />

                <Button
                  type="submit"
                  variant="outlined"
                  className="float-end mt-5"
                >
                  Add Artwork
                </Button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    );
  };

  return (
    <div
      style={{
        height: "100vh",
        padding: "2rem",
        background:
          "linear-gradient(to right, #fff3, #fff3), url(https://wallpaperaccess.com/full/3899650.jpg)",
      }}
    >
      <div className="card">
        <div className="card-body">
          {addNew ? (
            exhibitionAddForm()
          ) : (
            <button
              className="btn btn-success btn-lg"
              onClick={(e) => setAddNew(true)}
            >
              {" "}
              <i class="fa fa-plus-circle" aria-hidden="true"></i> Add New
              Exhibition
            </button>
          )}
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h3>Manage Exhibitions</h3>
        </div>
        <div className="card-body">{showData()}</div>
      </div>
    </div>
  );
};

export default ManageExhibition;
