import mongoose from 'mongoose';

mongoose.connect('mongodb://db/quizzy', {useNewUrlParser: true, useFindAndModify: false}, function (err) {
	if (err) {
		console.error('Couldn\'t connect to mongodb server');
	} else {
		console.log('Connected to server successfully');
	}
});

export {};