/*
**Author: Xingyu Tao
**Last Updated: 5-15-2017
**Comments: 
**	main jsx file for application
*/
import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
import createPalette from 'material-ui/styles/createPalette'
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';
import {createStore, applyMiddleware} from 'redux';
import allReducers from './reducers';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {red} from 'material-ui/colors'

//setup main theme
const mainTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#81C784',
            main: '#388e3c',
            dark: '#1b5e20',
            contrastText: '#f5f5f5',
        },
        secondary: {
            light: '#81D4FA',
            main: '#03A9F4',
            dark: '#01579B',
            contrastText: '#f5f5f5',
        },
        accent: '#FFC107',
    },
});

//create redux store
const store = createStore(
    allReducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

ReactDom.render((
    <MuiThemeProvider theme={mainTheme}>
        <Provider store={store}>
            <Router history={browserHistory} routes={routes} />
        </Provider>
    </MuiThemeProvider>
    ),
    document.getElementById('react-app')
);