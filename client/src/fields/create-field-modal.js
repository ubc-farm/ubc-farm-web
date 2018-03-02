/**
 * Created by Xingyu on 5/25/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/Progress';
import {connect} from 'react-redux';
import {saveField} from './actions/save-field';
import styled from 'styled-components';
import {Radio, RadioGroup} from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import NewFieldMapComponent from './maps/NewFieldMapComponent.jsx';


//STATIC STYLES - [TODO: CONSOLIDATE STYLINGS]
const NewFieldMap = styled.div`
        height: 450px;
`;

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

let shortid = require('shortid');

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class CreateFieldModal extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            errors: {},
            open: false,
            validated: false,
            loading: false,
            done: false,
            polygon: [],
            fieldType: '',
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleOverlayComplete = this.handleOverlayComplete.bind(this);
        this.convertToJSON = this.convertToJSON.bind(this);
    };

    handleOpen(){
        this.setState({open: true});
    };

    handleClose(){
        this.setState({open: false, name: ''});
    };
    handleChange(e){
        if(this.state.errors[e.target.name]){
            console.log("handle error fired");
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors,
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value,
            });

        }

    };
    handleSubmit(e){
        e.preventDefault();

        //validation
        let errors = {};
        if(this.state.name === '')
            errors.name = "This field is Required";
        this.setState({errors});

        //if valid, create post request
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            const{name,polygon} = this.state;
            this.setState({loading: true});
            this.props.saveField({name,polygon}).then(
                (response) => {console.log("should catch error here")}
            );
            this.setState({done: true, loading: false});
            this.handleClose();

        }




    };

    //Map functions
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
    }

    convertToJSON(vertices){
        console.log(vertices);
    var polygonJSON = [];
    for(var i = 0; i < vertices.length; i++){
        polygonJSON.push({lat: vertices[i].lat(), lng: vertices[i].lng()})
    }
    return polygonJSON;
}

    handleOverlayComplete(evt){
        const type = evt.type; // "CIRCLE", "POLYGON", etc
        const overlay = evt.overlay; // regular Google maps API object
        let ref = this;

        //add listeners for editing the shape and updating React component accordingly
        if (type == "polygon") {
            ref.setState({
                polygon: overlay.getPath().getArray()
            });

            google.maps.event.addListener(overlay.getPath(), 'set_at', function() {
                console.log("edited node");
                ref.setState({
                    polygon:  overlay.getPath().getArray()
                });
            });

            google.maps.event.addListener(overlay.getPath(), 'insert_at', function() {
                console.log("added node");
                ref.setState({
                    polygon: overlay.getPath().getArray()
                });
            });
        }

    }

    render() {
        const actions = [
            <Button
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <Button
                label={this.state.loading ? '' : "Submit"}
                primary={true}
                disabled={false}
                onTouchTap={this.handleSubmit}
                icon={this.state.loading ? <CircularProgress /> : ''}
            />,
        ];

        const form = (
            <div style={{minWidth: '100%', height: '100%'}}>
                <Button label="New Field" onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%', color:"#8AA62F"}}  />

                <Dialog
                    title="Create New Field"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <div className="columns">
                        <NewFieldMap style={{margin: 0, padding: 0}} className="column is-9-desktop">
                            <div style={{height: `100%`}}>
                                <NewFieldMapComponent
                                    containerElement={
                                        <div style={{ height: `100%` }} />
                                    }
                                    mapElement={
                                        <div style={{ height: `100%` }} />
                                    }
                                    onMapLoad={this.handleMapLoad}
                                    onMapClick={this.handleMapClick}
                                    markers={this.state.markers}
                                    onOverlayComplete={this.handleOverlayComplete}
                                />
                            </div>
                        </NewFieldMap>
                        <div className="column is-3-desktop">
                            <form>
                                <RadioGroup
                                    label="Structure Type"
                                    name="fieldType"
                                    value={this.state.fieldType}
                                    onChange={this.handleChange}
                                >
                                    <FormControlLabel value="building" control={<Radio />} label="Building" />
                                    <FormControlLabel value="field" control={<Radio />} label="Field" />
                                </RadioGroup>
                            </form>
                        </div>
                    </div>
                    <form>
                        <TextField
                            hintText="Enter Name for new Field"
                            floatingLabelText="Enter Name for new Field"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name}
                            errorText={this.state.errors.name}/>

                    </form>
                    {!!this.state.errors.global && <p>this.state.errors.global</p>}
                    <p>{this.state.errors.global}</p>
                </Dialog>
            </div>
        );

        return (
            <div key={this.state.timestamp} style={{minWidth: '100%', height: '100%'}} >
                {form}
            </div>

        );
    }
}
CreateFieldModal = connect(null, {saveField})(CreateFieldModal);
export default CreateFieldModal;
