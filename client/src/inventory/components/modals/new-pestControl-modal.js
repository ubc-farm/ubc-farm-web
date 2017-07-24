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
            errors.crop  = "This field is Required";
        this.setState({errors});

        //if valid, create post request
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            const{type,name,rate,ratio,location,entry,harvest,active,percentage} = this.state;
            this.setState({loading: true});
            this.props.SavePesticide({type,name,rate,ratio,location,entry,harvest,active,percentage}).then(
                (response) => {console.log("should catch error here")}
            );
            this.setState({done: true, loading: false});
            this.handleClose();

        }
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

export default connect(null, {SavePesticide})(CreatePesticideModal);