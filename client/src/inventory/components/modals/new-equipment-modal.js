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
import {SaveEquipment} from '../../actions/equipment-actions';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

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
            unit: 'n/a',
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
        this.handleSelect = this.handleSelect.bind(this);
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

    handleSelect(event, index, value){this.setState({unit: value});}

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

            //create default supplier
            const farm_supplier = {
               name: "UBCFarm",
                address: {
                   number: "3461",
                    street: "Ross Drive",
                    postal: "V6T 1W5",
                },
                telephone: 6048225092,
                quantity: this.state.quantity,
                unit: this.state.unit,
                per_unit_quantity: 1,
                per_unit_unit: "",
            };

            const new_equipment = {
                name: this.state.name,
                quantity: this.state.quantity,
                unit: this.state.unit,
                suppliers:[farm_supplier],
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
                    open={this.state.open}
                >
                    <form>
                        <p>Please fill all of the fields below</p>
                        <TextField
                            hintText="Enter Equipment Name"
                            floatingLabelText="Product Name"
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
                                    onChange={this.handleChange}
                                    value={this.state.quantity}
                                    fullWidth={true}
                                    errorText={this.state.errors.quantity}/>
                            </div>
                            <div className="column is-4">

                                <SelectField
                                    floatingLabelText="Unit"
                                    hintText="Select Unit"
                                    onChange={this.handleSelect}
                                    name="unit"
                                    autoWidth={false}
                                    style={{width:"100%"}}
                                    value={this.state.unit}
                                    errorText={this.state.errors.unit}
                                >
                                    <MenuItem value="n/a" label="n/a" primaryText="n/a"/>
                                    <MenuItem value="kg" label="kg" primaryText="kg"/>
                                    <MenuItem value="lb" label="lb" primaryText="lb"/>
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

export default connect(null, {SaveEquipment})(CreateEquipmentModal);