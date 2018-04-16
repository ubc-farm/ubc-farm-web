/**
 * Created by Xingyu on 7/4/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import LogItemModel from '../modals/log-modal';
import {deleteVehicle, logVehicle} from '../../actions';
import EditableList from '../lists/EditableList';
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

/**
 * Table form representation of Transplanting Items
 */
class VehicleList extends Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            fixedHeader: true,

        };


    }

    render(){

        let columns = [
        {title:'Brand',toolTip:'Sort by Brand'},
        {title:'Model',toolTip:'Sort by Model'},
        {title:'Year',toolTip:'Sort by Year'},
        {title:'Price',toolTip:'Sorty by Price'},
        {title:'Quantity',toolTip:'Sorty by Quantity'},
        {title:'Location',toolTip:'Sort by location'},
        {title:'Delete',toolTip:'Delete'}];

        var itemList = [];
        itemList = this.props.vehicles.map((item)=>{
            var newItem = {
                _id:item._id,
                brand:{title:item.brand},
                model:{title:item.model},
                year:{title:item.year},
                price:{title:item.price},
                quantity:{title:item.quantity, isEditable:true, func:logVehicle},
                location:{title:item.location},
                deleteButton:{deleteFunc:deleteVehicle}
            };
            return newItem;            
        });

        return (
            <EditableList 
                items={itemList} 
                columns={columns} 
                id="seedList" 
                isEditable={true}/>
        );
    }
}

VehicleList.propTypes = {
    vehicles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        vehicles: state.vehicles
    }
};

export default connect(mapStateToProps)(VehicleList);