const express = require("express");
const { body, validationResult } = require("express-validator");
const Event = require("../models/Event");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all events (public)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST create event (protected)
router.post(
  "/",
  auth,
  [
    body("title").trim().notEmpty(),
    body("description").trim().notEmpty(),
    body("date").isISO8601(),
    body("venue").trim().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const event = new Event(req.body);
      await event.save();
      res.status(201).json(event);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
