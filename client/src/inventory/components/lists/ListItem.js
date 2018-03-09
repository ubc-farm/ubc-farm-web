/**
 * Created by Xingyu on 6/29/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    TableRow,
    TableRowColumn,
    FlatButton
} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Done from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import {logSeed} from '../../actions';

class ListItem extends Component {
    constructor(props, context) {
        super(props, context);
        // set the initial component state
        this.state = {
            isEditButtonVisible:true
        };
    }
    save(){
        if(this.state.quantity != this.props.item.quantity){
            let requesBody = {
              id: this.props.item._id,
              log: {
                    timestamp: Date.now(),
                    value: this.state.quantity
                    }
                };
            this.props.dispatch(logSeed(requesBody));
        }
        this.setState({isEditButtonVisible:true});
    }
    componentDidMount(){
        this.setState({quantity:this.props.item.quantity});
    }
    render() {
        
    	const {item, index} = this.props;
        console.log("Liste item: ");

        console.log(this.props);
	    return (
                <TableRow key={index}>
                    <TableRowColumn style={{verticalAlign: 'middle'}}>{item.crop}</TableRowColumn>
                    <TableRowColumn style={{verticalAlign: 'middle'}}>{item.variety}</TableRowColumn>
                    <TableRowColumn style={{verticalAlign: 'middle'}}>{item.weight}</TableRowColumn>
                    <TableRowColumn style={{verticalAlign: 'middle'}}>{item.unit}</TableRowColumn>
                   <TableRowColumn style={{verticalAlign: 'middle'}}>                                    
	                   {this.state.isEditButtonVisible && <div>{item.quantity}</div>}
                        {!this.state.isEditButtonVisible &&
                            <div layout="column">
                                <TextField
                                    defaultValue={this.props.item.quantity}
                                    hintText="Enter Change"
                                    name={index.toString()}
                                    type="number"
                                    onChange={(event, newValue)=>{;
                                    this.setState({quantity:newValue})}}
                                    style={{width: "80%"}}/>
                            </div>}
                        </TableRowColumn>
                    <TableRowColumn style={{verticalAlign: 'middle'}}>{item.product}</TableRowColumn>
                    <TableRowColumn style={{verticalAlign: 'middle'}}>{item.store}</TableRowColumn>
                    <TableRowColumn style={{verticalAlign: 'middle'}}>{item.price}</TableRowColumn>
                    <TableRowColumn style={{verticalAlign: 'middle'}}>
                    {this.state.isEditButtonVisible && 
                    <IconButton onClick={()=>{this.setState({isEditButtonVisible:false})}} tooltip="bottom-right" touch={true} tooltipPosition="bottom-right">
                      <ModeEdit/>
                    </IconButton>}
                    {!this.state.isEditButtonVisible && 
                    <IconButton onClick={()=>{this.save()}} tooltip="bottom-right" touch={true} tooltipPosition="bottom-right">
                      <Done/>
                    </IconButton>}                    
                    </TableRowColumn>
                </TableRow>);

    }
}

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    key: PropTypes.number.isRequired
};



export default connect()(ListItem);