/**
 * Created by Xingyu on 7/5/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import {SaveVehicle} from '../../actions/vehicles-action';
import {fetchSuppliers} from '../../../finances/actions/supplier-actions';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import NewSupplierModal from '../../../finances/components/NewSupplierModal';

let shortid = require('shortid');

/**
 * A modal form for creating new transplant items
 */
class CreateVehicleModal extends Component {
    /**
     * Class constructor.
     */

    constructor(props) {
        super(props);

        this.state = {
            brand: '',
            model: '',
            year:'',
            price: '',
            quantity: '',
            errors: {},
            open: false,
            validated: false,
            loading: false,
            done: false,
            location:'',
            supplier: '',
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSelectSupplier = this.handleSelectSupplier.bind(this);
    };

    handleOpen(){
        this.setState({open: true});
    };

    handleClose(){
        this.setState({open: false, name: ''});
    };
    handleFieldChange(event,index,value){
        this.setState({location:value});
    }
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
        //create first date in log
    const log = [{
       timestamp: Date.now(),
        value: this.state.quantity,
    }];

    this.validateForm();

    let errors = this.state.errors;
    
    if(Object.keys(errors).length === 0 && errors.constructor === Object){
        //create vehicle
            const new_vehicle = {
                // name: this.state.model,
                log: log,
                quantity: this.state.quantity,
                unit: 'vehicle',
    
                brand: this.state.brand,
                model: this.state.model,
                year: this.state.year,
                location:this.props.field[this.state.location].name,
                price: this.state.price,
            };
    
    
            this.setState({loading: true});
            this.props.SaveVehicle(new_vehicle).then(
                (response) => {
                    this.setState({brand:"",quantity:"",year:"",model:""});
                }
            ).catch((error)=>{
                console.log("There was an error trying to create new vehcile "+error)
            });
            this.setState({done: true, loading: false});
            this.handleClose();
        }

        
    };


    validateForm(){
        if(!(this.state.quantity.length && this.state.model.length && this.state.brand.length && this.state.year.length)){
            let errors = this.state.errors;
            if(!this.state.quantity.length){
                errors.quantity = "Quantity field is mandatory";
                console.log("The quantity is 0");

            }

            if(!this.state.brand.length){   
                errors.brand = "Brand field is mandatory"; 
            }

            if(!this.state.model.length){
                errors.model = "Model field is mandatory";
            }
            if(!this.state.price.length && this.state.price == 0){
                errors.price = "Enter correct price";
            }
            if(this.state.year.length != 4){
                errors.year = "Fill out a valid year"
            }

            this.setState({errors});


        }
    }

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
                <FlatButton label="New Vehicle" secondary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                <Dialog
                    title="Add Vehicle to Inventory"
                    actions={actions}
                    autoScrollBodyContent={true}
                    modal={true}
                    open={this.state.open}
                >
                    <form>
                        <h3>Vehicle Detail</h3>
                        <TextField
                            hintText="Enter Vehicle Brand"
                            floatingLabelText="Vehicle Brand"
                            name="brand"
                            onChange={this.handleChange}
                            value={this.state.brand}
                            fullWidth={true}
                            errorText={this.state.errors.brand}/>
                        <TextField
                            hintText="Enter Vehicle Model"
                            floatingLabelText="Vehicle Model"
                            name="model"
                            onChange={this.handleChange}
                            value={this.state.model}
                            fullWidth={true}
                            errorText={this.state.errors.model}/>
                        <TextField
                            hintText="Enter Year of Production"
                            floatingLabelText="Year of Production"
                            name="year"
                            onChange={this.handleChange}
                            value={this.state.year}
                            fullWidth={true}
                            errorText={this.state.errors.year}/>
                        <TextField
                            hintText="Enter Price"
                            floatingLabelText="Price"
                            name="price"
                            onChange={this.handleChange}
                            value={this.state.price}
                            fullWidth={true}
                            errorText={this.state.errors.price}/>
                        <TextField
                            hintText="Enter Quantity (no commas)"
                            floatingLabelText="Quantity"
                            name="quantity"
                            type="number"
                            onChange={this.handleChange}
                            value={this.state.quantity}
                            fullWidth={true}
                            errorText={this.state.errors.quantity}/>
                            <SelectField
                                        floatingLabelText="Location"
                                        onChange={this.handleFieldChange}
                                        name="location"
                                        autoWidth={false}
                                        style={{width:"100%"}}
                                        value={this.state.location}
                                        errorText={this.state.errors.location}
                                        >
                                        {Object.keys(this.props.field).map((e)=>{
                                        return (<MenuItem value={e} 
                                        label={`${this.props.field[e].name}`}
                                        primaryText={`${e} - ${this.props.field[e].name}`} />);
                                        })}
                            </SelectField>

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

function mapStateToProps(state){
    return{
        field: state.fields

    };
}
export default connect(mapStateToProps, {fetchSuppliers, SaveVehicle})(CreateVehicleModal);