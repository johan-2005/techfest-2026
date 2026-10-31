const express = require("express");
const { body, validationResult } = require("express-validator");
const Feedback = require("../models/Feedback");

const router = express.Router();

// GET all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST new feedback — validated and sanitised to prevent XSS/injection
router.post(
  "/",
  [
    body("name").trim().escape().notEmpty().withMessage("Name is required"),
    body("message")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Message is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const feedback = new Feedback({
        name: req.body.name,
        message: req.body.message,
      });
      await feedback.save();
      res.status(201).json(feedback);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
