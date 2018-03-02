/**
 * Created by Xingyu on 1/24/2018.
 */
/**
 * Created by Xingyu on 6/4/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';

const styles = {
    button:{
        margin:12
    }

};

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class LogDescriptionModal extends Component {
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
                label="Exit"
                secondary={true}
                onTouchTap={this.handleClose}
                style={styles.button}
            />,
        ];

        const form = (
            <div>
                <Button label="Description" primary={true} onTouchTap={this.handleOpen} />
                <Dialog
                    title="Log Description"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    {this.props.description}
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


LogDescriptionModal.propTypes = {
    description: PropTypes.string.isRequired,

};

export default connect(null, {})(LogDescriptionModal);