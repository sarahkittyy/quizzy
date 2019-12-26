import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

ReactDOM.hydrate(Routes, document.querySelector('#root'));