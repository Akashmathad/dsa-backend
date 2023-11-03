const express = require('express');
const profileController = require('../Controller/profileController');
const resultController = require('../Controller/resultController');

const router = express.Router();

router.route('/').post(profileController.createProfile);

router
  .route('/:contestNumber/:usn')
  .patch(
    profileController.updateAptitudeProfile,
    resultController.updateAptitudeResult
  );

module.exports = router;
