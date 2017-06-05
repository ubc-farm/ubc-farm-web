/*
 **Author: Xingyu Tao
 **Last Updated: 5-16-2017
 **Comments:
 **	dashboard presentation component
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'bulma/css/bulma.css';
import SummaryMap from './maps/SummaryMap';
import FieldSelector2 from './field-selector2.js';
import FieldDetail from './field-detail.js';
import {connect} from 'react-redux';
import {fetchFields} from './actions/fetch-fields.js'


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
        //fetch fields from database
        this.props.fetchFields();
    }

    // Constructor is responsible for setting up props and setting initial state
    constructor(props) {
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            // State needed
            fields: []
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
        return (
            <div className="columns is-gapless" style={styles.centerContainer}>
                <div className="column is-9-desktop">
                    <div className="is-parent is-vertical is-gapless" style={styles.centerContainer}>
                        <NewFieldMap className="is-child" style={{margin: 0, padding: 0}}>
                            <SummaryMap fields={this.state.fields} />
                        </NewFieldMap>
                        <div className="is-child" style={styles.fieldSelector}>
                            <FieldDetail/>
                        </div>
                    </div>
                </div>
                <div className="column is-3-desktop" style={{ backgroundColor: '#F5F5F5'}}>
                    <FieldSelector2/>

                </div>
            </div>
        );
    }
}

FieldsComponent.propTypes = {
    fields: PropTypes.array.isRequired,
    fetchFields: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        fields: state.fields
    }
}

export default connect(mapStateToProps,{fetchFields})(FieldsComponent);