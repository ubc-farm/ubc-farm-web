/**
 * Created by Xingyu on 7/4/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import LogItemModel from '../modals/log-modal';
import EditableList from '../lists/EditableList';
import {deleteHarvested, logHarvested} from '../../actions';

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
class HarvestedList extends Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            fixedHeader: true,

        };


    }
    render(){
        let columns = [
        {title:'Item Name',toolTip:'Sort by Item Name'},
        {title:'Variety',toolTip:'Sort by Variety'},
        {title:'Price',toolTip:'Sort by Price'},
        {title:'Quantity',toolTip:'Sort by Quantity'},
        {title:'Unit',toolTip:'Sort by Unit'},
        {title:'Delete',toolTip:'Delete'}];
        var itemList = [];
        itemList = this.props.harvested.map((item)=>{
            var newItem = {
                _id:item._id,
                name:{title:item.name},
                variety:{title:item.variety},
                price:{title:item.price},
                quantity:{title:item.quantity,isEditable:true, func:logHarvested},
                unit:{title:item.unit},
                deleteButton:{deleteFunc:deleteHarvested}
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

HarvestedList.propTypes = {
    harvested: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        harvested: state.harvested,
    }
};

export default connect(mapStateToProps)(HarvestedList);