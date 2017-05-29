/**
 * Created by Xingyu on 5/29/2017.
 */
import React from 'react'
import PropTypes from 'prop-types';
import {withGoogleMap, GoogleMap, Polygon} from 'react-google-maps'
import _ from 'lodash'
import {connect} from 'react-redux';

const SummaryMapComponent = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={17}
        defaultCenter={{ lat:49.249683, lng: -123.237421 }}
        onClick={props.onMapClick}
        tilt={0}
        mapTypeId={'satellite'}

    >
        {props.fields.map(field => (
            <Polygon
                key={field._id}
                path={field.polygon}
            />
        ))}

    </GoogleMap>
));

class SummaryMap extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            fields: []
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
    }

    handleMapLoad(map) {
        this._mapComponent = map;
        if (map) {
            console.log(map.getZoom());
        }
    }

    /*
     * This is called when you click on the map.
     * Go and try click now.
     */
    handleMapClick(event) {
    }


    render() {
        return (
            <div style={{height: `100%`}}>
                <SummaryMapComponent
                    containerElement={
                        <div style={{ height: `100%` }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                    onMapLoad={this.handleMapLoad}
                    onMapClick={this.handleMapClick}
                    fields={this.props.fields}
                />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        fields: state.fields
    };
}

export default connect(mapStateToProps)(SummaryMap);