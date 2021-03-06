/**
 * Created by Xingyu on 7/27/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import {SaveClient} from '../../actions/client-actions';

/**
 * A modal form for creating new Client object
 */
class NewClientModal extends Component {
    /**
     * Class constructor.
     */

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            number: '',
            street: '',
            postal: '',
            city: '',
            telephone: '',
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
            const new_client = {
                name: this.state.name,
                address:
                    {
                        number: this.state.number,
                        street: this.state.street,
                        postal: this.state.postal,
                        city: this.state.city,
                    },
                telephone: this.state.telephone,
            };

            this.setState({loading: true});
            this.props.SaveClient(new_client).then(
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

        return (
            <div key={this.state.timestamp}>
                <FlatButton label="New Client" primary={true} onTouchTap={this.handleOpen} style={{minWidth: '100%', height: '100%'}}  />
                <Dialog
                    title="Add Client"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <form>
                        <TextField
                            hintText="Enter Client Name"
                            floatingLabelText="Client Name"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name}
                            fullWidth={true}
                            errorText={this.state.errors.name}/>
                        <div className="columns">
                            <div className="column">
                                <TextField
                                    hintText="Enter Street Number"
                                    floatingLabelText="Street Number"
                                    name="number"
                                    type="number"
                                    onChange={this.handleChange}
                                    value={this.state.number}
                                    fullWidth={true}
                                    errorText={this.state.errors.number}/>
                            </div>
                            <div className="column">
                                <TextField
                                    hintText="Enter Street Name"
                                    floatingLabelText="Street Name"
                                    name="street"
                                    onChange={this.handleChange}
                                    value={this.state.street}
                                    fullWidth={true}
                                    errorText={this.state.errors.street}/>

                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <TextField
                                    hintText="Enter City"
                                    floatingLabelText="City"
                                    name="city"
                                    onChange={this.handleChange}
                                    value={this.state.city}
                                    fullWidth={true}
                                    errorText={this.state.errors.city}/>
                            </div>
                            <div className="column">

                                <TextField
                                    hintText="Enter Postal Code"
                                    floatingLabelText="Postal Code"
                                    name="postal"
                                    onChange={this.handleChange}
                                    value={this.state.postal}
                                    fullWidth={true}
                                    errorText={this.state.errors.postal}/>
                            </div>
                        </div>
                        <TextField
                            hintText="Enter Telephone Number"
                            floatingLabelText="Telephone Number"
                            name="telephone"
                            onChange={this.handleChange}
                            value={this.state.telephone}
                            fullWidth={true}
                            errorText={this.state.errors.telephone}/>

                    </form>

                    {!!this.state.errors.global && <p>this.state.errors.global</p>}
                    <p>{this.state.errors.global}</p>
                </Dialog>
            </div>

        );
    }
}

export default connect(null, {SaveClient})(NewClientModal);