import React, { Component } from 'react';
import { Paper, Typography, Divider, InputLabel, TextField, Grid, Button } from '@material-ui/core';
import $ from 'jquery';
import history from '../History';
import { ref as Notify } from '../Notifs';

export interface LoginProps {
};

export interface LoginState {
	username: string;
	password: string;
	invalidUsername: boolean;
	invalidPassword: boolean;
	working: boolean;
};

class Login extends Component<LoginProps, LoginState> {
	
	public constructor(props: LoginProps) {
		super(props);

		this.state = {
			username: '',
			password: '',
			invalidUsername: false,
			invalidPassword: false,
			working: false,
		};
	}
	
	public componentDidMount() {
		document.title = '-=- Login -=-';
	}
	
	private onRetry() {
		this.setState({
			...this.state,
			invalidUsername: false,
			invalidPassword: false,
			working: true,
		});
	}
	
	private login = () => {
		this.onRetry();
		$.ajax({
			method: 'POST',
			url: '/api/auth/login',
			data: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			}),
			contentType: 'application/json',
		})
		.fail(res => {
			let errors: [any] = res.responseJSON.errors;
			Notify.current.addNotification({
				message: `Could not login: ${errors[0]}`,
				level: 'error',
				position: 'tc',
				title: 'An error occured',
			})
			console.error(errors);
			if(errors.find(v => v.includes('username'))) {
				this.setState({...this.state, invalidUsername: true});
			}
			if (errors.find(v => v.includes('password'))) {
				this.setState({...this.state, invalidPassword: true});
			}
			this.setState({...this.state, working: false});
		})
		.done(res => {
			history.push('/home');
		});
	}
	
	private signup = () => {
		this.onRetry();
		$.ajax({
			method: 'POST',
			url: '/api/auth/signup',
			data: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			}),
			contentType: 'application/json',
		})
		.fail(res => {
			if (res.status === 409) {
				Notify.current.addNotification({
					level: 'warning',
					title: 'An error occured',
					message: 'That username is already taken.',
					position: 'tc',
				});
				return;
			}
			let errors: [any] = res.responseJSON.errors;
			Notify.current.addNotification({
				message: `Could not sign up: ${errors[0]}`,
				level: 'error',
				position: 'tc',
				title: 'An error occured',
			});
			if(errors.find(v => v.param === 'username')) {
				this.setState({...this.state, invalidUsername: true});
			}
			if (errors.find(v => v.param === 'password')) {
				this.setState({...this.state, invalidPassword: true});
			}
			this.setState({...this.state, working: false});
		})
		.done(res => {
			this.login();
		});
	}

	public render() {
		return <div style={{ width: '100%', position: 'fixed', top: '35%' }}>
			<Paper
				elevation={3}
				style={{width: '25%', margin: '0 auto', textAlign: 'center', padding: '15px'}}
				color="primary">
				<Typography variant="h3" component="p">Auth</Typography>
				<Divider />
				<TextField 	id="standard-basic"
							style={{marginTop: '5px'}}
							label="Username"
							variant="outlined"
							error={this.state.invalidUsername}
							onChange={e => this.setState({...this.state, username: e.target.value})}
							helperText={`Only letters, numbers, and _@!$ allowed.`}
							placeholder="username"></TextField>
				<TextField 	id="standard-out"
							style={{marginTop: '5px'}}
							type="password"
							variant="outlined"
							label="Password"
							onChange={e => this.setState({...this.state, password: e.target.value})}
							error={this.state.invalidPassword}
							helperText={`1 upper, 1 number required.`}
							placeholder="password"></TextField>
				<Divider style={{margin: '5px'}} />
				<Button
					variant="contained"
					disabled={this.state.working}
					color="secondary"
					onClick={this.signup}
					style={{marginRight: '5px'}}>
						Sign Up
				</Button>
				<Button
					variant="contained"
					disabled={this.state.working}
					color="secondary"
					onClick={this.login}>
						Login
				</Button>
			</Paper>
		</div>;
	}
};

export default Login;