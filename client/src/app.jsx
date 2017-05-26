/*
**Author: Xingyu Tao
**Last Updated: 5-15-2017
**Comments: 
**	main jsx file for application
*/
import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';
import {createStore, applyMiddleware} from 'redux';
import allReducers from './reducers';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

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
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Provider store={store}>
            <Router history={browserHistory} routes={routes} />
        </Provider>
    </MuiThemeProvider>
    ),
    document.getElementById('react-app')
);