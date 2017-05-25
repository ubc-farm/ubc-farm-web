/**
 * Created by Xingyu on 5/25/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';


class FieldDetail extends Component{
    render(){
        if(this.props.field==null){
            return(<h4>Select an user...</h4>);
        }
        return(
            <div>
                <h2>{this.props.field.name}</h2>
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
