const express = require('express');
const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

router.get('/diagram', (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "registerSucccess"
  });
});

module.exports = router;