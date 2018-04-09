/**
 * Created by Xingyu on 6/29/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import LogItemModel from './modals/log-modal';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    Button,
    FlatButton
} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Done from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import EditableList from './lists/EditableList';
import {logSeed} from '../actions/seeds-put';
import {deleteSeed} from '../actions/seeds-delete.js';
/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
class SeedList extends Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '300px',
            isEditVisible:false
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fieldNameFromId = this.fieldNameFromId.bind(this);
        this.dateTransformer = this.dateTransformer.bind(this);
        this.typeTransformer = this.typeTransformer.bind(this);
    }

    //returns seed object
    fieldNameFromId(seedId){
        let seed = this.props.seeds.find((seed) => {
            return seed._id === seedId;
        });
        return seed;
    }

    dateTransformer(dateString){
        let d = new Date(dateString);
        let options = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric"
        };
        let fullDate = d.toLocaleTimeString("en-us", options);
        let components = fullDate.split(",");
        return components[0] + "," + components[1] +  "," + components[2];

    }

    typeTransformer(typeString){
        switch(typeString){
            case "seeding":
                return "\u{1F331}" + " " + typeString;
                break;
            case "irrigation":
                return "\u{1F4A7}" + " " + typeString;
                break;
            case "pest-control":
                return "\u{1F41C}" + " " + typeString;
                break;
            case "transplanting":
                return "\u{1F33F}" + " " + typeString;
                break;
            case "soil-sampling":
                return "\u{1F52C}" + " " + typeString;
                break;
            case "scouting-harvest":
                return "\u{1F4CB}" + " " + typeString;
                break;
            case "scouting-pests":
                return "\u{1F4CC}" + " " + typeString;
                break;
            case "fertilizing":
                return "\u{1F4A9}" + " " + typeString;
                break;
            default:
                return typeString;
                break;
        }
    }


    handleToggle(event, toggled){
        this.setState({
            [event.target.name]: toggled,
        });
    }

    handleChange(event){
        this.setState({height: event.target.value});
    }

    componentWillReceiveProps(nextProps){
        console.log("New props have been made\n");
        console.log(nextProps);
    }

    render() {
        //modal 
        let columns = [
        {title:'Crop',toolTip:'Sort by Crop'},
        {title:'Variety',toolTip:'Sort by Variety'},
        {title:'Weight',toolTip:'Sort by Weight'},
        {title:'Unit',toolTip:'Sort by Unit'},
        {title:'Quantity',toolTip:'Sort by Quantity'},
        {title:'Store',toolTip:'Sort by Product Store'},
        {title:'Price',toolTip:'Sort by Price'},
        {title:'Currency', toolTip:'Sort by Currency'},
        {title:'Delete',toolTip:'Delete fertilizers'}];

        var itemList = [];

        itemList = this.props.seeds.map((item)=>{
            var newItem = {
                _id:item._id,
                crop:{title:item.crop},
                variety:{title:item.variety},
                weight:{title:item.weight},
                unit:{title:item.unit},
                quantity:{title:item.quantity, isEditable:true, func:logSeed},
                store:{title:item.store},
                price:{title:item.price},
                currency:{title:item.currency},
                deleteButton:{deleteFunc:deleteSeed}
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

SeedList.propTypes = {
    seeds: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        seeds: state.seeds,
    }
};

export default connect(mapStateToProps)(SeedList);