import React, {Component} from 'react'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
import _ from 'lodash'

class Map extends Component {


    render() {

        const markers = props.markers.map((venue,i) => {
            const marker = {
                position:{
                    lat: venue.location.lat,
                    lng: venue.location.lng
                }
            }
            return <Marker key={i}{...marker}/>
        });

        const GettingStartedGoogleMap = withGoogleMap(props => (
            <GoogleMap
                ref={props.onMapLoad}
                defaultZoom={15}
                defaultCenter={this.props.center}
                {markers}
                onClick={props.onMapClick}


            >
            </GoogleMap>
        ));

        return (
            <GettingStartedGoogleMap
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
                onMapLoad={_.noop}
                onMapClick={_.noop}
                onMarkerRightClick={_.noop}


            />
        )
    }
}

export default Map