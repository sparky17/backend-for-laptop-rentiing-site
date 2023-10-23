
const express = require('express');

const router= express.Router()

const LaptopController = require('../controllers/LaptopContoller')

router.get('/', LaptopController.index);
router.post('/show/:id', LaptopController.show);
router.post('/store', LaptopController.store);
router.put('/update', LaptopController.update); // Change this to a PUT request
router.delete('/delete/:id', LaptopController.destroy); // Add the :id parameter

module.exports = router;
