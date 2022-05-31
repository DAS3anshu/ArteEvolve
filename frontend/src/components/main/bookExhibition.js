import React, { useState } from "react";
import app_config from "../../config";

const BookExhibition = () => {
  const [exhibition, setExhibition] = useState(
    JSON.parse(sessionStorage.getItem("exhibition"))
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const url = app_config.backend_url;

  return (
    <div className="full-page pt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <p className="text-muted">Exhibition Details</p>
              <hr />
              <div className="row">
                <div className="col-6">
                  <img
                    src={url + "/uploads/" + exhibition.thumbnail}
                    class="img-fluid"
                    alt={exhibition.title}
                  />
                </div>
                <div className="col-6">
                  <p className="text-muted mb-0">Exhibition Name</p>
                  <h4>{exhibition.title}</h4>
                  <p className="text-muted mb-0">Theme</p>
                  <h4>{exhibition.theme}</h4>
                  <p className="text-muted mb-0">Ticket Price</p>
                  <h4 className="display-4">{exhibition.ticketprice}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <p className="text-muted">User Details</p>
              <hr />
              <p className="text-muted mb-0">Username</p>
              <h4>{currentUser.username}</h4>
              <p className="text-muted mb-0">Email Address</p>
              <h4>{currentUser.email}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookExhibition;
