/**
 * Created by Xingyu on 11/13/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchSuppliers} from '../actions/supplier-actions.js';
import SupplierList from './lists/SupplierList';
import NewSupplierModal from './modals/NewSupplierModal';
import Divider from 'material-ui/Divider';

class SupplierPage extends React.Component{

    componentDidMount(){
        this.props.fetchClients();
    }

    // Constructor is responsible for setting up props and setting initial state
    constructor(props){
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            clients: [],
            // State needed
        };
    }

    render(){
        return(
            <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "20px"}}>
                <div className="columns">
                    <div className = "column is-2-desktop">
                        <div className="title">Client List</div>
                    </div>
                    <div className="column is-10-desktop" style={{textAlign: 'center',padding:'10px'}}>
                        <NewClientModal/>
                    </div>
                </div>

                <Divider/>

                <div>
                    <ClientList/>
                </div>

            </div>
        )
    }
}

ClientPage.propTypes = {
    clients: PropTypes.array.isRequired,
    fetchClients: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        clients: state.clients,
    }
};

export default connect(mapStateToProps, {fetchClients, })(ClientPage);