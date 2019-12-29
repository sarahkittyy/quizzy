import express, { Request, Response } from 'express';
import '../db/init';
import mongoose from 'mongoose';
import User, { UserSchema } from '../db/Models/User';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth';
import moment from 'moment';

const api = express.Router();

api.get('/', (req, res) => {
	res.send('owo');
});

api.post('/signup', [
	check('username').matches(/^[A-Za-z0-9_ @!$]{3,}$/),
	check('password').isLength({min: 5}).matches(/[A-Z]/).matches(/[a-z]/).matches(/[0-9]/),
], async (req: Request, res: Response) => {
	// validate request
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(422).json({errors: errors.array()});
	}
	
	// create the user model
	let user = new User;
	user.username = req.body.username;
	user.setPassword(req.body.password);
	if(await user.taken()) {
		return res.status(409).json({errors: ['The username is already taken']});
	}
	user.save();

	return res.json({success: true});
});

api.get('/users', auth, async (req: Request, res: Response) => {
	return res.send(await User.find({}, 'username createdAt'));
});

api.get('/authExpires', async (req: Request, res: Response) => {	
	if(!req.session.authorizedUntil) {
		return res.json({authorized: false, for: undefined});
	}
	
	let expires: moment.Moment = moment(req.session.authorizedUntil);
	return res.json({authorized: expires > moment(), for: expires.fromNow()});
});

api.get('/login', [
	check('username'),
	check('password'),
], async (req: Request, res: Response) => {
	// ignore if already logged in
	if(req.session.authorizedUntil && moment(req.session.authorizedUntil) > moment()) {
		return res.status(200).json({success: true});
	}
	
	// validate req
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(422).json({errors: errors.array()});
	}

	let { username, password } = req.body;
	
	let validated = await User.validate(username, password);
	if(validated) {
		req.session.authorizedUntil = moment().add(1, 'week').valueOf();
		return res.json({success: true});
	} else {
		return res.status(401).json({errors: ['Invalid username or password']});
	}
});

api.get('/logout', async (req: Request, res: Response) => {
	req.session.authorizedUntil = null;
	return res.json({errors: []});
});

export default api;