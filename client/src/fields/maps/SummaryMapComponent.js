/**
 * Created by Xingyu on 5/29/2017.
 */
import React from 'react'
import PropTypes from 'prop-types';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager.js'

const SummaryMapComponent = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={17}
        defaultCenter={{ lat:49.249683, lng: -123.237421 }}
        onClick={props.onMapClick}
        tilt={0}
        mapTypeId={'satellite'}

    >
        {props.markers.map(marker => (
            <Marker
                {...marker}
                onRightClick={() => props.onMarkerRightClick(marker)}
            />
        ))}
    </GoogleMap>
));

export default SummaryMapComponent;