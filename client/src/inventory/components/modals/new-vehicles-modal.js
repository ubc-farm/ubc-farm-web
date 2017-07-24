/**
 * Created by Xingyu on 7/5/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import {SaveVehicle} from '../../actions/vehicles-action';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

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
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            errors.name  = "This field is Required";
        this.setState({errors});


        //if valid, create post request
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            const{brand,model,year,price,quantity} = this.state;
            this.setState({loading: true});
            this.props.SaveVehicle({brand,model,year,price,quantity}).then(
                (response) => {console.log("should catch error here")}
            );
            this.setState({done: true, loading: false});
            this.handleClose();

        }




    };

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

export default connect(null, {SaveVehicle})(CreateVehicleModal);