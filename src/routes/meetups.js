const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send([
    'meetup 1',
    'meetup 2',
  ]);
});

module.exports = router;
