/**
 * Created by Xingyu on 7/4/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import LogItemModel from '../modals/log-modal';
import CircularProgress from 'material-ui/CircularProgress';
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
import {logTransplant, deleteTransplant} from '../../actions/transplant-actions.js';
/**
 * Table form representation of Transplanting Items
 */
class TransplantingList extends Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            fixedHeader: true,

        };


    }
    render() {
       //modal 
        let columns = [
        {title:'Crop',toolTip:'Sort by Crop'},
        {title:'Variety',toolTip:'Sort by Variety'},
        {title:'Weight',toolTip:'Sort by Weight'},
        {title:'Unit',toolTip:'Sort by Unit'},
        {title:'Quantity',toolTip:'Sort by Quantity'},
        {title:'Name',toolTip:'Sort by Product Name'},
        {title:'Store',toolTip:'Sort by Product Store'},
        {title:'Price',toolTip:'Sort by Price'},
        {title:'Delete',toolTip:'Delete seed'}];

        var itemList = [];

        itemList = this.props.transplants.map((item)=>{
            var newItem = {
                _id:item._id,
                crop:{title:item.crop},
                variety:{title:item.variety},
                weight:{title:item.weight},
                unit:{title:item.unit},
                quantity:{title:item.quantity, isEditable:true, func:logTransplant},
                product:{title:item.product},
                store:{title:item.store},
                price:{title:item.price},
                deleteButton:{deleteFunc:deleteTransplant}
            };
            return newItem;
            // itemList.concat(newItem);
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

TransplantingList.propTypes = {
    transplants: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        transplants: state.transplants,
    }
};

export default connect(mapStateToProps)(TransplantingList);