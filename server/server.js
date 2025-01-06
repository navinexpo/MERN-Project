const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require('./routes/auth/auth-routes');  
const bodyParser = require("body-parser");
const adminProductRouter = require('./routes/admin/products-route')


//create a db connection
//create a separate file for this and then import/use that file
mongoose
  .connect("mongodb+srv://navin:Navin151@mernyt.y1rng.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter)

//To run the server
app.listen(PORT, () => console.log(`Server is now running on ${PORT}`));
