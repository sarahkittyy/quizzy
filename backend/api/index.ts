import express, { Request, Response } from 'express';
import '../db/init';
import auth from './auth';
import authMiddleware from '../middleware/auth';
import User from '../db/Models/User';

const api = express.Router();

// Authentication endpoint
api.use('/auth', auth);

/**
 * @brief Retrieves a list of all users.
 */
api.get('/users', authMiddleware, async (req: Request, res: Response) => {
	return res.send(await User.find({}, 'username password createdAt'));
});


/**
 * @brief Fallback endpoint
 */
api.all('*', (req, res) => {
	res.status(404).json({errors: ['API endpoint not found.']});
});

export default api;