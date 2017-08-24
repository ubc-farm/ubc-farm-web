/**
 * Created by Xingyu on 7/24/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import NewSupplierModal from './components/NewSupplierModal';
import NewPurchasePage from './components/NewPurchasePage';
import NewInvoicePage from './components/NewInvoicePage';
import NewClientModal from './components/NewCliendModal';
import {fetchSeeds} from '../inventory/actions/seeds-get';
import {fetchTransplants} from '../inventory/actions/transplant-actions'
import {fetchFertilizers} from '../inventory/actions/fertilizer-actions'
import {fetchPesticides} from '../inventory/actions/pest-actions'
import {fetchEquipments} from '../inventory/actions/equipment-actions'
import {fetchVehicles} from '../inventory/actions/vehicles-action'
import {fetchHarvested} from '../inventory/actions/harvested_actions'

class FinancesPage extends React.Component{

    // Constructor is responsible for setting up props and setting initial state
    constructor(props){
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            // State needed
            activeTab: 'summary',
            fields: [],
            tasks:[],
            value: 'test value',
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    componentDidMount(){
        //fetch from databases here
        this.props.fetchSeeds();
        this.props.fetchTransplants();
        this.props.fetchFertilizers();
        this.props.fetchPesticides();
        this.props.fetchEquipments();
        this.props.fetchVehicles();
        this.props.fetchHarvested();

    }

    handleMenuClick(e, { name }){
        this.setState({ activeTab: name });
    }

    render(){
        return(
            <div>
                <Tabs>
                    <Tab label="Summary">
                        Summary should appear here
                    </Tab>
                    <Tab label="Clients">
                        Client List
                    </Tab>
                    <Tab label="Suppliers">
                        Suppliers List
                        <NewSupplierModal/>
                    </Tab>
                    <Tab label="New Invoice">
                        Invoices here
                    </Tab>
                    <Tab label="New Purchase Order">
                        <NewPurchasePage/>
                    </Tab>
                </Tabs>
            </div>
        )
    }

}

FinancesPage.propTypes = {
    seeds: PropTypes.array.isRequired,
    fetchSeeds: PropTypes.func.isRequired,
    transplants: PropTypes.array.isRequired,
    fetchTransplants: PropTypes.func.isRequired,
    fertilizers: PropTypes.array.isRequired,
    fetchFertilizers: PropTypes.func.isRequired,
    pesticides: PropTypes.array.isRequired,
    fetchPesticides: PropTypes.func.isRequired,
    vehicles: PropTypes.array.isRequired,
    fetchVehicles: PropTypes.func.isRequired,
    harvested: PropTypes.array.isRequired,
    fetchHarvested: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        seeds: state.seeds,
        transplants: state.transplants,
        fertilizers: state.fertilizers,
        pesticides: state.pesticides,
        vehicles: state.vehicles,
        harvested: state.harvested,

    }
};

export default connect(mapStateToProps, {fetchSeeds,fetchTransplants,fetchFertilizers,fetchPesticides,fetchEquipments,fetchVehicles,fetchHarvested})(FinancesPage);