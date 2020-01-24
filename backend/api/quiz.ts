import express, { Request, Response } from 'express';
import Quiz from '../db/Models/Quiz';
import { check, validationResult } from 'express-validator';
import authMiddleware from '../middleware/auth';

const quiz = express.Router();

quiz.post('/new', [
	authMiddleware
], async (req: Request, res: Response) => {
	return res.send('placeholder');
});

export default quiz;