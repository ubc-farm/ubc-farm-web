/**
 * Created by Xingyu on 5/25/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';


const raisedbutton = {
    margin: 12,
};

class FieldDetail extends Component{
    render(){
        if(this.props.field==null){
            return(<h4>Select an user...</h4>);
        }
        return(
            <div>
                <h2>{(this.props.field.name) ? this.props.field.name : "Select A Field" }</h2>
                <RaisedButton
                    label="Delete this Field"
                    secondary={true}
                    style={raisedbutton}
                />
                <RaisedButton label="New Field" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Confirm Deletion"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >


                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        field: state.selectedField
    };
}

export default connect(mapStateToProps)(FieldDetail);
