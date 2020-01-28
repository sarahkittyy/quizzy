import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Grid, IconButton, Drawer, Button } from '@material-ui/core';
import { Brightness4Outlined as Sun } from '@material-ui/icons'
import ProfileButton from '../Components/ProfileButton';
import history from '../History';
import SideDrawer from '../Components/SideDrawer';
import $ from 'jquery';
import IQuiz from '../Util/IQuiz';
import QuizCard from '../Components/QuizCard';

export interface HomeProps {
	toggleTheme: () => void;
};

export interface HomeState {
	sidebarOpen: boolean;
	loggedIn: boolean;
	quizzes: IQuiz[];
};

class Home extends Component<HomeProps, HomeState> {
	public constructor(props: HomeProps) {
		super(props);
		
		this.state = {
			sidebarOpen: false,
			loggedIn: false,
			quizzes: [],
		};
	}
	
	public componentDidMount() {
		document.title = '-=- Home -=-';
		
		$.ajax({
			method: 'GET',
			url: '/api/auth/authExpires',
		}).then((res) => {
			this.setState({...this.state, loggedIn: res.authorized});
		});
		
		$.ajax({
			method: 'GET',
			url: '/api/quiz/get',
		}).then((res) => {
			this.setState({...this.state, quizzes: res});
		});
	}
	
	public render() {
		return <>
			<SideDrawer anchor="left" open={this.state.sidebarOpen} onClose={() => this.setState({...this.state, sidebarOpen: false})} />
			<AppBar position="static">
				<Toolbar>
					<Grid container justify="flex-start">
						{ this.state.loggedIn
							? <ProfileButton onClick={() => this.setState({...this.state, sidebarOpen: !this.state.sidebarOpen})} />
							: (<Button  variant="contained"
										color="secondary"
										onClick={() => history.push('/login')}>
									<Typography component="p">Login</Typography>
							   </Button>)
						}
					</Grid>
					<Grid container justify="center">

					</Grid>
					<Grid container justify="flex-end">
						<Grid item>
							<IconButton onClick={this.props.toggleTheme}><Sun style={{ fontSize: 32 }} /></IconButton>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			{ this.state.quizzes.map(quiz => {
				return <div key={quiz._id} style={{ width: '100%', margin: 'auto', alignItems: 'center' }}>
					<QuizCard
						quiz={quiz}
						deleteThis={() => {
							setTimeout(() => {
								this.setState({
									...this.state,
									quizzes: this.state.quizzes.filter(q => q._id !== quiz._id),
								});
							}, 1000);
						}}
						/>
				</div>;
			}) }
		</>;
	}
};

export default Home;