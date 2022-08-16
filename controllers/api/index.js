const router = require('express').Router();
const userRoutes = require('./userRoutes');
const connection = require('../../config/connection');

router.use('/users', userRoutes);

module.exports = router;