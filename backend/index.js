const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/UserModel')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3005;

console.log(process.env.MONGODB_STRING)
mongoose.connect(process.env.MONGODB_STRING)
    .then((res) => {
        console.log(`server Runnning in ${port}`)

    })
    .catch((err) => {
        console.log("Unable To Connect With Database");
    })
