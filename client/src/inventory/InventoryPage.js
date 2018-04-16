/**
 * Created by Xingyu on 6/28/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchSeeds} from './actions/seeds-get';
import styled from 'styled-components';
import InventoryMenu from './components/InventoryMenu'
import CreateSeedModal from './components/create-seed-modal'
import Divider from 'material-ui/Divider'
import SeedList from './components/SeedList'
import TransplantingList from './components/lists/transplantingList'
import FertilizersList from './components/lists/fertilizerList'
import PestControlList from './components/lists/pestControlList'
import EquipmentList from './components/lists/equipmentList'
import VehiclesList from './components/lists/vehiclesList'
import HarvestedProduceList from './components/lists/harvestedList'
import CreateEquipemntModal from './components/modals/new-equipment-modal'
import CreateFertilizerModal from './components/modals/new-fertilizer-modal'
import CreateHarvestedModal from './components/modals/new-harvested-modal'
import CreateTransplantModal from './components/modals/new-transplanting-modal'
import CreateVehicleModal from './components/modals/new-vehicles-modal'
import CreatePestControlModal from './components/modals/new-pestControl-modal'
import {fetchTransplants} from './actions/transplant-actions'
import {fetchFertilizers} from './actions/fertilizer-actions'
import {fetchPesticides} from './actions/pest-actions'
import {fetchEquipments} from './actions/equipment-actions'
import {fetchVehicles} from './actions/vehicles-action'
import {fetchHarvested} from './actions/harvested_actions'




//list used for selecting inventory
const InventoryArray =
    {
        0: SeedList,
        1: TransplantingList,
        2: FertilizersList,
        3: PestControlList,
        4: EquipmentList,
        5: VehiclesList,
        6: HarvestedProduceList
    };

const ModalArray =
    {
        0: CreateSeedModal,
        1: CreateTransplantModal,
        2: CreateFertilizerModal,
        3: CreatePestControlModal,
        4: CreateEquipemntModal,
        5: CreateVehicleModal,
        6: CreateHarvestedModal
    };





//styled-component styles
const NewFieldMap = styled.div`
        height: 70%;
`;
const ToolColumn = styled.div`

`;



const styles = {
    fieldSelector: {
        height: '30%',
    },
    centerContainer: {
        height: '100%',
        margin: '0',
        overflow:'scroll',
        padding: '0',
    }
};

class InventoryPage extends React.Component {
    componentDidMount() {
        this.props.fetchSeeds();
        this.props.fetchTransplants();
        this.props.fetchFertilizers();
        this.props.fetchPesticides();
        this.props.fetchEquipments();
        this.props.fetchVehicles();
        this.props.fetchHarvested();
    }

    // Constructor is responsible for setting up props and setting initial state
    constructor(props) {
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            // State needed
            seeds: [],
            active_inventory: InventoryArray[0],
        };
    }


    render() {
        const location = {
            lat: 49.249683,
            lng: -123.237421
        };
        const markers = [
            {
                location: {
                    lat: 49.249683,
                    lng: -123.237421
                }
            }
        ];

        const InventoryList = InventoryArray[this.props.active_inventory];
        const NewItemModal = ModalArray[this.props.active_inventory];

        return (

            <div className="columns is-gapless" style={styles.centerContainer}>
                <div className="column is-2-desktop">
                    <InventoryMenu active={this.state.active_inventory}/>
                </div>
                <div className="column is-10-desktop" style={{ backgroundColor: '#F5F5F5'/*#F5F5F5*/, minWidth:'70%',overflow:'scroll'}}>
                    <div style={{height:"60px"}}>
                        <NewItemModal/>
                    </div>
                    <Divider/>
                    <InventoryList/>
                </div>
            </div>
        );
    }
}

InventoryPage.propTypes = {
    active_inventory: PropTypes.number.isRequired,

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
        active_inventory: state.active_inventory,
        seeds: state.seeds,
        transplants: state.transplants,
        fertilizers: state.fertilizers,
        pesticides: state.pesticides,
        vehicles: state.vehicles,
        harvested: state.harvested,

    }
};

export default connect(mapStateToProps, {fetchSeeds,fetchTransplants,fetchFertilizers,fetchPesticides,fetchEquipments,fetchVehicles,fetchHarvested})(InventoryPage);