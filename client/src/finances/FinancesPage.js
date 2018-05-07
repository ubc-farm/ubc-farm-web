/**
 * Created by Xingyu on 7/24/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import NewSupplierModal from './components/NewSupplierModal';
import NewPurchaseModal from './components/modals/NewPurchaseModal';
import PurchasePage from './components/PurchasePage'
import InvoicePage from './components/InvoicePage';
import ClientPage from './components/ClientPage';
import SupplierPage from './components/SupplierPage';


class FinancesPage extends React.Component{

    // Constructor is responsible for setting up props and setting initial state
    constructor(props){
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            // State needed
            activeTab: 'summary',
            clients: [],
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick(e, { name }){
        this.setState({ activeTab: name });
    }

    render(){
        return(
            <div>
                <Tabs>
                    <Tab label="Clients">
                        <ClientPage/>
                    </Tab>
                    <Tab label="Suppliers">
                        <SupplierPage/>
                    </Tab>
                    <Tab label="Invoices">
                        <InvoicePage/>
                    </Tab>
                    <Tab label="Purchase Orders">
                        <PurchasePage/>
                    </Tab>
                </Tabs>
            </div>
        )
    }

}

FinancesPage.propTypes = {

};

const mapStateToProps = (state) => {
    return {

    }
};

export default connect(mapStateToProps)(FinancesPage);
