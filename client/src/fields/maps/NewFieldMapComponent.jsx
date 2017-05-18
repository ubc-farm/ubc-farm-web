import React from 'react'
import PropTypes from 'prop-types';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'

const NewFieldMapComponent = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={15}
        defaultCenter={{ lat:49.249683, lng: -123.237421 }}
        onClick={props.onMapClick}
    >
        {props.markers.map(marker => (
            <Marker
                {...marker}
                onRightClick={() => props.onMarkerRightClick(marker)}
            />
        ))}
    </GoogleMap>
));

export default NewFieldMapComponent;