import mongoose from 'mongoose';

interface IQuestion extends mongoose.Document {
	question: string;
	answers: [string];
	createdAt: Date;
	updatedAt: Date;
	correct: [number];
}

interface IQuestionStatic extends mongoose.Model<IQuestion> {

}

const QuestionSchema = new mongoose.Schema({
	question: String,
	answers: [String],
	correct: [Number],
});

const Question = mongoose.model<IQuestion, IQuestionStatic>('Question', QuestionSchema);

export { QuestionSchema, IQuestion };
export default Question;