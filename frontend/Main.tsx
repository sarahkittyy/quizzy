import React, { SFC, useState } from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { lightTheme, darkTheme } from './Theme';
import { MuiThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import './Main.css';
import NotificationSystem from 'react-notification-system';
import { ref } from './Notifs';

const Main: SFC<{}> = (props) => {
	const [ theme, setTheme ] = useState(lightTheme);
	
	const toggleTheme = () => {
		setTheme(theme.palette.type === 'dark' ? lightTheme : darkTheme);
	};
	
	const currentTheme = createMuiTheme(theme);

	
	return (
		<MuiThemeProvider theme={currentTheme}>
			<CssBaseline />
			<NotificationSystem ref={ref} />
			<Routes toggleTheme={toggleTheme} />
		</MuiThemeProvider>
	);
};

ReactDOM.render(<Main />, document.querySelector('#root'));