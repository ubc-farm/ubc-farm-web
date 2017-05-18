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
        width: 1000px;
        height: 600px;
`;
const Title = styled.h1`
    font-size: 1.5em;
    text-align:center;
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
            <div>
                <Title>This is the map!</Title>
                <NewFieldMap>
                    <NewFieldMapContainer />
                </NewFieldMap>
                <div>
                </div>


            </div>
        )
    }
}

export default FieldsComponent;