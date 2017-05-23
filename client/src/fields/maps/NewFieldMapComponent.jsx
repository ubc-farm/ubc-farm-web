import React from 'react'
import PropTypes from 'prop-types';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager.js'

const NewFieldMapComponent = withGoogleMap(props => (
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
        <DrawingManager options={{drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['marker', 'polygon']
        }}}/>
    </GoogleMap>
));

export default NewFieldMapComponent;