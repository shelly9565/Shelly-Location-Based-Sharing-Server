const express = require("express");
const notificationController = require("../controllers/notification");

const router = express.Router();

router.post("/send",notificationController.sendNotification);
router.post("/add",notificationController.addPushSubscriber);

module.exports = router;
