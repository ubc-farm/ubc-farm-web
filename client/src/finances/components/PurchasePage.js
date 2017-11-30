/**
 * Created by Xingyu on 11/17/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPurchases} from '../actions/purchase-actions';
import PurchaseList from './lists/PurchaseList';
import NewPurchaseModal from './modals/NewPurchaseModal';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

const fullWidthDialog = {
    width: '100%',
    maxWidth: 'none',

};

const paperStyle = {
    height: 100,
    width: 100,
    display: 'table-cell',
    verticalAlign:'middle',
    textAlign: 'center',

};

class PurchasePage extends React.Component{

    componentDidMount(){
        this.props.fetchPurchases();
    }

    // Constructor is responsible for setting up props and setting initial state
    constructor(props){
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            purchases: [],
            // State needed
        };
    }

    render(){
        return(
            <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "20px"}}>
                <div className="columns">
                    <div className = "column is-2-desktop">
                        <div className="title">Purchase List</div>
                    </div>
                    <div className="column is-10-desktop" style={{textAlign: 'center',padding:'10px'}}>
                        <NewPurchaseModal style={fullWidthDialog}/>
                    </div>
                </div>

                <Divider/>
                <div>
                    <div style={paperStyle}>
                        <div className="">Total</div>
                        <div className="">{this.props.purchases.length}</div>
                    </div>
                    <div style={paperStyle}>
                        <div className="">This Week</div>
                        <div className="">0</div>
                    </div>

                </div>
                <Divider/>


                <div>
                    <PurchaseList/>
                </div>

            </div>
        )
    }
}

PurchasePage.propTypes = {
     purchases: PropTypes.array.isRequired,
     fetchPurchases: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
         purchases: state.purchases,
    }
};

export default connect(mapStateToProps,{fetchPurchases})(PurchasePage);