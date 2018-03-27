/**
 * Created by Xingyu on 3/23/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LogList from './LogList';

const styles = {
    button:{
        margin:12
    }

};

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class LogListModal extends React.Component {
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


    render() {
        const actions = [
            <FlatButton
                label="Close"
                secondary={true}
                onTouchTap={this.handleClose}
                style={styles.button}
            />,
        ];

        const form = (
            <div>
                <FlatButton label="History"  onTouchTap={this.handleOpen} />
                <Dialog
                    title="Log History"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <div className="title is-5">Summary</div>

                    <div className="text-info">Task Type: {this.props.typeTransformer(this.props.task.type)}</div>
                    <div className="text-info">Duration: {this.props.dateTransformer(this.props.task.startDate) +" -- " + this.props.dateTransformer(this.props.task.endDate)}</div>
                    <div className="text-info">Aggregated Hours: {this.state.hours}</div>

                    <LogList taskId={this.props.task._id} />

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


LogListModal.propTypes = {
    task: PropTypes.object.isRequired,
    typeTransformer: PropTypes.func.isRequired,
    dateTransformer: PropTypes.func.isRequired,
};

export default LogListModal;
