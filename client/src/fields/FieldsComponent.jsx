/*
**Author: Xingyu Tao
**Last Updated: 5-16-2017
**Comments: 
**	dashboard presentation component 
*/

import React from 'react';
import NewFieldMapContainer from './maps/NewFieldMapContainer.jsx'


class FieldsComponent extends React.Component{
    // Constructor is responsible for setting up props and setting initial stte
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
                This is the map!
                <div style={{width:300,height:600}}>
                    <NewFieldMapContainer />
                </div>
                <div>
                </div>


            </div>
        )
    }
}

export default FieldsComponent;