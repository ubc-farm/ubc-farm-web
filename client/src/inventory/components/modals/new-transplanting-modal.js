/**
 * Created by Xingyu on 7/5/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/Progress';
import {connect} from 'react-redux';
import {SaveTransplant} from '../../actions/transplant-actions';
import {fetchSuppliers} from '../../../finances/actions/supplier-actions';
import MenuItem from 'material-ui/Menu'
import NewSupplierModal from '../../../finances/components/NewSupplierModal';

/**
 * A modal form for creating new transplant items
 */
class CreateTransplantModal extends Component {
    /**
     * Class constructor.
     */

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            crop: '',
            variety: '',
            weight: '',
            quantity: 1,
            errors: {},
            open: false,
            validated: false,
            loading: false,
            done: false,
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

            //create seed
            const new_transplant = {
                name: this.state.crop,
                suppliers:[first_supplier],
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
            this.props.SaveTransplant(new_transplant).then(
                (response) => {console.log("should catch error here")}
            );
            this.setState({done: true, loading: false});
            this.handleClose();

        }




    };

    handleSelect(event, index, value){this.setState({unit: value});}

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
                <Button label="New Tranplant Item" secondary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                <Dialog
                    title="Add Transplant Item to Inventory"
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
                                <TextField
                                    select
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
                                </TextField>
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
                        <h3>Product Detail</h3>
                        <TextField
                            hintText="Enter Product Name"
                            floatingLabelText="Product"
                            name="product"
                            onChange={this.handleChange}
                            fullWidth={true}
                            value={this.state.product}
                            errorText={this.state.errors.product}/>
                        <TextField
                            hintText="Enter Store Name"
                            floatingLabelText="Store"
                            name="store"
                            onChange={this.handleChange}
                            fullWidth={true}
                            value={this.state.store}
                            errorText={this.state.errors.store}/>

                        <TextField
                            hintText="Enter Price"
                            floatingLabelText="Price"
                            name="price"
                            type="number"
                            onChange={this.handleChange}
                            fullWidth={true}
                            value={this.state.price}
                            errorText={this.state.errors.price}/>

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

CreateTransplantModal.propTypes={
    suppliers: PropTypes.array.isRequired,
    fetchSuppliers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        suppliers: state.suppliers,

    }
};

export default connect(mapStateToProps, {fetchSuppliers, SaveTransplant})(CreateTransplantModal);

