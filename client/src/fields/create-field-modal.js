/**
 * Created by Xingyu on 5/25/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import {saveField} from './actions/save-field'


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
            errors: {},
            open: false,
            validated: false,
            loading: false
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
        this.setState({open: false});
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

        // //validation
        // let errors = {};
        // if(this.state.name === '')
        //     errors.name = "This field is Required";
        // this.setState({errors});
        //
        // //if valid, create post request
        // const isValid = Object.keys(errors).length === 0;
        if(isValid){
            const{name} = this.state;
            this.setState({loading: true});
            this.props.saveField({name}).then(
                () => {},
                (err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false}))
            );
        }

    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
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
            <div>
                <RaisedButton label="New Field" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Create New Field"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <form>
                        <TextField
                            hintText="Enter Name for new Field"
                            floatingLabelText="Enter Name for new Field"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name}
                            errorText={this.state.errors.name}/>

                    </form>
                    {!!this.state.errors.global && <p>this.state.errors.global</p>}
                </Dialog>
            </div>
        );
    }
}

export default connect(null, {saveField})(CreateFieldModal);
