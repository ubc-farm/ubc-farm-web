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
        return (
            <div className="columns is-gapless" style={styles.centerContainer}>
                <div className="column is-3desktop">
                    <InventoryMenu/>
                </div>
                <div className="column is-9-desktop" style={{ backgroundColor: '#F5F5F5'}}>
                    <div style={{height:"60px"}}>
                    <CreateSeedModal/>
                    </div>
                    <Divider/>
                    <SeedList/>

                </div>
            </div>
        );
    }
}

InventoryPage.propTypes = {
    seeds: PropTypes.array.isRequired,
    fetchSeeds: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        seeds: state.seeds,
    }
};

export default connect(mapStateToProps, {fetchSeeds})(InventoryPage);