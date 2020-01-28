import express, { Request, Response } from 'express';
import Quiz from '../db/Models/Quiz';
import { check, validationResult } from 'express-validator';
import authMiddleware from '../middleware/auth';
import { isArray } from 'util';

const quiz = express.Router();

quiz.post('/new', [
	authMiddleware,
	check('questions').custom(qs => {
		if (!isArray(qs)) throw 'questions param is not an array';
		qs.forEach(q => {
			if(!q.question) throw 'no question provided';
			if(!isArray(q.answers) ||
			   q.answers.length < 1) throw 'not enough answers provided';
			if(!q.correct ||
				q.correct.length < 1) throw 'no correct answer provided';
		});
	}),
], async (req: Request, res: Response) => {
	return res.send('placeholder');
});

export default quiz;