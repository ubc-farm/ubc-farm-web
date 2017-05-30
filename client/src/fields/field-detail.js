/**
 * Created by Xingyu on 5/25/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeleteFieldModal from './delete-field-modal'
import {bindActionCreators} from 'redux';
import {selectField} from './actions/select-field.js';


class FieldDetail extends Component{
    render(){
        if(this.props.field.length === 0){
            return(<h4>Select Field or Building...</h4>);
        }
        return(
            <div>
                <h2>{this.props.field.name}</h2>
                <DeleteFieldModal field = {this.props.field}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        field: state.selectedField
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectField: selectField
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(FieldDetail);
