import express, { Request, Response } from 'express';
import Quiz, { IQuiz } from '../db/Models/Quiz';
import Question, { IQuestion } from '../db/Models/Question';
import { check, validationResult } from 'express-validator';
import authMiddleware from '../middleware/auth';
import { isArray } from 'util';

const quiz = express.Router();

/**
 * @brief Post a new quiz
 */
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
		return true;
	}),
	check('name').isString()
], async (req: Request, res: Response) => {
	//* Validate input
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	}
	
	const quiz = new Quiz;
	let questions: [IQuestion] = req.body.questions;
	questions.forEach(q => {
		const question = new Question;
		question.question = q.question;
		question.answers = q.answers;
		question.correct = q.correct;
		quiz.questions.push(question);
	});
	quiz.authorID = req.session.userID;
	quiz.name = req.body.name;
	quiz.save();
	
	return res.json({success: true});
});

/**
 * @brief Retrieve a list of all quizzes.
 */
quiz.get('/get', async (req: Request, res: Response) => {
	return res.send(await Quiz.find({}));
});

/**
 * @brief Delete a quiz from the server.
 */
quiz.delete('/delete', [
	check('id').isString()
], async (req: Request, res: Response) => {
	//* Check validator
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	
	let success = await Quiz.deleteOne({ _id: req.body.id });
	if (success.deletedCount === 0) {
		return res.status(404).json({ errors: ['Quiz not found.']});
	}
	else {
		return res.status(200).json({ success: true });
	}
});

export default quiz;