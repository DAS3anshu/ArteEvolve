import { Search } from "@mui/icons-material";
import { Button, InputAdornment, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import app_config from "../../config";
import TimeAgo from "javascript-time-ago";
import Swal from "sweetalert2";

const BrowseExhibition = () => {
  const [datalist, setDatalist] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = app_config.backend_url;
  const navigate = useNavigate();
  const timeAgo = new TimeAgo("en-US");

  const categories = [
    "Abstract",
    "Business",
    "Computers",
    "Education",
    "Sports",
    "Timeline",
    "RealState",
    "Food",
    "Cycle",
    "Abstract",
    "Religion",
  ];

  const fetchData = () => {
    fetch(url + "/exhibition/getall").then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setDatalist(data);
          setLoading(false);
        });
      }
    });
  };

  const [filter, setFilter] = useState("");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  useEffect(() => {
    fetchData();
  }, []);

  const checkAdded = (users) => {
    if (currentUser === null) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You need to login first",
      });
      return;
    }
    return users.includes(currentUser._id);
  };

  const displayData = () => {
    if (!loading) {
      return datalist.map(
        ({
          title,
          theme,
          createdBy,
          artworks,
          thumbnail,
          createdAt,
          _id,
          ticketprice,
          users,
        }) => (
          <div key={_id} class="col-md-12 col-lg-4 mb-4 mb-lg-0">
            <div class="card mt-5">
              <div
                className="crop-div"
                style={{
                  background: "url(" + url + "/uploads/" + thumbnail + ")",
                }}
              ></div>

              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <p class="small">
                    <a href="#!" class="text-muted">
                      {theme}
                    </a>
                  </p>
                </div>
                <h4 class="mb-0">{title}</h4>
                <h5 class="mb-0">{createdBy.email}</h5>
                <p className="text-muted float-end">
                  {timeAgo.format(new Date(createdAt))}
                </p>
                <div className="mt-5"></div>
                {!checkAdded(users) ? (
                  <button
                    className="btn btn-success"
                    onClick={(e) => {
                      sessionStorage.setItem(
                        "exhibition",
                        JSON.stringify({
                          title,
                          theme,
                          createdBy,
                          artworks,
                          thumbnail,
                          createdAt,
                          _id,
                          ticketprice,
                          users,
                        })
                      );
                      navigate("/main/book");
                    }}
                  >
                    Book Now
                  </button>
                ) : (
                  <button className="btn btn-success" disabled>
                    Already Purchased
                  </button>
                )}
                &nbsp;&nbsp;
                {checkAdded(users) ? (
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      navigate("/main/exhibition/" + _id);
                    }}
                  >
                    Open Exhibition
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        )
      );
    }
  };

  const applyfilter = () => {
    fetch(url + "/exhibition/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const filtered = data.filter(({ title }) => {
          return title.toLowerCase().includes(filter.toLowerCase());
        });
        console.log(filtered);
        setDatalist(filtered);
        setLoading(false);
      });
  };

  const applyCategoryfilter = (cate) => {
    fetch(url + "/exhibition/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const filtered = data.filter(({ category }) => {
          return category.toLowerCase().includes(cate.toLowerCase());
        });
        console.log(filtered);
        setDatalist(filtered);
        setLoading(false);
      });
  };

  return (
    <div style={{ background: "#eee" }}>
      <header style={styles.header}>
        <div className="container">
          <Typography className="text-center text-white" variant="h5">
            Art Evolve
          </Typography>
          <Typography className="text-center text-white fw-bold" variant="h1">
            VR ART EXHIBITION
          </Typography>

          {/* <div className="input-group mt-5">
            <input
              className="form-control"
              value={filter}
              label="Search Here"
              onChange={(e) => setFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "active.active", mr: 1, my: 0.5 }} />
                  </InputAdornment>
                ),
              }}
            />
            <button
              className="btn btn-primary"
              onClick={applyfilter}
              type="submit"
            >
              Search
            </button>
          </div> */}
          {/* <div className="categories">
            <div className="row justify-content-center">
              {categories.map((cate) => (
                <div className="col-sm-4 col-md-2 mt-4 text-center mx-auto">
                  <button
                    className="btn btn-outline-light btn-rounded"
                    onClick={(e) => applyCategoryfilter(cate)}
                  >
                    {cate}
                  </button>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </header>
      <div className="container">
        <div className="row">{displayData()}</div>
        {/* <nav aria-label="">
          <ul class="pagination justify-content-center my-5">
            <li class="page-item disabled">
              <a class="page-link">Previous</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item active" aria-current="page">
              <a class="page-link" href="#">
                2 <span class="visually-hidden">(current)</span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav> */}
      </div>
    </div>
  );
};

const styles = {
  header: {
    background:
      "linear-gradient(to right, #2a002dc4, #2a002dc4), url(https://i1.wp.com/veer.tv/blog/wp-content/uploads/2017/08/virtual-reality-of-gallery.jpg?resize=600%2C398)",
    padding: "3rem",
    textShadow: "2px 2px 3px #0000005c",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

export default BrowseExhibition;
