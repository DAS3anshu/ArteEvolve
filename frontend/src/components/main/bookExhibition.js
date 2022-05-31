import React, { useState } from "react";
import app_config from "../../config";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      padding: "0.5rem",
      iconColor: "#c4f0ff",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const BookExhibition = () => {
  const [exhibition, setExhibition] = useState(
    JSON.parse(sessionStorage.getItem("exhibition"))
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const stripe = useStripe();
  const elements = useElements({});
  const url = app_config.backend_url;
  const navigate = useNavigate();
  const [isPaymentLoading, setPaymentLoading] = useState(false);

  const checkoutSubmit = () => {
    // console.log(values);

    fetch(url + "/exhibition/pushupdate/" + exhibition._id, {
      method: "PUT",
      body: JSON.stringify({
        users: currentUser._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Purchased successfully",
        });
        navigate("/main/browse");
      });
  };

  const getIntent = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: exhibition.ticketprice * 100 }),
    };
    return fetch(url + "/create-payment-intent", requestOptions).then(
      (response) => response.json()
    );
  };

  const payMoney = async (e) => {
    e.preventDefault();
    getIntent().then((res) => {
      console.log(res);
      let clientSecret = res.client_secret;

      completePayment(clientSecret);
    });
  };

  const completePayment = async (key) => {
    const paymentResult = await stripe.confirmCardPayment(key, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser.name,
        },
      },
    });

    setPaymentLoading(false);
    if (paymentResult.error) {
      alert();
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: paymentResult.error.message,
      });
      console.log(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        console.log(paymentResult);

        // saveOrder();
        checkoutSubmit();
      }
    }
  };

  return (
    <div className="full-page pt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <p className="text-muted h2">Exhibition Details</p>
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
                  <form onSubmit={payMoney}>
                    <CardElement className="card" options={CARD_OPTIONS} />

                    <Button
                      disabled={isPaymentLoading}
                      className="mt-5 w-100"
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      {isPaymentLoading
                        ? "Loading..."
                        : `Pay ₹${exhibition.ticketprice}/-`}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <p className="text-muted h2">User Details</p>
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
