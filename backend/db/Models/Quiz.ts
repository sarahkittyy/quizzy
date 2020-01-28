import mongoose from 'mongoose';
import Question, { QuestionSchema, IQuestion } from './Question';
import User from './User';

interface IQuiz extends mongoose.Document {
	authorID: string;
	name: string;
	questions: [IQuestion]
	canDelete(id: string): Promise<boolean>;
}

interface IQuizStatic extends mongoose.Model<IQuiz> {

}

const QuizSchema = new mongoose.Schema({
	authorID: String,
	name: String,
	questions: [QuestionSchema],
}, { timestamps: true });

QuizSchema.method('canDelete', async function (id: string): Promise<boolean> {
	if(this.authorID === id) { return true; }
	
	let user = await User.findById(id, 'permissions');
	if (user.hasPermissions('admin')) return true;
	
	return false;
});

const Quiz = mongoose.model<IQuiz, IQuizStatic>('Quiz', QuizSchema);

export { QuizSchema, IQuiz };
export default Quiz;