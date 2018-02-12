/**
 * Created by Xingyu on 7/4/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import LogItemModel from '../modals/log-modal';
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
import {deleteFertilizer, logFertilizer} from '../../actions/fertilizer-actions.js';

import PropTypes from 'prop-types';

/**
 * Table form representation of Transplanting Items
 */
class FertilizerList extends Component {
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
        {title:'Product name',toolTip:'Sort by Product name'},
        {title:'Application rate',toolTip:'Sort by Application rate'},
        {title:'Mix ratio',toolTip:'Sort by Mix ratio'},
        {title:'TC', toolTip:'TC'},
        {title:'NO3', toolTip:'NO3'},
        {title:'NH4', toolTip:'NH4'},
        {title:'K2O', toolTip:'K2O'},
        {title:'P2O5', toolTip:'P2O5'},
        {title:'Price',toolTip:'Sort by Price'},
        {title:'Currency',toolTip:'Sort by Price'},
        {title:'Quantity',toolTip:'Sort by Quantity'},
        {title:'Delete',toolTip:'Delete item'}];

        var itemList = [];

        itemList = this.props.fertilizers.map((item)=>{
            var newItem = {
                _id:item._id,
                type:{title:item.type},
                name:{title:item.name},
                rate:{title:item.rate},
                ratio:{title:item.ratio},
                TC:{title:item.tc},
                NO3:{title:item.no3},
                NH4:{title:item.nh4},
                K2O:{title:item.k2o},
                P2O5:{title:item.p2o5},
                price:{title:item.price || "N/A"},
                currency:{title:item.currency},
                quantity:{title:item.quantity, isEditable:true, func:logFertilizer},
                deleteButton:{deleteFunc:deleteFertilizer}
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

FertilizerList.propTypes = {
    fertilizers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        fertilizers: state.fertilizers,
    }
};

export default connect(mapStateToProps) (FertilizerList);