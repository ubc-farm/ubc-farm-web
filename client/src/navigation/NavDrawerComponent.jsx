import React from 'react';
import PropTypes from 'prop-types';
import 'bulma/css/bulma.css'
import styled from 'styled-components'

const NavDrawer = styled.div`
       background-color: #f5f5f5;
       height: 100%;
       padding-left: 10px;
`;



const NavDrawerComponent = ({ activeItem }) => (
    <NavDrawer className="column is-2-desktop">
        <aside className="menu" >
            <p className="menu-label">
                General
            </p>
            <ul className="menu-list">
                <li><a>Dashboard</a></li>
            </ul>
            <p className="menu-label">
                Administration
            </p>
            <ul className="menu-list">

                <li>
                    <a className="is-active">Manage Your Team</a>
                    <ul>
                        <li><a>Members</a></li>
                        <li><a>Tasks</a></li>
                    </ul>
                </li>
                <li>
                    <a>Manage Farm</a>
                    <ul>
                        <li><a>Fields</a></li>
                        <li><a>Reports</a></li>
                    </ul>
                </li>
            </ul>
            <p className="menu-label">
                Financials
            </p>
            <ul className="menu-list">
                <li><a>Invoices</a></li>
                <li><a>Balance</a></li>
                <li><a>Customers</a></li>
            </ul>
        </aside>

    </NavDrawer>
);

NavDrawerComponent.propTypes = {
    secretData: PropTypes.string.isRequired
};

export default NavDrawerComponent;







