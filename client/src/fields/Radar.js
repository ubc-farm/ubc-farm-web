/**
 * Created by Xingyu on 6/5/2017.
 */
import React, { Component } from 'react';

class Radar extends Component {
    render() {
        return (
            <div style={{ height:'30%'}}>
                <iframe
                    name="iframe"
                    src="https://weather.gc.ca/radar/index_e.html?id=wuj"
                    style={{marginTop: 20}}
                ></iframe>
            </div>
        );
    }
}

export default Radar;