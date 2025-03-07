const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require('express')
const cors = require("cors");
const { authRoutes } = require("./routes/auth");
const { userRoutes } = require("./routes/user")
const app = express()
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler)
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, (res) =>{
        console.log('app is running on port 5000');
       })
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res, next) => {
    try {
        res.send("Project is initiated");
    } catch (err) {
        next(err);
    }
});

