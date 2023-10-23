module.exports = app => {
    const laptops = require("../controllers/laptop.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Laptop
    router.post("/", laptops.create);
  
    // Retrieve all Laptops
    router.get("/", laptops.findAll);
  
    // Retrieve a single Laptop with id
    router.get("/:id", laptops.findOne);
  
    // Update a Laptop with id
    router.put("/:id", laptops.update);
  
    // Delete a Laptop with id
    router.delete("/:id", laptops.delete);
  
    // Delete all Laptops
    router.delete("/", laptops.deleteAll);
  
    app.use("/api/laptops", router);
  };
  