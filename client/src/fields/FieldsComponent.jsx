/*
**Author: Xingyu Tao
**Last Updated: 5-16-2017
**Comments: 
**	dashboard presentation component 
*/

import React from 'react';
import styled from 'styled-components'
import 'bulma/css/bulma.css'
import NewFieldMapContainer from './maps/NewFieldMapContainer.jsx'

//styled-component styles
const NewFieldMap= styled.div`
        height: 600px;
`;
const ToolColumn = styled.div`

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
            <div className="columns is-gapless">
                <div className="column is-2-desktop">
                    <ToolColumn>
                        <p className="notification is-info">
                            <code className="html">is-three-quarters</code>
                        </p>s
                    </ToolColumn>
                </div>
                <div className="column is-8-desktop">
                <NewFieldMap>
                    <NewFieldMapContainer />
                </NewFieldMap>
                </div>
                <div className="column is-2-desktop">
                <ToolColumn>
                    <p className="notification is-info">
                        <code className="html">is-three-quarters</code>
                    </p>
                </ToolColumn>
                </div>
            </div>
    )
    }
}

export default FieldsComponent;