import IQuestion from './IQuestion';

export default interface IQuiz {
	_id?: string;
	authorID?: string;
	name?: string;
	questions?: [IQuestion];
}