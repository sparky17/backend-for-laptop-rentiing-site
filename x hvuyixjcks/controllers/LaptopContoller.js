// Import necessary modules and the Laptop model
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Laptop = require('../models/LaptopModel');

// Controller functions
const index = async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.json({ response: laptops });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching laptop details" });
  }
}

const show = async (req, res, next) => {
  try {
    const _id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const laptop = await Laptop.findById(_id);

    if (!laptop) {
      return res.status(404).json({ message: 'Laptop not found' });
    }

    res.json({ response: laptop });
  } catch (error) {
    next(error);
  }
};

const store = async (req, res, next) => {
  try {
    const {
      Manufacturer,
      ModelName,
      Category,
      ScreenSize,
      Screen,
      CPU,
      RAM,
      Storage,
      GPU,
      OperatingSystem,
      OperatingSystemVersion,
      Weight,
      image,
      PriceEuros
    } = req.body;

    // Convert the PriceEuros to a valid number by replacing commas with periods
    const price = parseFloat(PriceEuros.replace(',', '.'));

    const laptop = new Laptop({
      Manufacturer,
      ModelName,
      Category,
      ScreenSize,
      Screen,
      CPU,
      RAM,
      Storage,
      GPU,
      OperatingSystem,
      OperatingSystemVersion,
      Weight,
      image,
      PriceEuros: price  // Assign the converted price to the schema field
    });

    await laptop.save(); // Save the new laptop document
    res.json({ message: "New laptop added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding a new laptop" });
  }
}


const update = async (req, res, next) => {
  const { _id, Manufacturer, ModelName, Category, ScreenSize, Screen, CPU, RAM, Storage, GPU, OperatingSystem, OperatingSystemVersion, Weight, PriceEuros, image } = req.body;
  try {
    const updatedData = { Manufacturer, ModelName, Category, ScreenSize, Screen, CPU, RAM, Storage, GPU, OperatingSystem, OperatingSystemVersion, Weight, PriceEuros, image };
    await Laptop.findByIdAndUpdate(_id, { $set: updatedData });
    res.json({ message: "Laptop detail updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating laptop details" });
  }
}

const destroy = async (req, res, next) => {
  const { _id } = req.params;
  try {
    await Laptop.findByIdAndRemove(_id);
    res.json({ message: "Laptop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the laptop" });
  }
}

// Define routes
router.get('/', index);
router.get('/show/:id', show);
router.post('/store', store);
router.put('/update', update);
router.delete('/delete/:id', destroy);

module.exports = router;
