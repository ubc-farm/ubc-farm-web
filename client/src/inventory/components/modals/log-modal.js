/**
 * Created by Xingyu on 7/12/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import {logItem} from '../../actions/universal-actions';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import {logEquipment} from '../../actions/equipment-actions'

const styles = {
    button:{
        margin:12
    }

};

class LogItemModal extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            open: false,
            validated: false,
            loading: false,
            done: false,
            change: 0,
            task:{}
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

    handleSubmit(e){
        e.preventDefault();
        console.log(this.props.item);

        const newValue = parseFloat(this.props.item.quantity) + parseFloat(this.state.change);
        this.setState({loading: true});
        this.props.logEquipment({id: this.props.item._id,timestamp: Date.now(),value: newValue}).then(
            (response) => {console.log("should catch error here")}
        );
        this.setState({done: true, loading: false});
        this.handleClose();

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

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
                style={styles.button}
            />,
            <FlatButton
                label={this.state.loading ? '' : "Log"}
                primary={true}
                disabled={false}
                onTouchTap={this.handleSubmit}
                icon={this.state.loading ? <CircularProgress /> : ''}
                style={styles.button}
            />,
        ];

        const form = (
            <div>
                <FlatButton label="Log" primary={true} onTouchTap={this.handleOpen} />
                <Dialog
                    title={"Log " + this.props.item.name + " Changes"}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <TextField
                        hintText="Enter Change"
                        floatingLabelText="Change"
                        name="change"
                        type="number"
                        onChange={this.handleChange}
                        fullWidth={true}
                        value={this.state.change}
                        errorText={this.state.errors.change}/>

                    {!!this.state.errors.global && <p>this.state.errors.global</p>}
                </Dialog>
            </div>
        );

        return (
            <div key={this.state.timestamp}>
                {form}
            </div>

        );
    }
}

LogItemModal.propTypes = {
    item: PropTypes.object.isRequired,
};

export default connect(null, {logEquipment})(LogItemModal);