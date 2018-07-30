const express = require("express");
const eventController = require("../controllers/event");
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get("", eventController.getEvents);

router.get("/:id", eventController.getEvent);

router.post("/createevent" , checkAuth, eventController.createEvent);

router.put("/:id", checkAuth, eventController.updateEvent);

router.delete("/:id", checkAuth, eventController.deleteEvent);

module.exports = router;
