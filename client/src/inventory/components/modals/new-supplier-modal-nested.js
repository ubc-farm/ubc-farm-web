/**
 * Created by Xingyu on 7/27/2017.
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
import {SaveEquipment} from '../../actions/equipment-actions';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import NewSupplierModal from '../../../finances/components/NewSupplierModal';
import {fetchSuppliers} from '../../../finances/actions/supplier-actions'

let shortid = require('shortid');

/**
 * A modal form for creating new transplant items
 */
class AddSupplierModal extends Component {
    /**
     * Class constructor.
     */

    componentDidMount(){
        this.props.fetchSuppliers();
    }

    constructor(props) {
        super(props);

        this.state = {
            supplier: {},
            quantity: '',
            unit: '',
            per_unit_quantity: '',
            per_unit_unit: '',
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
        this.handleSelectUnit = this.handleSelectUnit.bind(this);
        this.handleSelectBaseUnit = this.handleSelectBaseUnit.bind(this);
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

    handleSelectUnit(event, index, value){this.setState({unit: value});}
    handleSelectSupplier(event, index, value){this.setState({supplier: value});}
    handleSelectBaseUnit(event, index, value){this.setState({per_unit_unit: value});}


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


            this.setState({loading: true});
            this.props.SaveEquipment(new_equipment).then(
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
                <FlatButton label="Add Supplier" primary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                <Dialog
                    title="Add Supplier"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <form>
                        <p>Please select an existing supplier or create a new one</p>
                        <SelectField
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
                        </SelectField>

                        <NewSupplierModal/>

                        <div className="columns">
                            <div className="column is-8">
                                <TextField
                                    hintText="Enter Quantity"
                                    floatingLabelText="Quantity"
                                    name="quantity"
                                    onChange={this.handleChange}
                                    value={this.state.quantity}
                                    fullWidth={true}
                                    errorText={this.state.errors.quantity}/>
                            </div>
                            <div className="column is-4">
                                <SelectField
                                    floatingLabelText="Unit"
                                    hintText="Select Unit"
                                    onChange={this.handleSelectUnit}
                                    name="unit"
                                    autoWidth={false}
                                    style={{width:"100%"}}
                                    value={this.state.unit}
                                    errorText={this.state.errors.unit}
                                >
                                    <MenuItem value="kg" label="kg" primaryText="kg"/>
                                    <MenuItem value="lb" label="lb" primaryText="lb"/>
                                    <MenuItem value="custom" label="custom" primaryText="custom"/>
                                </SelectField>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column is-8">
                                <TextField
                                    hintText="Enter Quantity per Unit"
                                    floatingLabelText="Quantity per Unit"
                                    name="per_unit_quantity"
                                    onChange={this.handleChange}
                                    value={this.state.per_unit_quantity}
                                    fullWidth={true}
                                    errorText={this.state.errors.per_unit_quantity}/>
                            </div>
                            <div className="column is-4">
                                <SelectField
                                    floatingLabelText="Base Unit"
                                    hintText="Select Base Unit"
                                    onChange={this.handleSelectBaseUnit}
                                    name="per_unit_unit"
                                    autoWidth={false}
                                    style={{width:"100%"}}
                                    value={this.state.per_unit_unit}
                                    errorText={this.state.errors.per_unit_unit}
                                >
                                    <MenuItem value="kg" label="kg" primaryText="kg"/>
                                    <MenuItem value="lb" label="lb" primaryText="lb"/>
                                    <MenuItem value="object" label="object" primaryText="object"/>
                                </SelectField>
                            </div>
                        </div>

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

AddSupplierModal.propTypes={
    suppliers: PropTypes.array.isRequired,
    fetchSuppliers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        suppliers: state.suppliers,

    }
};

export default connect(mapStateToProps, {fetchSuppliers, SaveEquipment})(AddSupplierModal);