/**
 * Created by Xingyu on 5/29/2017.
 */
import React from 'react'
import PropTypes from 'prop-types';
import {withGoogleMap, GoogleMap, Polygon} from 'react-google-maps'
import _ from 'lodash'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectField} from '../actions/select-field.js';
import {fetchTaskByField} from '../actions/fetchTaskByField';


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
                options={{
                    strokeColor: '#1a2e13',
                    fillColor: '#68b34a',
                    strokeOpacity: 0.8,
                    strokeWeight: 3.5,
                    fillOpacity: 0.4,
                }}
                onClick={() => {props.selectField(field); props.fetchTaskByField(field._id)}}




            />
        ))}

    </GoogleMap>
));

const farmBounds = [{lat:49.251935,lng:-123.239568},{lat:49.249828, lng:-123.233245},{lat:49.247568, lng:-123.234412},{lat:49.247568, lng:-123.234412}];


class SummaryMap extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            fields: [],
            selectedField: {},
            polygons:{}
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
    }

    handleMapLoad(map) {
        this._mapComponent = map;
        if (map) {
        }
    }

    /*
     * This is called when you click on the map.
     * Go and try click now.
     */
    handleMapClick(event) {
        console.log("clicked on map");
        console.log(event);
        if(event.ta){
            console.log("clicked on polygon!");
        }
    }



    componentWillUpdate(nextProps, nextState){
        console.log(nextProps.selectedField.polygon);
        if(nextProps.selectedField.polygon) {
            let bounds = new google.maps.LatLngBounds();
            nextProps.selectedField.polygon.forEach(function(e){
                bounds.extend(e);
            });
            this._mapComponent.fitBounds(bounds);
        }else{
            let b = new google.maps.LatLngBounds();
            farmBounds.forEach(function(point){
                b.extend(point);
            });
            this._mapComponent.fitBounds(b);
        }


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
                    selectField={this.props.selectField}
                    fetchTaskByField={this.props.fetchTaskByField}
                />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        fields: state.fields,
        selectedField: state.selectedField
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectField: selectField,
        fetchTaskByField: fetchTaskByField
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SummaryMap);