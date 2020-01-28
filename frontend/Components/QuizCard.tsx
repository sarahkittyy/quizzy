import React, { Component } from 'react';
import history from '../History';
import { Card, Paper, Typography } from '@material-ui/core';
import IQuestion from '../Util/IQuestion';
import IQuiz from '../Util/IQuiz';
import { createStyles, withStyles } from '@material-ui/styles';
import $ from 'jquery';

export interface QuizCardState {
	elevation: number;
	point: boolean;
	author: string;
}

export interface QuizCardProps {
	quiz: IQuiz;
	classes: {
		paper: string;
		cursorSelect: string;
		cursorDefault: string;
	}
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
});

class QuizCard extends Component<QuizCardProps, QuizCardState> {
	styles: any;
	
	public constructor(props: QuizCardProps) {
		super(props);
		
		this.state = {
			elevation: 3,
			point: false,
			author: 'Loading...',
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
	
	public render() {
		const { classes } = this.props;
		
		return (
			<Paper
				elevation={this.state.elevation}
				className={`${classes.paper} ${this.state.point ? classes.cursorSelect : classes.cursorDefault}`}
				onMouseEnter={this.onMouseOver}
				onMouseLeave={this.onMouseLeave}
				onClick={this.onClick}>
				<div style={{ padding: '8px' }}>
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