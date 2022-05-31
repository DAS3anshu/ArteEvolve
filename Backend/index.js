// importing express
const express = require("express");
const UserRouter = require("./routers/UserRouter");
const ArtworkRouter = require("./routers/ArtworkRouter");
const ExhibitionRouter = require("./routers/ExhibitionRouter");
const utilRouter = require("./routers/util");
const cors = require("cors");

// initialize express
const app = express();

// defining port
const port = 5000;

// for reading json data
app.use(express.json());

// for allowing frontrend
app.use(cors({ origin: ["http://localhost:3000"] }));

// middleware
app.use("/user", UserRouter);
app.use("/util", utilRouter);

app.use("/artwork", ArtworkRouter);
app.use("/exhibition", ExhibitionRouter);

const stripe_sk =
  "sk_test_51L5OraSBJsajMKdgRnznDqHsp2wTH24h7N7oUvK9Od1xcr5ab81c24TTVa51JbVCvR13Qbls3qvw9UtsbPHoboVo00fXiUvnjt";
const stripe = require("stripe")(stripe_sk);

app.post("/create-payment-intent", async (req, res) => {
  const data = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.amount,
    currency: "inr",
  });
  res.status(200).json(paymentIntent);
});

app.use(express.static("./static"));

// starting the server
app.listen(port, () => {
  console.log("server started on 5000");
});
