import React, { SFC } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Typography, Button } from '@material-ui/core';

export interface Error404Props {

};

const Error404: SFC<Error404Props> = (props) => {
	let history = useHistory();

	document.title = '-=- 404 -=-';

	return (
		<div style={{ width: '100%', position: 'fixed', top: '35%' }}>
			<Paper style={{ width: '20%', margin: '0 auto', textAlign: 'center', padding: '15px' }} elevation={3}>
				<Typography component="p" variant="h3">404</Typography>
				<br />
				<Typography component="p" variant="h4">Page not found</Typography>
				<br />
				<Button variant="contained" color="primary" onClick={() => history.goBack() }>Return</Button>
			</Paper>
		</div>
	);
};

export default Error404;