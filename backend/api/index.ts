import express from 'express';
import '../db/init';
import mongoose from 'mongoose';

const api = express.Router();

api.get('/', (req, res) => {
	res.send('owo');
});

export default api;