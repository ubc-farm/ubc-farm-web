/**
 * Created by Xingyu on 5/30/2017.
 */

import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';
import {deleteField} from './actions/delete-field.js';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import LinearProgress from 'material-ui/LinearProgress';
import NewFieldMapComponent from './maps/NewFieldMapComponent.jsx';
import {Route,Redirect} from 'react-router';

const styles = {
    button:{
        margin:12
    }

};

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class DeleteFieldModal extends Component {
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
            field:{}
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

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

        this.setState({loading: true});
        this.props.deleteField(this.props.field._id).then(
            (response) => {console.log("should catch error here")}
        );
        this.setState({done: true, loading: false});
        this.handleClose();

    };

    render() {
        const actions = [
            <RaisedButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
                style={styles.button}
            />,
            <RaisedButton
                label={this.state.loading ? '' : "Delete"}
                primary={true}
                disabled={false}
                onTouchTap={this.handleSubmit}
                icon={this.state.loading ? <CircularProgress /> : ''}
                style={styles.button}
            />,
        ];

        const form = (
            <div>
                <RaisedButton label="Delete Field" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Confirm Field Deletion"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >

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

export default connect(null, {deleteField})(DeleteFieldModal);
