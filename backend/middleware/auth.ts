import express from 'express';

export default function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
	return next();
}