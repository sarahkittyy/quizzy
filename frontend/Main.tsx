import React, { SFC, useState } from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { lightTheme, darkTheme } from './Theme';
import { MuiThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import './Main.css';

const Main: SFC<{}> = (props) => {
	const [ theme, setTheme ] = useState(lightTheme);
	
	const toggleTheme = () => {
		setTheme(theme.palette.type === 'dark' ? lightTheme : darkTheme);
	};
	
	const currentTheme = createMuiTheme(theme);
	
	return (
		<MuiThemeProvider theme={currentTheme}>
			<CssBaseline />
			<Routes toggleTheme={toggleTheme} />
		</MuiThemeProvider>
	);
};

ReactDOM.render(<Main />, document.querySelector('#root'));