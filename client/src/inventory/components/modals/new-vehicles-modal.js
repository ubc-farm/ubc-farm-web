/**
 * Created by Xingyu on 7/5/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/Progress';
import {connect} from 'react-redux';
import {SaveVehicle} from '../../actions/vehicles-action';
import {fetchSuppliers} from '../../../finances/actions/supplier-actions';
import MenuItem from 'material-ui/Menu'
import NewSupplierModal from '../../../finances/components/NewSupplierModal';

let shortid = require('shortid');

/**
 * A modal form for creating new transplant items
 */
class CreateVehicleModal extends Component {
    /**
     * Class constructor.
     */

    componentDidMount(){
        this.props.fetchSuppliers();
    }

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
            supplier: '',
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        if(this.state.name === '')
            errors.name  = "This field is Required";
        this.setState({errors});


        //if valid, create post request
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            //create first date in log
            const first_log = [{
               timestamp: Date.now(),
                value: this.state.quantity,
            }];

            //create supplier
            const first_supplier = this.props.suppliers[this.state.supplier];
            first_supplier.quantity = parseInt(this.state.quantity);
            first_supplier.unit = this.state.unit;

            //create vehicle
            const new_vehicle = {
                name: this.state.model,
                suppliers:[first_supplier],
                log: first_log,
                quantity: this.state.quantity,
                unit: 'vehicle',

                brand: this.state.brand,
                model: this.state.model,
                year: this.state.year,
                price: this.state.price,
            };


            this.setState({loading: true});
            this.props.SaveVehicle(new_vehicle).then(
                (response) => {console.log("should catch error here")}
            );
            this.setState({done: true, loading: false});
            this.handleClose();

        }




    };

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
                <Button label="New Vehicle" secondary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                <Dialog
                    title="Add Vehicle to Inventory"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <form>
                        <p>Supplier Detail</p>
                        <TextField
                            select
                            floatingLabelText="Existing Supplier"
                            hintText="Select Supplier"
                            name="supplier"
                            autoWidth={false}
                            style={{width:"100%"}}
                            value={this.state.supplier}
                            onChange={this.handleSelectSupplier}
                            errorText={this.state.errors.supplier}
                        >
                            {this.props.suppliers.map((supplier,index) => (
                                <MenuItem key={supplier._id} value={index} label={supplier.name} primaryText={supplier.name} />
                            ))}
                        </TextField>
                        <div  style={{textAlign: 'center',padding:'10px'}}>
                            <p>-OR-</p>
                        </div>
                        <NewSupplierModal/>

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

CreateVehicleModal.propTypes={
    suppliers: PropTypes.array.isRequired,
    fetchSuppliers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        suppliers: state.suppliers,

    }
};

export default connect(mapStateToProps, {fetchSuppliers, SaveVehicle})(CreateVehicleModal);