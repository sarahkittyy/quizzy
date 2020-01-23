import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './App/Home';
import Error404 from './App/Error404';
import Login from './App/Login';
import history from './History';
import NotificationSystem from 'react-notification-system';

export interface RoutesProps {
	toggleTheme: () => void;	
};

export default (props: RoutesProps) => {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/">
					<Redirect to="/home" />
				</Route>
				<Route path="/home" render={() => <Home toggleTheme={props.toggleTheme} />} />
				<Route path="/login" render={() => <Login />} />
				<Route component={Error404} />
			</Switch>
		</Router>
	);

};