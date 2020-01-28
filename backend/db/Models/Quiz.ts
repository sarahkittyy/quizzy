import mongoose from 'mongoose';
import Question, { QuestionSchema, IQuestion } from './Question';

interface IQuiz extends mongoose.Document {
	authorID: string;
	questions: [IQuestion]
}

interface IQuizStatic extends mongoose.Model<IQuiz> {

}

const QuizSchema = new mongoose.Schema({
	authorID: String,
	questions: [Question],
}, { timestamps: true });

const Quiz = mongoose.model<IQuiz, IQuizStatic>('Quiz', QuizSchema);

export { QuizSchema, IQuiz };
export default Quiz;