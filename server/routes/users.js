const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save user and send response
    const use = await newUser.save();
    res.status(200).json(use._id);
  } catch (err) {
    res.status(500).json(err);
  }
});
//create login
router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("wrong username!");
    //validation
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validatePassword && res.status(400).json("wrong password!");
    //send response
    res.status(200).json({ _id: user._id, username: username });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
