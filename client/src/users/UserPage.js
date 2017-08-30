/**
 * Created by Xingyu on 8/30/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import UserList from './components/UserList';
import Divider from 'material-ui/Divider';
import {fetchUsers} from './actions/user_actions';


const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        fontWeight: 400,
    },
};

class UserPage extends React.Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    handleMenuClick(e, { name }){
        this.setState({ activeItem: name });
    }


    // Constructor is responsible for setting up props and setting initial state
    constructor(props){
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            // State needed
            activeItem: 'list',
            fields: [],
            tasks:[]
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    render() {


        return (
            <div>
                <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "20px"}}>
                    <div className="columns">
                        <div className = "column is-2-desktop">
                            <h2 style={styles.headline}>User List</h2>
                        </div>
                        <div className="column is-10-desktop" style={{textAlign: 'center',padding:'10px'}}>

                        </div>
                    </div>

                    <Divider/>

                    <div>
                        <UserList/>
                    </div>
                </div>

            </div>
        );
    }
}

UserPage.propTypes = {
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
};

export default connect(mapStateToProps, {fetchUsers})(UserPage);