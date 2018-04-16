/**
 * Created by Xingyu on 7/4/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import LogItemModel from '../modals/log-modal';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import PropTypes from 'prop-types';
import {deleteEquipment, logEquipment} from '../../actions/equipment-actions.js';
import EditableList from '../lists/EditableList';
/**
 * Table form representation of Transplanting Items
 */
class EquipmentList extends Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            fixedHeader: true,

        };



    }

    render(){

        let columns = [
        {title:'Product name',toolTip:'Sort by Product name'},
        {title:'Quantity',toolTip:'Sort by Quantity'},
        {title:'Unit',toolTip:'Sort by Entry Interval'},
        {title:'Location',toolTip:'Sort by location'},
        {title:'Delete',toolTip:'Delete fertilizers'}];

        var itemList = [];
        itemList = this.props.equipments.map((item)=>{
            var newItem = {
                _id:item._id,
                name:{title:item.name},
                quantity:{title:item.quantity, isEditable:true, func:logEquipment},
                unit:{title:item.unit},
                location:{title:item.location},
                deleteButton:{deleteFunc:deleteEquipment}
            };
            return newItem;            
        });


        return (
            <EditableList 
                items={itemList} 
                columns={columns} 
                id="pestList" 
                isEditable={true}/>
        )
    }

}

EquipmentList.propTypes = {
    equipments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        equipments: state.equipments,
    }
};

export default connect(mapStateToProps)(EquipmentList);