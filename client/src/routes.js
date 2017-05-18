import Base from './Base.jsx';
import HomePage from './HomePage.jsx';
import DashboardContainer from './dashboard/DashboardContainer.jsx';
import LoginContainer from './login/LoginContainer.jsx';
import SignUpContainer from './signup/SignUpContainer.jsx';
import FieldsComponent from './fields/FieldsComponent.jsx';
import Auth from './modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardContainer);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/login',
      component: LoginContainer
    },

    {
      path: '/signup',
      component: SignUpContainer
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    },
	
	{
      path: '/fields',
      component: FieldsComponent
    },

  ]
};

export default routes;