var express = require('express');

var router = express.Router();

router.get('/person', (req, res) => {
    res.send('You have requested a person');
});

module.exports = router;