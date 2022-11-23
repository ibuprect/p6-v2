const express = require("express");
const saucesRoutes = require('./route/sauce');
const userRoutes = require('./route/user');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const path = require("path");


const app = express();

require('./model/DB');



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
  });

app.use(bodyParser.json());

app.use('/api/auth',userRoutes);
app.use("/api/sauce",saucesRoutes);
app.use('/images',express.static(path.join(__dirname,'images')));

module.exports = app;
