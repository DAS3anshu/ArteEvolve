import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TicketAuthorisor = ({ children, exhibition }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  console.log(currentUser);

  if (currentUser === null) {
    Swal.fire({
      icon: "info",
      title: "OOops!!",
      text: "You need to be logged in",
    });
    return <Navigate to="/main/login" />;
  } else if (!exhibition.users.includes(currentUser._id)) {
    Swal.fire({
      icon: "info",
      title: "Wait!!",
      text: "You don't have Access to this Exhibition",
    });
    return <Navigate to="/main/browse" />;
  }

  return children;
};

export default TicketAuthorisor;
