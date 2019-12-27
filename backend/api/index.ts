import express, { Request, Response } from 'express';
import '../db/init';
import mongoose from 'mongoose';
import User from '../db/Models/User';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth';

const api = express.Router();

api.get('/', (req, res) => {
	res.send('owo');
});

api.post('/signup', [
	check('username').matches(/^[A-Za-z0-9_ @!$]{3,}$/),
	check('password').isLength({min: 5}).matches(/[A-Z]/).matches(/[a-z]/).matches(/[0-9]/),
], async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(422).json({errors: errors.array()});
	}
	
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

export default api;