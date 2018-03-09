/**
 * Created by Xingyu on 6/29/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import {SaveSeed} from '../actions/seeds-post';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import NewSupplierModal from '../../finances/components/NewSupplierModal';


//STATIC STYLES - [TODO: CONSOLIDATE STYLINGS]

let shortid = require('shortid');

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class CreateSeedModal extends Component {
    /**
     * Class constructor.
     */

    constructor(props) {
        super(props);

        this.state = {
            crop: '',
            variety: '',
            weight: '',
            quantity: 1,
            errors: {},
            open: false,
            validated: false,
            loading: false,
            unit: 'kg',
            price: '',
            store: '',
            product: ''
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelectSupplier = this.handleSelectSupplier.bind(this);
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
    handleSelectSupplier(event, index, value){
        console.log(value);
        this.setState({supplier: value});
    };
    handleSubmit(e){

        e.preventDefault();

        //validation
        let errors = {};
        if(this.state.crop === '')
            errors.crop  = "This field is Required";
        this.setState({errors});

        this.validateForm();
        //if valid, create post request
        
        var erros = this.state.errors;
        if(Object.keys(errors).length === 0 && errors.constructor === Object){
            //create first date in log
            const first_log = [{
                timestamp: Date.now(),
                value: this.state.quantity,
            }];


            //create seed
            const new_seed = {
                name: this.state.crop,
                log: first_log,
                quantity: this.state.quantity,
                unit: this.state.unit,

                crop: this.state.crop,
                variety: this.state.variety,
                weight: this.state.weight,
                product: this.state.product,
                store: this.state.store,
                price: this.state.price
            };

            this.setState({loading: true});
            this.props.SaveSeed(new_seed).then(
                (response) => {console.log("should catch error here")}
            );
            this.setState({done: true, loading: false});
            this.handleClose();

        }
    };

    validateForm(){
        if(!(this.state.crop && this.state.variety && this.state.quantity && this.state.weight)){
            var errors = {};

            if(this.state.crop.length == 0){
                errors.crop = "This field is required";
            }

            if(this.state.variety.length == 0){
                errors.variety = "This field is required";
            }

            if(this.state.quantity.length == 0){
                errors.quantity = "This field is required";
            }

            if(this.state.weight.length == 0){
                errors.weight = "This field is required";
            }

            if(this.state.price.length == 0){
                errors.price = "This field is required";
            }

            this.setState({errors})
        }
    }

    handleSelect(event, index, value){this.setState({unit: value});}

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label={this.state.loading ? '' : "Submit"}
                primary={true}
                disabled={false}
                onTouchTap={this.handleSubmit}
                icon={this.state.loading ? <CircularProgress /> : ''}
            />,
        ];

        const form = (
            <div style={{minWidth: '100%', height: '100%'}}>
                <FlatButton label="New Seed" secondary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                <Dialog
                    title="Add Seed to Inventory"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                            <form>
                                <h3>Crop Detail</h3>
                                <TextField
                                    hintText="Enter Crop Type"
                                    floatingLabelText="Crop Type"
                                    name="crop"
                                    onChange={this.handleChange}
                                    value={this.state.crop}

                                    fullWidth={true}
                                    errorText={this.state.errors.crop}/>
                                <TextField
                                    hintText="Enter Variety"
                                    floatingLabelText="Variety"
                                    name="variety"
                                    onChange={this.handleChange}
                                    value={this.state.variety}
                                    fullWidth={true}
                                    errorText={this.state.errors.variety}/>

                                <TextField
                                    hintText="Enter Price"
                                    floatingLabelText="Price"
                                    name="price"
                                    onChange={this.handleChange}
                                    value={this.state.price}
                                    fullWidth={true}
                                    errorText={this.state.errors.price}/>

                                <div className="columns">
                                    <div className="column is-8-desktop">
                                <TextField
                                    hintText="Enter Package Weight"
                                    floatingLabelText="Package Weight"
                                    name="weight"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.weight}
                                    errorText={this.state.errors.weight}/>
                                </div>
                                    <div className="column is-4-desktop">
                                <SelectField
                                    floatingLabelText="Measurement unit"
                                    onChange={this.handleSelect}
                                    name="unit"
                                    autoWidth={false}
                                    style={{width:"100%"}}
                                    value={this.state.unit}
                                    errorText={this.state.errors.unit}
                                >
                                    <MenuItem value="kg" label="kg" primaryText="kg"/>
                                    <MenuItem value="lb" label="lb" primaryText="lb"/>
                                </SelectField>
                                    </div>
                                </div>
                                <TextField
                                    hintText="Enter Quantity"
                                    floatingLabelText="Quantity"
                                    name="quantity"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.quantity}
                                    errorText={this.state.errors.quantity}/>

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

export default connect(()=>{}, {SaveSeed})(CreateSeedModal);
