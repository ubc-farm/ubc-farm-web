/**
 * Created by Xingyu on 6/4/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import CircularProgress from 'material-ui/Progress';
import {connect} from 'react-redux';
import {deleteTask} from '../actions/delete-task.js';

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
            task:{}
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
        console.log(this.props.task);

        this.setState({loading: true});
        this.props.deleteTask(this.props.task._id).then(
            (response) => {console.log("should catch error here")}
        );
        this.setState({done: true, loading: false});
        this.handleClose();

    };

    render() {
        const actions = [
            <Button
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
                style={styles.button}
            />,
            <Button
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
                <Button label="Delete" secondary={true} onTouchTap={this.handleOpen} />
                <Dialog
                    title="Confirm Task Deletion"
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

export default connect(null, {deleteTask})(DeleteFieldModal);