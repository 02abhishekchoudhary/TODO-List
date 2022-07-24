const express = require('express');
const router = express.Router();

//import actions controller from path to use required controller
const actionController = require('../controllers/actions_controller');

//Middlewaare to decode data coming from browser
router.use(express.urlencoded({extended: true}));

//this will handle the requests coming to /action/create-task and execute create function from actions_controller.js
router.post('/create-task', actionController.create);

//this will handle the requests coming to /action/delete-task and execute delete function from actions_controller.js
router.post('/delete-tasks', actionController.delete);

module.exports = router;