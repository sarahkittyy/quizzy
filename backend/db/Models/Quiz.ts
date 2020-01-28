import mongoose from 'mongoose';

interface Question {
	question: string;
	answers: [string];
	createdAt: Date;
	updatedAt: Date;
	correct: [number];
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