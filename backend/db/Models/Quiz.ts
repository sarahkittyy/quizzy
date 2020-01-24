import mongoose from 'mongoose';

interface Question {
	question: string;
	answers: [string];
	createdAt: Date;
	updatedAt: Date;
	correct: [number];
	multi: boolean; // can the question have more than one answer?
}

interface IQuiz extends mongoose.Document {
	authorID: string;
	questions: [Question]
}

interface IQuizStatic extends mongoose.Model<IQuiz> {

}

const QuizSchema = new mongoose.Schema({
	authorID: String,
	qusetions: String,
}, { timestamps: true });

const Quiz = mongoose.model<IQuiz, IQuizStatic>('Quiz', QuizSchema);

export { QuizSchema, IQuiz };
export default Quiz;