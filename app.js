const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");


const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const notificationRoutes = require("./routes/notification");
const app = express();

mongoose.connect("mongodb://shelly:s123456@ds259111.mlab.com:59111/location-shared-based-db")
    .then(() => { console.log("Connected to database!") })
    .catch((err) => { console.log("Connection failed!") });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization, Unauthorized"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PATCH, DELETE, OPTIONS"
//     );
//     next();
// });

app.use("/api/user", userRoutes);
app.use("/api/event",eventRoutes);
app.use("/api/notification",notificationRoutes);

module.exports = app;