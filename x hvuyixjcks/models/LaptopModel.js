const mongoose = require('mongoose');

// Define the schema for your data
const laptopSchema = new mongoose.Schema({
    Manufacturer: String,
    ModelName: String,
    Category: String,
    ScreenSize: String,
    Screen: String,
    CPU: String,
    RAM: String,
    Storage: String,
    GPU: String,
    OperatingSystem: String,
    OperatingSystemVersion: String,
    Weight: String,
    PriceEuros: Number,
    image: String  // Added the "image" field to store the image URL
});

// Create a model using the schema
const Laptop = mongoose.model('Laptop', laptopSchema);

// Export the model for use in your application
module.exports = Laptop;
