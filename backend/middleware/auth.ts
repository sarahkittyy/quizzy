import express from 'express';
import moment from 'moment';

export default function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
	let authExpires: moment.Moment = moment(req.session.authorizedUntil);
	if(authExpires > moment()) {
		req.session.authorizedUntil = authExpires.add(1, 'hour');
		return next();
	} else {
		return res.status(401).json({errors: ['You are not authorized to view this content']});
	}
}