const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const jwtSecret = "mynameissyedhuzaifanawazsyedhuzaifa";

router.post(
  "/createuser",
  [
    body("username").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password", "empty password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        username: req.body.username,
        location: req.body.location,
        password: secPassword,
        email: req.body.email,
      });
      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error: error.message });
    }
  }
);
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "empty password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: "user not found" });
      }
      const pwdCompare = bcrypt.compare(req.body.password, userData.password);
      if (!pwdCompare) {
        return res.status(400).json({ errors: "password doesn't match" });
      } else {
        const data = {
          user: {
            id: userData.id,
          },
        };
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, error: error.message });
    }
  }
);
module.exports = router;
