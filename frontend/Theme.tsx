import * as color from '@material-ui/core/colors';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const lightTheme: ThemeOptions = {
	palette: {
		type: 'light',
		primary: {
			main: '#f533da',
		},
		secondary: color.yellow,
	},
};

const darkTheme: ThemeOptions = {
	palette: {
		type: 'dark',
		primary: color.deepPurple,
		secondary: color.yellow,
	},
};

export { lightTheme, darkTheme };