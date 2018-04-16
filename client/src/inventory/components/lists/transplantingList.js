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
        {title:'Product Name',toolTip:'Sort by Product Name'},
        {title:'N',toolTip:'N'},
        {title:'P',toolTip:'P'},
        {title:'K',toolTip:'K'},
        {title:'Nutrient Req Unit',toolTip:'Nutrient Req Unit'},
        {title:'Days to maturity',toolTip:'Days to maturity'},
        {title:'Predicted yield',toolTip:'Sort by Yield'},
        {title:'Price',toolTip:'Sort by Price'},
        {title:'Currency',toolTip:'Sort by Currency'},
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
                product:{title:item.name},
                n:{title:item.n},
                p:{title:item.p},
                k:{title:item.k},
                nutrientReqUnit:{title:item.nutrientReqUnit},
                maturity:{title:item.maturity},
                yield:{title:item.predictedYield},
                price:{title:item.price},
                currency:{title:item.currency},
                deleteButton:{deleteFunc:deleteTransplant}
            };
            return newItem;
            // itemList.concat(newItem);
        });
        return (
            <div style={{width:'85%'}}>
                <EditableList 
                    items={itemList} 
                    columns={columns} 
                    id="transplantList" 
                    isEditable={true}/>
            </div>
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