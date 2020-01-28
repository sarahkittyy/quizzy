import IQuestion from './IQuestion';

export default interface IQuiz {
	authorID?: string;
	name?: string;
	questions?: [IQuestion];
}