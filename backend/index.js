const express = require('express'); // Framework for building web applications in Node.js.
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/UserModel');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3005;

// Print the MongoDB connection string for debugging.
console.log(process.env.MONGODB_STRING);

// Connect to MongoDB.
mongoose.connect(process.env.MONGODB_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Server running on port ${port}`);
    })
    .catch(err => {
        console.log("Unable to connect to the database", err);
    });

// Endpoint to create a new user.
app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json({ error: err.message }));
});

// Endpoint to get all users.
app.get("/", (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json({ error: err.message }));
});

// Endpoint to get a user by ID.
app.get("/getUser/:id", (req, res) => {
    let userId = req.params.id;
    UserModel.findById(userId)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        })
        .catch(err => res.json({ error: err.message }));
});

// Endpoint to update a user by ID.
app.put("/updateUser/:id", (req, res) => {
    let userId = req.params.id;
    UserModel.findByIdAndUpdate(
        userId,
        {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        },
        { new: true } // Ensures the updated document is returned.
    )
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        })
        .catch(err => res.json({ error: err.message }));
});

// Endpoint to delete a user by ID.
app.delete("/deleteUser/:id", (req, res) => {
    let userId = req.params.id;
    UserModel.findByIdAndDelete(userId)
        .then(user => {
            if (user) {
                res.json({ message: "User deleted successfully" });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        })
        .catch(err => res.json({ error: err.message }));
});

// Start the server.
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
