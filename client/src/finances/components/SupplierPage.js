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

const paperStyle = {
    height: 100,
    width: 100,
    display: 'table-cell',
    verticalAlign:'middle',
    textAlign: 'center',

};

class SupplierPage extends React.Component{

    componentDidMount(){
        this.props.fetchSuppliers();
    }

    // Constructor is responsible for setting up props and setting initial state
    constructor(props){
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            suppliers: [],
            // State needed
        };
    }

    render(){
        return(
            <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "20px"}}>
                <div className="columns">
                    <div className = "column is-2-desktop">
                        <div className="title">Supplier List</div>
                    </div>
                    <div className="column is-10-desktop" style={{textAlign: 'center',padding:'10px'}}>
                        <NewSupplierModal/>
                    </div>
                </div>

                <Divider/>
                <div>
                    <div style={paperStyle}>
                        <div className="">Total</div>
                        <div className="">{this.props.suppliers.length}</div>
                    </div>
                    <div style={paperStyle}>
                        <div className="">This Week</div>
                        <div className="">0</div>
                    </div>

                </div>
                <Divider/>

                <div>
                    <SupplierList suppliers={this.props.suppliers}/>
                </div>

            </div>
        )
    }
}

SupplierPage.propTypes = {
    suppliers: PropTypes.array.isRequired,
    fetchSuppliers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        suppliers: state.suppliers,
    }
};

export default connect(mapStateToProps, {fetchSuppliers, })(SupplierPage);