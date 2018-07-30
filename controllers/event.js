const Event = require("../models/event");
const ObjectId = require('mongodb').ObjectID;

exports.getEvents = (req, res, next) => {
  Event.find()
    .then(events => {
      res.status(200).json({
        message: "Events fetched successfully!",
        events: events
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching events failed!"
      });
    });
};

exports.createEvent = (req, res, next) => {
  console.log("create");
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    lat: req.body.location.lat,
    lng: req.body.location.lng,
    startDate:  req.body.startDate,
    endDate: req.body.endDate,
    creator: req.userData.userId,
    guests: null
  });
  event
    .save()
    .then(createdEvent => {
      res.status(201).json({
        message: "Event added successfully",
        event: {
          ...createdEvent,
          id: createdEvent._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating an event failed!"
      });
    });
};

exports.getEvent = (req, res, next) => {
  Event.findById(req.params.id).then(event => {
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found!" });
    }
  });
};

exports.deleteEvent = (req, res, next) => {
  console.log("delete");
  const id = req.body._id;
  Event.deleteOne({
    _id: ObjectId(id),
    creator: req.userData.userId
  }).then(result => {
    console.log('deleted:' + result);
    res.status(200).json({ message: "Deletion successful!" });
  });
};

exports.updateEvent = (req, res, next) => {
  const event = {
    id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    lat: req.body.lat,
    lng: req.body.lng,
    startDate:  req.body.startDate,
    endDate: req.body.endDate,
    creator: req.userData.userId,
    guests:  req.body.guests
  };
  // debugger;
  Event.update(
    { _id: req.params.id, creator: req.userData.userId },
    event
  ).then(result => {
    console.log(result);
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "event not updated!" });
    }
  });
};

