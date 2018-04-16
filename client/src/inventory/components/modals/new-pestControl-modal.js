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
import {SavePesticide} from '../../actions/pest-actions';
import MenuItem from 'material-ui/MenuItem'
import NewSupplierModal from '../../../finances/components/NewSupplierModal';
import SelectField from 'material-ui/SelectField'
import PropTypes from 'prop-types';

/**
 * A modal for creating pest control items
 */
class CreatePesticideModal extends Component{

    constructor(props){
        super(props);

        this.state = {
            type:'',
            name: '',
            rate: '',
            ratio: '',
            entry: '',
            price:'',
            currency:'CAD',
            harvest: '',
            active: '',
            location:'',
            percentage: '',

            errors: {},
            open: false,
            validated: false,
            loading: false,
            done: false,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
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

    handleFieldChange(event,index,value){
        this.setState({location:value});
    }

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


            //create pesticide
            const new_pesticide = {
                name: this.state.name,
                log: first_log,
                quantity: this.state.quantity,
                unit: 'pesticide',

                type: this.state.type,
                entry: this.state.entry,
                harvest: this.state.harvest,
                active: this.state.active,
                percentage: this.state.percentage,
                location:this.props.field[this.state.location].name,
                price:this.state.price,
                currency:this.state.currency
            };

            this.setState({loading: true});
            this.props.SavePesticide(new_pesticide).then(
                (response) => {console.log("should catch error here")}
            );
            this.setState({done: true, loading: false});
            this.handleClose();

        }
    }

    validateForm(){

        /*
        type
        name
        rate
        ratio
        entry
        harvest
        active
        percentage
        */

        //lenght grater than 0
        let validationRulesLenghtG0 = ['type','name','entry','harvest','active','percentage','price'];
        let errors = this.state.errors;
        validationRulesLenghtG0.forEach((rule) =>{
            if(!this.state[rule].length){
                errors[rule] = "This field is mandatory";
            }
        });
        this.setState({errors});
    }

    handleCurrencyChange(event, index, value){
        this.setState({currency: value});
    }


    render(){
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
                <FlatButton label="New Pest Control Item" secondary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                <Dialog
                    title="Add Pest Control Item to Inventory"
                    actions={actions}
                    modal={true}
                    autoScrollBodyContent={true}
                    open={this.state.open}
                >
                    <form>
                        <h3>Pest Control Detail</h3>
                        <TextField
                            hintText="Enter Pest Control Type"
                            floatingLabelText="Pest Control Type"
                            name="type"
                            onChange={this.handleChange}
                            value={this.state.type}
                            fullWidth={true}
                            errorText={this.state.errors.type}/>
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
                                    hintText="Enter Entry Interval"
                                    floatingLabelText="Entry Interval"
                                    name="entry"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.entry}
                                    errorText={this.state.errors.entry}/>
                            </div>
                            <div className="column">
                                <TextField
                                    hintText="Enter Harvest Interval"
                                    floatingLabelText="Harvest Interval"
                                    name="harvest"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.harvest}
                                    errorText={this.state.errors.harvest}/>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <TextField
                                    hintText="Enter Active Ingredient"
                                    floatingLabelText="Active Ingredient"
                                    name="active"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.active}
                                    errorText={this.state.errors.active}/>
                            </div>
                            <div className="column">
                                <TextField
                                    hintText="Enter Active Ingredient Percentage"
                                    floatingLabelText="Active Ingredient Percentage"
                                    name="percentage"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.percentage}
                                    errorText={this.state.errors.percentage}/>
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
        currencies: state.currency,
        field: state.fields
    }
};

export default connect(mapStateToProps,{SavePesticide})(CreatePesticideModal);
