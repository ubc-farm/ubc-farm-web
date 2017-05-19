/*
**Author: Xingyu Tao
**Last Updated: 5-16-2017
**Comments: 
**	dashboard presentation component 
*/

import React from 'react';
import styled from 'styled-components'

import NewFieldMapContainer from './maps/NewFieldMapContainer.jsx'

//styled-component styles
const NewFieldMap= styled.div`
        height: 600px;
`;
const ToolColumn = styled.div`
    background-color: blue;
`;

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
            <div class="columns">
                <NewFieldMap class="column">
                    <NewFieldMapContainer />
                </NewFieldMap>
                <ToolColumn class="column">
                    <p class="notification is-info">
                        <code class="html">is-three-quarters</code>
                    </p>
                </ToolColumn>


            </div>
        )
    }
}

export default FieldsComponent;