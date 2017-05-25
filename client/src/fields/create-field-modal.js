/**
 * Created by Xingyu on 5/25/2017.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class CreateFieldModal extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen(){
        this.setState({open: true});
    };

    handleClose(){
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                <RaisedButton label="New Field" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    Only actions can close this dialog.
                </Dialog>
            </div>
        );
    }
}
