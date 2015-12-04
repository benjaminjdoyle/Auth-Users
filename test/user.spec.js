"use strict";
let should = require('should');
let request = require('supertest');
let app = require('../server');
let mongoose = require('mongoose');
let User = mongoose.model('User')

describe('User Routes', () => {
	describe('Registration', () => {
		it('Should let me create a new user', (done) => {
			request(app)
				.post('/api/v1/users/register')
				.send({ email: 'test@fake.com', password: 'secret' })
				.expect(200)
				.end(done);

		});
		it('Should create the user', (done) => {
			User.findOne({ 'local.email': 'test@fake.com'}, (err, result) => {
				should.equal(err, null);
				should.exist(result);
				should.equal(result.local.email, 'test@fake.com');
				result.local.password.should.not.equal('secret');
				done();
			});
		});
	});//End of Register
	describe('Login', () => {
		it('Should let me log in', (done) => {
			request(app)
				.post('.api/v1/users/login')
				.send({ email: 'test@fake.com', password: 'secret'})
				.expect(200)
				.end(done)
		});
	});
});