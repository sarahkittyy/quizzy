import mongoose from 'mongoose';

mongoose.connect('mongodb://db/quizzy', err => { throw err; });

export {};