var express = require('express');
var router = express.Router();
var gitConfig = require('../../config_git.js'); //Call in the GitHub Config

////////////
//GitHub Deployment Update Listener
//The GitHub Controller to handle app updates
////////////
var git = require('../controllers/gitHub');

//GitHub Update - Listen for new updates
router.post('/github-jfjjfdj349sshfjhjk', git.create(gitConfig).post)
//Strange link right? Well, it has to be unqiue and ensure that no one can guess it




//Push the router to the app
module.exports = router;
