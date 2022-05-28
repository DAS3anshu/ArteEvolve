import { Card, CardContent, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import app_config from "../../config";

const ManageArtworks = () => {
  const url = app_config.backend_url;
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [artworkList, setArtworkList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    fetch(url + "/artwork/getbyuser/" + currentUser._id).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setArtworkList(data);
          setLoading(false);
        });
      }
    });
  };

  const deleteData = (id) => {
    fetch(url + "/artwork/delete/" + id, { method: "DELETE" })
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

  useEffect(() => {
    fetchData();
  }, []);

  const showData = () => {
    if (!loading) {
      return artworkList.map(
        ({ _id, title, image, description, price, createdAt }) => (
          <div className="col-md-3">
            <Card>
              <CardMedia
                component="img"
                image={url + "/uploads/" + image}
                alt={title}
                height="300"
              />
              <CardContent className="card-body">
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
              </CardContent>
            </Card>
          </div>
        )
      );
    }
  };

  const addFile = (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("myfile", file);

    fetch(url + "/util/uploadfile", {
      method: "POST",
      body: formdata,
    }).then((res) => {
      if (res.status === 200) {
        fetch(url + "/artwork/add", {
          method: "POST",
          body: {
            file: file.name,
            createdBy: currentUser._id,
            createdAt: new Date(),
          },
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.status === 200) {
            console.log("asset added");
          }
        });
      }
    });
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
      <div className="container">
        <h1 className="text-white">Manage Artworks</h1>
        <hr />
        <div className="row">{showData()}</div>;
      </div>
    </div>
  );
};

export default ManageArtworks;
