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
import {SaveHarvested} from '../../actions/harvested_actions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


let shortid = require('shortid');

/**
 * A modal form for creating new transplant items
 */
class CreatedHarvestedModal extends Component {
    /**
     * Class constructor.
     */

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            variety: '',
            price: '',
            quantity: '',
            unit: '',
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
            const{name,variety,price,quantity,unit} = this.state;
            this.setState({loading: true});
            this.props.SaveHarvested({name,variety,price,quantity,unit}).then(
                (response) => {console.log("should catch error here")}
            );
            this.setState({done: true, loading: false});
            this.handleClose();

        }




    };

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
                <FlatButton label="New Harvested Item" secondary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                <Dialog
                    title="Add Harvested Item"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <form>
                        <TextField
                            hintText="Enter Item Name"
                            floatingLabelText="Item Name"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name}
                            fullWidth={true}
                            errorText={this.state.errors.name}/>
                        <TextField
                            hintText="Enter Product Variety (if applicable)"
                            floatingLabelText="Product Variety"
                            name="variety"
                            onChange={this.handleChange}
                            value={this.state.variety}
                            fullWidth={true}
                            errorText={this.state.errors.variety}/>
                        <TextField
                            hintText="Enter Unit Price"
                            floatingLabelText="Unit Price"
                            name="price"
                            type="number"
                            onChange={this.handleChange}
                            value={this.state.price}
                            fullWidth={true}
                            errorText={this.state.errors.price}/>
                        <div className="columns">
                            <div className="column is-8-desktop">
                                <TextField
                                    hintText="Enter Quantity"
                                    floatingLabelText="Quantity"
                                    name="quantity"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.quantity}
                                    errorText={this.state.errors.quantity}/>
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

export default connect(null, {SaveHarvested})(CreatedHarvestedModal);