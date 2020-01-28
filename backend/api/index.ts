import express, { Request, Response } from 'express';
import '../db/init';
import auth from './auth';
import quiz from './quiz';
import authMiddleware from '../middleware/auth';
import User from '../db/Models/User';

const api = express.Router();

// Authentication endpoint
api.use('/auth', auth);
api.use('/quiz', quiz);

/**
 * @brief Retrieves a list of all users.
 */
api.get('/users', async (req: Request, res: Response) => {
	if(req.query.id) {
		return res.send(await User.findById(req.query.id, 'username permissions createdAt'));
	}
	else {
		return res.send(await User.find({}, 'username permissions createdAt'));
	}
});

/**
 * @brief Fallback endpoint
 */
api.all('*', (req, res) => {
	res.status(404).json({errors: ['API endpoint not found.']});
});

export default api;