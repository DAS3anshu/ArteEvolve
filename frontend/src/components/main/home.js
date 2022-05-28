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
                  <h1><b>Expand Space</b></h1>
                  <hr />
                  <p>Broaden your gallery space and showcase
                    more works of art on the 
                    walls of a virtual gallery.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <img 
                     style={{
                      height: "10rem",
                      display: "block",
                      margin: "auto",
                     }}
                     src="https://vrallart.com/icons/stakeholders/TIME.svg"
                     />
                  <h1><b>Extend Time</b></h1>
                  <hr />
                  <p>Prolong the lifespan of your 
                    exhibitions and make them 
                    accessible 24/7/365.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                <img 
                     style={{
                      height: "10rem",
                      display: "block",
                      margin: "auto",
                     }}
                     src="https://vrallart.com/icons/stakeholders/AUDIENCE.svg"
                     />
                  <h1><b>Incrase Audience</b></h1>
                  <hr />
                  <p>Reach global visitors and collectors 
                    through the VR-ALL-ART platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-outline-transparent my-5"
            onClick={(e) => navigate("/main/browse")}
          >
            SEE Exhibition Space
          </button>
        </div>

      </section>


      
      <section>
      <div className="container bg-light p-5 ">
      <div class="row">
  <div class="col-sm-6 bg-transparent w-50">
    
      
        <h2 class="h1">Virtual Reality</h2>
        <p class="p">Virtual Reality exhibitions showcase artworks in virtual spaces. 
        They are created by taking high quality scans or photographs of physical art pieces which are then curated in a virtual space using the VR-All-Art web editor.
         With the ability to edit your exhibitions, 
        you can arrange the position of artworks and change the lighting and color of the walls as needed..</p>
        
      
    
  </div>
  <div class="col-sm-6 bg-transparent w">
    
      
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        
      
    
  </div>
</div>
</div>
      </section>
      
      <section>
        <div className="container text-muted text-center">
          <h2 >MOBILITY</h2>
          <h3 className="display-6">Take your exhibition with you wherever you go</h3>
          <h4>Transform your exhibition space into a mobile gallery and take it with you when you travel</h4>
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
                    src="https://vrallart.com/icons/stakeholders/MEETINGS.svg"
                  />
                  <h4><b>Bring To Meeting</b></h4>
                  <hr />
                  <p>Show collectors your past and current 
                    exhibitions in your virtual gallery sapce.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <img 
                     style={{
                      height: "10rem",
                      display: "block",
                      margin: "auto",
                     }}
                     src="https://vrallart.com/icons/stakeholders/ARTFAIRS.svg"
                     />
                  <h4><b>Take To Art Fair</b></h4>
                  <hr />
                  <p>Present an unlimited number of artworks and 
                    exhibitions regardless of your booth size.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                <img 
                     style={{
                      height: "10rem",
                      display: "block",
                      margin: "auto",
                     }}
                     src="https://vrallart.com/icons/stakeholders/ONLINE.svg"
                     />
                  <h4><b>Share Online</b></h4>
                  <hr />
                  <p>share a link to your exhibition with anyone who has VR equipment.
                    Embed exhibition on your websites.
                  </p>
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
