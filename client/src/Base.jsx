/*
**Author: Xingyu Tao
**Last Updated: 5-15-2017
**Comments:
**	presentation wrapper for whole app
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import Auth from './modules/Auth';
import 'bulma/css/bulma.css'
import styled from 'styled-components'
import TopBarNav from './topLvlMobile/TopBarNav.js';


const Container = styled.div`
    height:100%;
`;

const Topbar = styled.div`
    a {
  !important color: white;
  text-decoration: none;
  transition: color 0.4s;
}
`;


const Base = ({ children }) => (
  <div  style={{height:'100%'}}>
      <div style={{position: 'fixed', width: "100%", zIndex: 1000}}>
    <Topbar className="top-bar has-shadow" >
      <div className="top-bar-left">
	  <img id="logo" src="images/logo.png" alt="UBCFarm Logo"></img>
        <Link id="title" to="/">UBCFarm Monitor</Link>
      </div>

      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
            <div className="is-hidden-touch">
		<Link to="/fields">Fields</Link>
		<Link to="/tasks">Tasks</Link>
        <Link to="/inventory">Inventories</Link>
		<Link to="/finances">Finances</Link>
        <Link to="/users">Users</Link>
        <Link to="/logout">Log out</Link>
            </div>
            <div className="is-hidden-desktop">

            </div>
        </div>
      ) : (
        <div className="top-bar-right">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}

    </Topbar>
      </div>
      <Container className="columns is-gapless" >
            <div className="column" style={{marginTop: "60px"}}>
            {children}
            </div>

      </Container>
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;