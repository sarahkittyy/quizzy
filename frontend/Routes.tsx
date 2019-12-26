import React from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import Home from './App/Home';
import Error404 from './App/Error404';

export default (

<BrowserRouter>
	<Switch>
		<Route exact path="/">
			<Redirect to="/home" />
		</Route>
		<Route path="/home" component={Home} />
		<Route component={Error404} />
	</Switch>
</BrowserRouter>

);