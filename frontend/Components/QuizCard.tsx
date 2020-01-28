import React, { Component } from 'react';
import history from '../History';
import { Card, Paper, Typography, IconButton } from '@material-ui/core';
import IQuestion from '../Util/IQuestion';
import IQuiz from '../Util/IQuiz';
import { createStyles, withStyles } from '@material-ui/styles';
import $ from 'jquery';
import { Delete } from '@material-ui/icons';
import { ref as Notify } from '../Notifs';

export interface QuizCardState {
	elevation: number;
	point: boolean;
	author: string;
	canDelete: boolean;
	hovering: boolean;
	fadingOut: boolean;
}

export interface QuizCardProps {
	quiz: IQuiz;
	classes: {
		paper: string;
		cursorSelect: string;
		cursorDefault: string;
		fadeOut: string;
	},
	deleteThis(): void;
}

const styles = createStyles({
	paper: {
		justifyContent: 'center',
		width: '25%',
		margin: '20px auto',
	},
	cursorSelect: {
		cursor: 'pointer',
	},
	cursorDefault: {
		cursor: 'default',	
	},
	fadeOut: {
		transition: 'opacity 1s',
		opacity: '0',
	},
});

class QuizCard extends Component<QuizCardProps, QuizCardState> {
	styles: any;
	
	public constructor(props: QuizCardProps) {
		super(props);
		
		this.state = {
			elevation: 3,
			point: false,
			author: 'Loading...',
			canDelete: false,
			hovering: false,
			fadingOut: false,
		};
	}
	
	public componentDidMount() {
		$.ajax({
			url: '/api/users?id=' + encodeURIComponent(this.props.quiz.authorID),
			method: 'GET',
			dataType: 'json',
		})
		.then(res => {
			this.setState({...this.state, author: res.username});
		});
		
		$.ajax({
			url: '/api/quiz/canDelete?id=' + encodeURIComponent(this.props.quiz._id),
			method: 'GET',
			dataType: 'json',
		})
		.then(res => {
			this.setState({
				...this.state,
				canDelete: res.allowed
			});
		});
	}
	
	private onMouseOver = () => {
		this.setState({...this.state, elevation: 1, point: true});
	};
	
	private onMouseLeave = () => {
		this.setState({...this.state, elevation: 3, point: false});
	};
	
	private onClick = () => {
		history.push(`/quiz/${this.props.quiz._id}`);
	};
	
	private delete = () => {
		$.ajax({
			method: 'DELETE',
			url: '/api/quiz/delete?id=' + encodeURIComponent(this.props.quiz._id),
			dataType: 'json',
		})
		.fail(res => {
			let errors = res.responseJSON.errors;
			Notify.current.addNotification({
				level: 'error',
				title: 'An error occured',
				message: `Couldn't delete quiz: ${errors[0]}`,
				position: 'br',
			});
			console.error(errors);
		})
		.then(res => {
			this.setState({
				...this.state,
				fadingOut: true,
			});
			this.props.deleteThis();
		});
	};
	
	public render() {
		const { classes } = this.props;
		
		return (
			<Paper
				elevation={this.state.elevation}
				className={`${classes.paper}
							${this.state.point ? classes.cursorSelect : classes.cursorDefault}
							${this.state.fadingOut ? classes.fadeOut : ''}
							`}
				onMouseEnter={this.onMouseOver}
				onMouseLeave={this.onMouseLeave}
				onClick={!this.state.hovering ? this.onClick : ()=>{}}>
				<div style={{ padding: '8px' }}>
					{ this.state.canDelete ? <span style={{ float: 'right' }}>
						<IconButton
							onMouseOver={() => this.setState({
								...this.state,
								hovering: true,
							})}
							onMouseOut={() => this.setState({
								...this.state,
								hovering: false,
							})}
							onClick={this.delete}>
							<Delete />
						</IconButton>
					</span>
					: '' }
					<span style={{ textAlign: 'center' }}>
						<Typography component="h1" variant="h3">
							{this.props.quiz.name}
						</Typography>
					</span>
					<span style={{ textAlign: 'left' }}>
						<Typography component="p">
							Questions: {this.props.quiz.questions.length}
						</Typography>
						<Typography component="p">
							Author: {this.state.author}
						</Typography>
					</span>
				</div>
			</Paper>
		);
	}
};

export default withStyles(styles)(QuizCard);