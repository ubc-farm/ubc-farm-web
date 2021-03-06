/*
 **Author: Tushar Chutani
 **Last Updated: 15-03-2018
 **Comments:
 **	dashboard presentation component
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'bulma/css/bulma.css';
import SummaryMap from '../maps/SummaryMap';
import FieldSelector2 from '../field-selector2.js';
import FieldDetail from '../FieldDetail.js';
import FieldTasks from '../FieldTasks';
import {connect} from 'react-redux';
import {fetchFields} from '../actions'
import Radar from '../Radar';
import FieldSelector2 from '../field-selector2.js';
import CircularProgress from 'material-ui/CircularProgress';
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

class FieldsComponent extends React.Component {
    componentDidMount() {
        //set species this.props.setSpecies(startLat, endLat, startLon, endLon);
    }

    // Constructor is responsible for setting up props and setting initial state
    constructor(props) {
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            // State needed
            fields: [],
        };
    }


    render() {
        const location = {
            lat: 49.249683,
            lng: -123.237421
        }
        const markers = [
            {
                location: {
                    lat: 49.249683,
                    lng: -123.237421
                }
            }
        ]
        if(this.props.selectedField.length === 0){
            return(<div className="field_info"><h4>Please go back to fields page to select the field to generate report from</h4></div>);
        }else{
            return (
                <div className="columns is-gapless" style={styles.centerContainer}>
                    <div className="column is-2-desktop" style={{ backgroundColor: '#F2F2F2'}}>
                        <FieldSelector2/>
                        <div class="columns">
                            
                        </div>
                    </div>
                </div>
            );
        }
    }
}

FieldsComponent.propTypes = {
    fields: PropTypes.array.isRequired,
    fetchFields: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        selectedField: state.selectedField
    }
};

export default connect(mapStateToProps,{setSpecies})(FieldsComponent);
