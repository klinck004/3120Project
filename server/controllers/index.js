let express = require('express');
let router = express.Router();

console.log("Index controller loaded!"); /* for dev peace of mind */
module.exports.displayHP = (req, res, next) => {
    res.render('index', {
        title: 'Home'
    });
};

module.exports.displayErr = (err, req, res, next) => {
    res.render('error', {
        error: err
    });
};