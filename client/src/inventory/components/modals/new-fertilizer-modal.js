/**
 * Created by Xingyu on 7/5/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField'
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import {SaveFertilizer} from '../../actions/fertilizer-actions';
import {fetchSuppliers} from '../../../finances/actions/supplier-actions';
import MenuItem from 'material-ui/MenuItem'
import NewSupplierModal from '../../../finances/components/NewSupplierModal';

/**
 * A modal form for creating new transplant items
 */
class CreateFertilizerModal extends Component {
    /**
     * Class constructor.
     */

    constructor(props) {
        super(props);

        this.state = {
            type: '',
            name: '',
            rate: '',
            ratio: '',
            tc: '',
            no3: '',
            nh4: '',
            k2o: '',
            h2o:'',
            p2o5: '',
            price: '',
            quantity: 1,
            quantityUnit:'n/a',
            errors: {},
            open: false,
            validated: false,
            loading: false,
            done: false,
            errorMessage:"",
            currency:'CAD'
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

    showError(e){
        this.setState({showError:true, errorMessage:e})
    }

    handleSubmit(e){
        e.preventDefault();

        //validation

        this.validateForm();

        let errors = this.state.errors;
        
        if(Object.keys(errors).length === 0 && errors.constructor === Object){
            //create first date in log
            const first_log = [{
                timestamp: Date.now(),
                value: this.state.quantity,
            }];

            //create seed
            const new_fertilizer = {
                name: this.state.name,
                log: first_log,
                quantity: this.state.quantity,
                unit: 'fertilizer',

                type: this.state.type,
                tc: this.state.tc,
                no3: this.state.no3,
                nh4: this.state.nh4,
                k2o: this.state.k2o,
                h2o:this.state.h2o,
                p2o5: this.state.p2o5,
                price: this.state.price,
                quantityUnit: this.state.quantityUnit,
                currency: this.state.currency
            };

            this.setState({loading: true});
            
            this.props.SaveFertilizer(new_fertilizer).then(
                (response) => {
                    this.setState({
                        name: "",
                        quantity:"",
                        unit: 'fertilizer',

                        type: '',
                        tc:'',
                        no3:'',
                        nh4:'',
                        k2o: '',
                        h2o:'',
                        p2o5: '',
                        price: '',                        
                    });
                }
            ).catch((err)=>{
                this.showError("Unable to create seed");
            });
            this.setState({done: true, loading: false});
            this.handleClose();

        }
    };

    validateForm(){
        if(!(this.state.type.length &&
            this.state.name.length &&
            this.state.price.length && 
            this.state.quantity.toString().length && 
            this.state.quantityUnit.length)){
            let errors = this.state.errors;

            if(!this.state.type.length){
                errors.type = "Quantity field is mandatory";

            }            
            
            if(!this.state.name.length){
                errors.name = "Quantity field is mandatory";
            }

            if(!this.state.price.length){
                errors.price = "Quantity field is mandatory";
            }            
            
            if(!this.state.quantityUnit.length){
                errors.quantityUnit = "Quantity unit field is mandatory";
            }

            if(!this.state.quantity.toString().length || this.state.quantity < 0){
                errors.quantity = "Quantity field is mandatory";
            }

            this.setState({errors});
        }
    }

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
                <FlatButton label="New Fertilizer" secondary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                <Dialog
                    title="Add Fertilizer to Inventory"
                    actions={actions}
                    modal={true}
                    autoScrollBodyContent={true}
                    open={this.state.open}>
                    <form>
                        <h3>Fertilizer Detail</h3>
                        <TextField
                            hintText="Enter Fertilizer Type (Compost, NPK, etc)"
                            floatingLabelText="Fertilizer Type"
                            name="type"
                            onChange={this.handleChange}
                            value={this.state.type}

                            fullWidth={true}
                            errorText={this.state.errors.crop}/>
                        <TextField
                            hintText="Enter Product Name"
                            floatingLabelText="Product Name"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name}

                            fullWidth={true}
                            errorText={this.state.errors.name}/>

                        <div className="columns">
                            <div className="column">
                                <TextField
                                    floatingLabelText="TC%"
                                    name="tc"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.tc}
                                    errorText={this.state.errors.tc}/>
                            </div>
                            <div className="column">
                                <TextField
                                    floatingLabelText="NO3%"
                                    name="no3"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.no3}
                                    errorText={this.state.errors.no3}/>
                            </div>
                            <div className="column">
                                <TextField
                                    floatingLabelText="NH4%"
                                    name="nh4"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.nh4}
                                    errorText={this.state.errors.nh4}/>
                            </div>
                            <div className="column">
                                <TextField
                                    floatingLabelText="H2O%"
                                    name="h2o"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.h2o}
                                    errorText={this.state.errors.h2o}/>
                            </div>                            
                            <div className="column">
                                <TextField
                                    floatingLabelText="K2O%"
                                    name="k2o"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.k2o}
                                    errorText={this.state.errors.k2o}/>
                            </div>
                            <div className="column">
                                <TextField
                                    floatingLabelText="P2O5%"
                                    name="p2o5"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.p2o5}
                                    errorText={this.state.errors.p2o5}/>
                            </div>
                        </div>
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
                            value={this.state.quantityUnit}
                            errorText={this.state.errors.quantityUnit}
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
            <div key={this.state.timestamp} style={{minWidth: '100%', height: '100%',overflowY:'scroll'}} >
                {form}
            </div>

        );
    }
    handleSelect(event, index, value){this.setState({quantityUnit: value});}
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currency,
    }
};


export default connect(mapStateToProps,{SaveFertilizer})(CreateFertilizerModal);