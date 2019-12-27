import express from 'express';
require('dotenv').config();
import appRoot from 'app-root-path';
import api from './api';
import session from 'express-session';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
	secret: process.env.SECRET
}));

app.use('/public', express.static(appRoot.resolve('public')));
app.use('/api', api);
app.get('/bundle.js', (req, res) => {
	res.sendFile(appRoot.resolve('build/frontend/bundle.js'));
});

app.get('/*', (req, res) => {
	res.sendFile(appRoot.resolve('public/index.html'));
});

app.listen(process.env.API_PORT, () => {
	console.log('Listening on port ' + process.env.API_PORT + '!');
});