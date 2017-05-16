/*
**Author: Xingyu Tao
**Last Updated: 5-15-2017
**Comments: 
**	presentation wrapper for whole app
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';


const Base = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">React App</IndexLink>
      </div>

      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
		<Link to="/fields">Fields</Link>
		<Link to="/tasks">Tasks</Link>
		<Link to="/graphs">Graphs</Link>
		<Link to="/invoice">Invoice</Link>
        <Link to="/logout">Log out</Link>
        </div>
      ) : (
        <div className="top-bar-right">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}

    </div>

    { /* child component will be rendered here */ }
    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;