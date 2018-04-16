/**
 * Created by Xingyu on 7/5/2017.
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
import {fetchSuppliers} from '../../../finances/actions/supplier-actions'
import NewSupplierModal from '../../../finances/components/NewSupplierModal';

let shortid = require('shortid');

/**
 * A modal form for creating new transplant items
 */
class CreateEquipmentModal extends Component {
    /**
     * Class constructor.
     */

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            quantity: '',
            unit: '',
            per_unit_quantity: '',
            per_unit_unit: '',
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
        this.handleSelect = this.handleSelect.bind(this);
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

    handleSelect(event, index, value){this.setState({unit: value});}
    handleSelectSupplier(event, index, value){
        console.log(value);
        this.setState({supplier: value});
    };

    handleSubmit(e){
        e.preventDefault();
        this.validateForm();

        let errors = this.state.errors;
        
        if(Object.keys(errors).length === 0 && errors.constructor === Object){
            //create first date in log
            const first_log = [{
                timestamp: Date.now(),
                value: this.state.quantity,
            }];


            const new_equipment = {
                name: this.state.name,
                quantity: this.state.quantity,
                unit: this.state.unit,
                location:this.props.field[this.state.location].name,
                log: first_log,
            };

            this.setState({loading: true});
            this.props.SaveEquipment(new_equipment).then(
                (response) => {console.log("should catch error here")}
            );
            this.setState({done: true, loading: false});
            this.handleClose();

        }
    };

//form validation
    validateForm(){
   
        let validationRulesLenghtMoreThan0 = ['name','quantity'];
        let errors = this.state.errors;
        validationRulesLenghtMoreThan0.forEach((rule) =>{
            if(!this.state[rule].length){
                errors[rule] = "This field is mandatory";
            }
        });
        this.setState({errors});
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
                <FlatButton label="New Equipment" secondary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                <Dialog
                    title="Add New Equipment to Inventory"
                    actions={actions}
                    modal={true}
                    autoScrollBodyContent={true}
                    open={this.state.open}
                >
                    <Divider/>
                    <form>
                       <p>Equipment name</p>
                        <TextField
                            hintText="Enter Equipment name"
                            floatingLabelText="Equipment name"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name}
                            fullWidth={true}
                            errorText={this.state.errors.name}/>

                        <div className="columns">
                            <div className="column is-8">
                                <TextField
                                    hintText="Enter Quantity"
                                    floatingLabelText="Quantity"
                                    name="quantity"
                                    type="number"
                                    onChange={this.handleChange}
                                    value={this.state.quantity}
                                    fullWidth={true}
                                    errorText={this.state.errors.quantity}/>
                            </div>
                            <div className="column is-4">

                                <TextField
                                    hintText="Enter Unit (lb, boxes, litres, etc)"
                                    floatingLabelText="Unit"
                                    name="unit"
                                    onChange={this.handleChange}
                                    value={this.state.unit}
                                    fullWidth={true}
                                    errorText={this.state.errors.unit}/>
                            </div>
                        </div>
                        <p>Unit Details (optional)</p>
                        <div className="columns">
                            <div className="column is-8">
                                <TextField
                                    hintText="Enter Quantity per Unit"
                                    floatingLabelText="Quantity per Unit"
                                    name="per_unit_quantity"
                                    type="number"
                                    onChange={this.handleChange}
                                    value={this.state.per_unit_quantity}
                                    fullWidth={true}
                                    errorText={this.state.errors.per_unit_quantity}/>
                            </div>
                            <div className="column is-4">

                                <TextField
                                    hintText="Enter Base Unit"
                                    floatingLabelText="Base Unit"
                                    name="per_unit_unit"
                                    onChange={this.handleChange}
                                    value={this.state.per_unit_unit}
                                    fullWidth={true}
                                    errorText={this.state.errors.per_unit_unit}/>
                            </div>
                        </div>
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

const mapStateToProps = (state) => {
    return {
        suppliers: state.suppliers,
        field: state.fields
    }
};

export default connect(mapStateToProps,{SaveEquipment})(CreateEquipmentModal);