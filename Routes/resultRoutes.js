const express = require('express');
const resultController = require('../Controller/resultController');

const router = express.Router();

router
  .route('/')
  .get(resultController.getAllResults)
  .post(resultController.createResult);

router.route('/:contestNumber/:usn').get(resultController.getResultByUsn);

router
  .route('/:contestNumber')
  .get(resultController.getResult)
  .delete(resultController.deleteResult);
module.exports = router;
