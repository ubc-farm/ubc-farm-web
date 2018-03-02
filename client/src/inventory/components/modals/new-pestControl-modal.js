/**
 * Created by Xingyu on 7/5/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/Progress';
import {connect} from 'react-redux';
import {SavePesticide} from '../../actions/pest-actions';
import {fetchSuppliers} from '../../../finances/actions/supplier-actions';
import MenuItem from 'material-ui/Menu'
import NewSupplierModal from '../../../finances/components/NewSupplierModal';
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
            location: '',
            entry: '',
            harvest: '',
            active: '',
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSupplier = this.handleSelectSupplier.bind(this);

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

            //create pesticide
            const new_pesticide = {
                name: this.state.name,
                suppliers:[first_supplier],
                log: first_log,
                quantity: this.state.quantity,
                unit: 'pesticide',

                type: this.state.type,
                rate: this.state.rate,
                ratio: this.state.ratio,
                location: this.state.location,
                entry: this.state.entry,
                harvest: this.state.harvest,
                active: this.state.active,
                percentage: this.state.percentage,
            };

            this.setState({loading: true});
            this.props.SavePesticide(new_pesticide).then(
                (response) => {console.log("should catch error here")}
            );
            this.setState({done: true, loading: false});
            this.handleClose();

        }
    }
    render(){
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
                <Button label="New Pest Control Item" secondary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                <Dialog
                    title="Add Pest Control Item to Inventory"
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
                                    hintText="Enter Application Rate"
                                    floatingLabelText="Application Rate"
                                    name="rate"
                                    type="number"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.rate}
                                    errorText={this.state.errors.rate}/>
                            </div>
                            <div className="column">
                                <TextField
                                    hintText="Enter Mixing Ratio"
                                    floatingLabelText="Mix Ratio (Water : Mix)"
                                    name="ratio"
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                    value={this.state.ratio}
                                    errorText={this.state.errors.ratio}/>
                            </div>
                        </div>
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
CreatePesticideModal.propTypes={
    suppliers: PropTypes.array.isRequired,
    fetchSuppliers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        suppliers: state.suppliers,

    }
};

export default connect(mapStateToProps, {fetchSuppliers, SavePesticide})(CreatePesticideModal);
