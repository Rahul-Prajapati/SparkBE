const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/about_yourself", async (req, res, next) => {
    try {
        console.log("Backend is started");
        const {userId, username, selectedCategory } = req.body;
        console.log(req.body);
        console.log(userId, username, selectedCategory);

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const existingUser = await userModel.findOne({ username });
        if (existingUser && existingUser._id.toString() !== userId ) return res.status(400).json({ message: "Username already exists" });

        user.username = username;
        user.category = selectedCategory;
        await user.save();

        res.status(201).json({ message: "Username and category saved", user: user });
    }
    catch (err) {
        next(err);
    }
});


// get function for settings
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // 🛑 Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // 🔍 Fetch only selected fields
    const user = await userModel.findById(userId).select("firstName lastName email");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.put("/profile_update/:userId", async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.userId);
    const { firstname, lastname, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    req.body.password = hashedPassword;

    const updatedUser = await userModel.findByIdAndUpdate(req.params.userId, req.body, { new: true });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// updateUserProfile funvr
router.put("/:userId", async (req, res) => {
    console.log(req.body);
    console.log(req.params.userId);
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.userId,
         req.body, // Updates only provided fields { $set: req.body }
        { new: true }
      );
      res.status(201).json({message: "Data is updated", updatedUser : updatedUser});
    } catch (error) {
        console.error("MongoDB Update Error:", error); // Log the actual error
        res.status(500).json({ error: "Error updating profile", details: error.message });
    //   res.status(500).json({ error: "Error updating profile" });
    }
  });



module.exports = { userRoutes: router };