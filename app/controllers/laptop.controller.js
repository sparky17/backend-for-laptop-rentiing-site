const db = require("../models"); // Import your model
const Laptop = db.laptops;

// Create and Save a new Laptop
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Manufacturer) {
    res.status(400).send({ message: "Manufacturer cannot be empty!" });
    return;
  }

  // Create a Laptop
  const laptop = new Laptop({
    Manufacturer: req.body.Manufacturer,
    ModelName: req.body.ModelName,
    Category: req.body.Category,
    ScreenSize: req.body.ScreenSize,
    Screen: req.body.Screen,
    CPU: req.body.CPU,
    RAM: req.body.RAM,
    Storage: req.body.Storage,
    GPU: req.body.GPU,
    OperatingSystem: req.body.OperatingSystem,
    OperatingSystemVersion: req.body.OperatingSystemVersion,
    Weight: req.body.Weight,
    PriceEuros: req.body.PriceEuros,
    image: req.body.image,
  });

  // Save Laptop in the database
  laptop
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Laptop."
      });
    });
};

// Retrieve all Laptops from the database.
exports.findAll = (req, res) => {
  const Manufacturer = req.query.Manufacturer;
  var condition = Manufacturer
    ? { Manufacturer: { $regex: new RegExp(Manufacturer), $options: "i" } }
    : {};

  Laptop.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving laptops."
      });
    });
};

// Find a single Laptop with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Laptop.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Laptop with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Laptop with id=" + id });
    });
};

// Update a Laptop by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!"
    });
  }

  const id = req.params.id;

  Laptop.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Laptop with id=${id}. Maybe Laptop was not found!`
        });
      } else res.send({ message: "Laptop was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Laptop with id=" + id
      });
    });
};

// Delete a Laptop with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Laptop.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Laptop with id=${id}. Maybe Laptop was not found!`
        });
      } else {
        res.send({
          message: "Laptop was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Laptop with id=" + id
      });
    });
};

// Delete all Laptops from the database.
exports.deleteAll = (req, res) => {
  Laptop.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Laptops were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all laptops."
      });
    });
};

// Find all published Laptops
exports.findAllPublished = (req, res) => {
  Laptop.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving laptops."
      });
    });
};
