/*
**Author: Xingyu Tao
**Last Updated: 5-16-2017
**Comments: 
**	dashboard presentation component 
*/

import React from 'react';
import styled from 'styled-components';
import 'bulma/css/bulma.css';
import NewFieldMapContainer from './maps/NewFieldMapContainer.jsx';
import FieldSelector from './field-selector.js';
import FieldDetail from './field-detail.js';

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

class FieldsComponent extends React.Component{

    // Constructor is responsible for setting up props and setting initial state
    constructor(props){
        // Pass props to the parent component
        super(props);
        // Set initial state
        this.state = {
            // State needed
            cars: []
        };
    }

    render(){
        const location = {
            lat: 49.249683,
            lng: -123.237421
        }
        const markers = [
            {
                location:{
                    lat: 49.249683,
                    lng: -123.237421
                }
            }
        ]
        return(
            <div className="columns is-gapless" style={styles.centerContainer}>
                <div className="column is-9-desktop">
                    <div className="is-parent is-vertical is-gapless" style={styles.centerContainer}>
                        <NewFieldMap className="is-child" style={{margin:0, padding:0}}>
                            <NewFieldMapContainer />
                        </NewFieldMap>
                        <div className="is-child" style={styles.fieldSelector}>
                            <FieldDetail/>
                        </div>
                    </div>
                </div>
                <div className="column is-3-desktop">
                    <FieldSelector/>

                </div>
            </div>
    )
    }
}

export default FieldsComponent;