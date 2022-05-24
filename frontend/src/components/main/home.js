import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#eee" }}>
      <header style={styles.header}>
        <div className="text-center text-white">
          <h1 className="display-2 fw-bold">ArtEvolve</h1>
          <h2>VR ART GALLERY</h2>
          <button
            className="btn btn-outline-light my-5"
            onClick={(e) => navigate("/main/browse")}
          >
            Explore VR Exhibitions
          </button>
        </div>
      </header>
      <section>
        <div className="container text-muted text-center">
          <h3>ADVANTAGES</h3>
          <p className="display-4">Why Exhibit in Art Gallery?</p>
          <p>Impress collectors with the immersive experience of art in VR</p>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <img
                    style={{
                      height: "10rem",
                      display: "block",
                      margin: "auto",
                    }}
                    src="https://vrallart.com/icons/stakeholders/SPACE.svg"
                  />
                  <h1>Expand Space</h1>
                  <hr />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h1>Extend Time</h1>
                  <hr />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h1>Extend Time</h1>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  header: {
    background:
      "linear-gradient(to right, #0007, #0007),url(https://vrallart.com/img/background-galleries.jpg)",
    padding: "8rem",
    backgroundAttachment: "fixed",
  },
  section: {
    padding: "0 8rem",
  },
};

export default Home;