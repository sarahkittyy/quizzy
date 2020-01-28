export default interface IQuestion {
	question: string;
	answers: [string];
	createdAt: Date;
	updatedAt: Date;
	correct: [number];
}