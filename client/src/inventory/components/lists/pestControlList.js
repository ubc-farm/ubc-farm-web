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
import EditableList from '../lists/EditableList';
import {deletePesticide, logPesticide} from '../../actions/pest-actions.js';
/**
 * Table form representation of Transplanting Items
 */
class PestControlList extends Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            fixedHeader: true,

        };


    }
    render(){

        let columns = [
        {title:'Type',toolTip:'Sort by Type'},
        {title:'Product name',toolTip:'Sort by Product name'},
        {title:'Application Rate',toolTip:'Sort by Application Rate'},
        {title:'Mix ratio (Water : Mix)',toolTip:'Sort by Mix ratio'},
        {title:'Application Location',toolTip:'Sort by Application Location'},
        {title:'Entry Interval',toolTip:'Sort by Entry Interval'},
        {title:'Harvest Interval',toolTip:'Sort by Harvest Interval'},
        {title:'Active Ingredient',toolTip:'Sort by Active Ingredient'},
        {title:'Active Ingredient %',toolTip:'Sort by Active Ingredient %'},
        {title:'Delete',toolTip:'Delete fertilizers'}];

        var itemList = [];
        itemList = this.props.pesticides.map((item)=>{
            var newItem = {
                _id:item._id,
                type:{title:item.type},
                name:{title:item.name},
                rate:{title:item.rate},
                ratio:{title:item.ratio},
                location:{title:item.location}, //, isEditable:true, func:logPesticide
                entry:{title:item.entry},
                harvest:{title:item.harvest},
                active:{title:item.active},
                activePercentage:{title:item.percentage},
                deleteButton:{deleteFunc:deletePesticide}
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

PestControlList.propTypes = {
    pesticides: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        pesticides: state.pesticides,
    }
};

export default connect(mapStateToProps)(PestControlList);