/**
 * Created by Xingyu on 6/29/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import {SaveSeed} from '../actions/seeds-post';
import styled from 'styled-components';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'


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
            crop: '',
            variety: '',
            weight: '',
            unit: 0,
            quantity: 1,
            errors: {},
            open: false,
            validated: false,
            loading: false,
            done: false,
            value: 0,
            price: '',
            store: '',
            product: ''
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
        console.log(e.currentTarget.name);
        console.log(e.currentTarget.value);
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
            const{name,crop,variety,weight,unit,quantity} = this.state;
            this.setState({loading: true});
            this.props.SaveSeed({name,crop,variety,weight,unit,quantity}).then(
                (response) => {console.log("should catch error here")}
            );
            this.setState({done: true, loading: false});
            this.handleClose();

        }




    };

    handleSelect(event, index, value){this.setState({value});}

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
                <FlatButton label="Add Seed" secondary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
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
                                    value={this.state.value}
                                    errorText={this.state.errors.value}
                                >
                                    <MenuItem value={0} label = "kg" primaryText="kg"/>
                                    <MenuItem value={1} label = "lb" primaryText="lb"/>
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

export default connect(null, {SaveSeed})(CreateFieldModal);
