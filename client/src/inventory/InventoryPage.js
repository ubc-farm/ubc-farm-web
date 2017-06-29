/**
 * Created by Xingyu on 6/28/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InventoryMenu from './components/InventoryMenu'



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
        //fetch fields from database
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
        return (
            <div className="columns is-gapless" style={styles.centerContainer}>
                <div className="column is-3desktop">
                    <InventoryMenu/>
                </div>
                <div className="column is-9-desktop" style={{ backgroundColor: '#F5F5F5'}}>
                    List

                </div>
            </div>
        );
    }
}

export default InventoryPage;