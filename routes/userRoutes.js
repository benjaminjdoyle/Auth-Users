'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let User = mongoose.model('User');

router.post('/register', (req, res, next) => {
	if(!req.body.email || !req.body.password) return next('Please include an email and password');
	let user = new User();
	user.local.email = req.body.email;

	user.CreateHash(req.body.password, (err, hash) => {
		if(err) return next(err);
		user.local.password = hash;
	
		user.save((err, result) => {
			console.log(err);
			if(err) return next(err);
			if(!result) return next('could not create user');
			res.send(result);
		});	
	});
});

router.post('/login', (req, res, next) => {
	console.log('hello world');
	passport.authenticate('local', (err, user) => {
		if(err) return next(err);
		res.send('Success');
	})(req, res, next);
});

module.exports = router;