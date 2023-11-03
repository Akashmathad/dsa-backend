const express = require('express');
const dsaController = require('../Controller/dsaController');

const router = express.Router();

router
  .route('/')
  .get(dsaController.getCodeSnippits)
  .post(dsaController.createCodeSnippits);

router
  .route('/:contestNumber/:type/:language/:question')
  .patch(dsaController.updateCodeSnippits);

module.exports = router;
