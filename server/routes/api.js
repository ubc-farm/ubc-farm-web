/*
**Author: Xingyu Tao
**Last Updated: 5-15-2017
**Comments: 
**	handles routing requests
*/

const express = require('express');
const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

module.exports = router;