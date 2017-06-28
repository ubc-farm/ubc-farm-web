/**
 * Created by Xingyu on 6/5/2017.
 */
import React, { Component } from 'react';

class Radar extends Component {
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
        };

    }


    render() {
        return (
            <div style={{ height:'30%'}}>
                <iframe
                    name="iframe"
                    src="https://weather.gc.ca/radar/index_e.html?id=wuj #animation-frame"
                    width="100%"
                    height="100%"
                    style={{marginTop: 0}}
                    scrolling="no"
                ></iframe>
            </div>
        );
    }
}

export default Radar;