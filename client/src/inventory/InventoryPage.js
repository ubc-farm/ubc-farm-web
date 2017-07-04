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
import HarvestedProduceList from './components/SeedList'


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
        padding: '0',
    }
};

class InventoryPage extends React.Component {
    componentDidMount() {
        this.props.fetchSeeds();
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

        return (

            <div className="columns is-gapless" style={styles.centerContainer}>
                <div className="column is-2-desktop">
                    <InventoryMenu active={this.state.active_inventory}/>
                </div>
                <div className="column is-10-desktop" style={{ backgroundColor: '#F5F5F5'}}>
                    <div style={{height:"60px"}}>
                        <CreateSeedModal/>
                    </div>
                    <Divider/>
                    <InventoryList/>


                </div>
            </div>
        );
    }
}

InventoryPage.propTypes = {
    seeds: PropTypes.array.isRequired,
    fetchSeeds: PropTypes.func.isRequired,
    active_inventory: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    return {
        seeds: state.seeds,
        active_inventory: state.active_inventory,
    }
};

export default connect(mapStateToProps, {fetchSeeds})(InventoryPage);