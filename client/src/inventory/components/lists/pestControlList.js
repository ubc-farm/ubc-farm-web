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

/*
        ###Pest control
        #Type(e.g. Systemic, Foliar, Biological, etc.)
        #Product name
        #Active ingredient 
        #Active ingredient %
        #Entry interval
        #Harvest interval
        #Quantity
        #Quantity unit
        #Price
        #Price unit
        #Add “Location” - draw from list of “fields” from geospatial areas identified
*/

    render(){

        let columns = [
        {title:'Type',toolTip:'Sort by Type'},
        {title:'Product name',toolTip:'Sort by Product name'},
        {title:'Active Ingredient',toolTip:'Sort by Active Ingredient'},
        {title:'Active Ingredient %',toolTip:'Sort by Active Ingredient %'},
        {title:'Entry Interval',toolTip:'Sort by Entry Interval'},
        {title:'Harvest Interval',toolTip:'Sort by Harvest Interval'},
        {title:'Price',toolTip:'Sort by Price'},
        {title:'Currency',toolTip:'Sort by Currency'},
        {title:'Location',toolTip:'Sort by Location'},
        {title:'Quantity', toolTip:'Sort by Quantity'},
        {title:'Quantity unit', toolTip:'Sort by unit'},
        {title:'Delete',toolTip:'Delete pest'}];

        var itemList = [];
        itemList = this.props.pesticides.map((item)=>{
            var newItem = {
                _id:item._id,
                type:{title:item.type},
                name:{title:item.name},
                active:{title:item.active},
                activePercentage:{title:item.percentage},
                entry:{title:item.entry},
                harvest:{title:item.harvest},
                price:{title:item.price}, 
                currency:{title:item.currency},
                location:{title:item.location},
                quantity:{title:item.quantity},
                quantityUnit:{title:item.quantityUnit},
                deleteButton:{deleteFunc:deletePesticide}
            };
            return newItem;            
        });

        if(itemList.length == 0){
            return (<EditableList 
                        items={itemList} 
                        columns={columns} 
                        id="pestList" 
                        isEditable={true}/>)
        }

        return (
            <div style={{width:'90%'}}>
                <EditableList 
                    items={itemList} 
                    columns={columns} 
                    id="pestList" 
                    isEditable={true}/>
            </div>
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