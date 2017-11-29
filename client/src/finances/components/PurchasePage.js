/**
 * Created by Xingyu on 11/17/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
//import {fetchClients} from '../actions/client-actions';
//import ClientList from './lists/ClientList';
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
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

class PurchasePage extends React.Component{

    componentDidMount(){
        //this.props.fetchClients();
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
                    <Paper style={paperStyle} zDepth={1}
                           children={
                               <div>
                                   <div>Total</div>
                                   <div>{this.state.purchases.length}</div>
                               </div>
                           }
                    />
                    <Paper style={paperStyle} zDepth={1} />
                    <Paper style={paperStyle} zDepth={1} />
                    <Paper style={paperStyle} zDepth={1} />

                </div>


                <div>
                </div>

            </div>
        )
    }
}

PurchasePage.propTypes = {
    // clients: PropTypes.array.isRequired,
    // fetchClients: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        // clients: state.clients,
    }
};

export default connect(mapStateToProps,)(PurchasePage);