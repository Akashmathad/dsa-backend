const express = require('express');
const leaderShipController = require('../Controller/leaderShipController');

const router = express.Router();

router.route('/').get(leaderShipController.getLeaderShip);

module.exports = router;
