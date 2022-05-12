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

app.use("/artwork",ArtworkRouter);
app.use("/exhibition",ExhibitionRouter);


// starting the server
app.listen(port, () => {
  console.log("server started on 5000");
});