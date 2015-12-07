'use strict';
let mongoose = require('mongoose');
let PostSchema = new mongoose.Schema({
	message: String,
	dateCreated: { type: Date, default: Date.now},
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});





module.exports = mongoose.model('Post', PostSchema);
    