'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let Post = mongoose.model('Post');
let User = mongoose.model('User');
let jwt = require('express-jwt');
let auth = jwt({
	userProperty: 'payload',
	secret: 'secret'
});

//GET all posts
router.get('/', (req, res, next) => {
	Post.find({})
		.populate('createdBy', 'local.email')
		.exec((err, result) => {
			if(err) return next(err);
			res.send(result);
		});
});

//GET posts associated with a specific profile
router.get('/profile', auth, (req, res, next) => {
	Post.find({ createdBy: req.payload._id }).exec((err, posts) => {
		if(err) return next(err);
		res.send(posts);
	});
});

//POST api/v1/posts
router.post('/', auth, (req, res, next) => {
  // user ID is: req.payload._id
	let post = new Post(req.body);
	post.createdBy = req.payload._id;
	post.save((err, result) => {
		if(err) return next(err);
		if(!result) return next(`Couldn't create result`);
		User.update({ _id: req.payload._id }, { $push: { posts: result._id }}, (err, user) => {
			if(err) return next(err);
			if(!user) return next(`Could not push post into user`);
			res.send(result);
		});
	});
});

router.use((err, req, res) => {
  console.log(err);
  res.status(500).send(err);
});

module.exports = router;