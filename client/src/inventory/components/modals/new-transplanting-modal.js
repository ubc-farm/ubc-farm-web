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
import {SaveTransplant} from '../../actions/transplant-actions';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
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
            predictedYield:'',
            n:'',
            p:'',
            k:'',
            maturity:'',
            nutrientReqUnit:'',
            currency:'CAD',
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

        this.validateForm();
        //if valid, create post request
        var errors = this.state.errors;
        if(Object.keys(errors).length === 0 && errors.constructor === Object){
            //create first date in log
            const first_log = [{
                timestamp: Date.now(),
                value: this.state.quantity,
            }];

            //create transplant
            const new_transplant = {
                name: this.state.name,
                log: first_log,
                quantity: this.state.quantity,
                unit: this.state.unit,
                maturity:this.state.maturity,
                n:this.state.n,
                p:this.state.p,
                k:this.state.k,
                predictedYield:this.state.predictedYield,
                nutrientReqUnit:this.state.nutrientReqUnit,
                crop: this.state.crop,
                variety: this.state.variety,
                weight: this.state.weight,
                product: this.state.product,
                store: this.state.store,
                price: this.state.price,
                currency: this.state.currency                
            };
            debugger

            this.setState({loading: true});
            this.props.SaveTransplant(new_transplant).then(
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
            
            if(this.state.store.length == 0){
                errors.store = "This field is required";
            }

            this.setState({errors})
        }
    }

    handleSelect(event, index, value){this.setState({unit: value});}

    handleCurrencyChange(event, index, value){
        this.setState({currency: value});
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
                <FlatButton label="New Tranplant Item" secondary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                <Dialog
                    title="Add Transplant Item to Inventory"
                    actions={actions}
                    modal={true}
                    autoScrollBodyContent={true}
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
                            hintText="Enter Product name"
                            floatingLabelText="Product name"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name}
                            fullWidth={true}
                            errorText={this.state.errors.name}/>

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
                        <h3>Product Detail</h3>
                              <div className="columns">
                                    <div className="column is-8-desktop">
                                        <TextField
                                            hintText="Enter Price"
                                            floatingLabelText="Price"
                                            name="price"
                                            type="number"
                                            onChange={this.handleChange}
                                            fullWidth={true}
                                            value={this.state.price}
                                            errorText={this.state.errors.price}/>
                                    </div>
                                <div className="column is-4-desktop">

                                <SelectField
                                    floatingLabelText="Currency"
                                    onChange={this.handleCurrencyChange}
                                    id="currency"
                                    autoWidth={false}
                                    style={{width:"100%"}}
                                    value={this.state.currency}
                                    errorText={this.state.errors.currency}>
                                    {Object.keys(this.props.currencies).map(e=>
                                        <MenuItem value={e} 
                                        label={`${e} - ${this.props.currencies[e]}`} 
                                        primaryText={`${e} - ${this.props.currencies[e]}`}/>)
                                    }
                                </SelectField>
                            </div>
                         </div>
                         <div className="columns">
                             <div className="column">
                                <TextField
                                    hintText="Days to maturity"
                                    floatingLabelText="Days to maturity"
                                    name="maturity"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.maturity}
                                    errorText={this.state.errors.maturity}/>
                            </div>
                             <div className="column">
                                    <TextField
                                        hintText="Predicted yield"
                                        floatingLabelText="Predicted yield"
                                        name="predictedYield"
                                        type="number"
                                        onChange={this.handleChange}
                                        fullWidth={true}
                                        value={this.state.predictedYield}
                                        errorText={this.state.errors.predictedYield}/>
                                </div>                       
                        </div>
                        <h3>Nutrient req</h3>
                        <div className="columns">
                            <div className="column">
                                <TextField
                                    floatingLabelText="N"
                                    name="n"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.n}/>
                            </div>
                            <div className="column">
                                <TextField
                                    floatingLabelText="P"
                                    name="p"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.p}/>
                            </div>
                            <div className="column">
                                <TextField
                                    floatingLabelText="K"
                                    name="k"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.k}/>
                            </div>
                        </div>
                        <TextField
                            floatingLabelText="Nutrient req unit"
                            name="nutrientReqUnit"
                            onChange={this.handleChange}
                            fullWidth={true}
                            value={this.state.nutrientReqUnit}/>
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
        currencies: state.currency,
    }
};



export default connect(mapStateToProps, {SaveTransplant})(CreateTransplantModal);

