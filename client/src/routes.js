import React from 'react';
import {Route} from 'react-router';
import Base from './Base.jsx';
import HomePage from './HomePage.jsx';
import DashboardContainer from './dashboard/DashboardContainer.jsx';
import LoginContainer from './login/LoginContainer.jsx';
import SignUpContainer from './signup/SignUpContainer.jsx';
import FieldsComponent from './fields/FieldsComponent.jsx';
import InventoryPage from './inventory/InventoryPage'
import Auth from './modules/Auth';
import TasksPage from './tasks/TasksPage';
//import TestView from './sandBox/TestingView';
let TestView = {}; 
import FinancesPage from './finances/FinancesPage';
import UserPage from './users/UserPage';
import ReportPage from './reports/ReportPage';

export default (
    <Route component={Base}>
        <Route path="/"
               getComponent={
                   (location, callback) => {
                       if (Auth.isUserAuthenticated()) {
                           callback(null, DashboardContainer);
                       } else {
                           callback(null, HomePage);
                       }
                   }
               }
        />
        <Route path="/login" component={LoginContainer}/>
        <Route path="/signup" component={SignUpContainer}/>
        <Route path="/logout"
               onEnter={(nextState, replace) => {
                   Auth.deauthenticateUser();

                   // change the current URL to /
                   replace('/');
               }}
               component={LoginContainer}
        />
        <Route path="/fields" component={FieldsComponent}/>
        <Route path="/inventory" component={InventoryPage}/>
        <Route path="/tasks" component={TasksPage}/>
        <Route path="/finances" component={FinancesPage}/>
        <Route path="/testview" component={TestView}/>
        <Route path="/users" component={UserPage}/>
        <Route path="/reports" component={ReportPage}/>
    </Route>
)