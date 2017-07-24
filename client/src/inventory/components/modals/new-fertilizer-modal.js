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
import {SaveFertilizer} from '../../actions/fertilizer-actions';
import MenuItem from 'material-ui/MenuItem'

let shortid = require('shortid');

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
            p2o5: '',
            price: '',
            quantity: 1,
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
        if(this.state.type === '')
            errors.type  = "This field is Required";
        this.setState({errors});


        //if valid, create post request
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            const{type,name,ratio,rate,tc,no3,nh4,k2o,p2o5,price,quantity} = this.state;
            this.setState({loading: true});
            this.props.SaveFertilizer({type,name,ratio,rate,tc,no3,nh4,k2o,p2o5,price,quantity}).then(
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
                <FlatButton label="New Fertilizer" secondary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                <Dialog
                    title="Add Fertilizer to Inventory"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <form>
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
                        <TextField
                            hintText="Enter Mix Ratio"
                            floatingLabelText="Mix Ratio"
                            name="ratio"
                            onChange={this.handleChange}
                            value={this.state.ratio}

                            fullWidth={true}
                            errorText={this.state.errors.ratio}/>
                        <TextField
                            hintText="Enter Application Rate"
                            floatingLabelText="Application Rate"
                            name="rate"
                            onChange={this.handleChange}
                            value={this.state.rate}

                            fullWidth={true}
                            errorText={this.state.errors.rate}/>
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

                        <TextField
                            hintText="Enter Price"
                            floatingLabelText="Price"
                            name="price"
                            type="number"
                            onChange={this.handleChange}
                            fullWidth={true}
                            value={this.state.price}
                            errorText={this.state.errors.price}/>
                        <TextField
                            hintText="Enter Quantity"
                            floatingLabelText="Quantity"
                            name="quantity"
                            type="number"
                            onChange={this.handleChange}
                            fullWidth={true}
                            value={this.state.quantity}
                            errorText={this.state.errors.quantity}/>



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

export default connect(null, {SaveFertilizer})(CreateFertilizerModal);