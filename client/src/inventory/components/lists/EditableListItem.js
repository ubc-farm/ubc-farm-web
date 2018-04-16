import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    TableRow,
    TableRowColumn
} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Done from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

class EditableColumn extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEditButtonVisible:true,
            quantity:""
        }
    }
    save(){
        const {dispatch} = this.props;
        this.setState({isEditButtonVisible:true});

        dispatch(this.props.cell.func({id: this.props.itemId,log: {timestamp: Date.now(),value: this.state.quantity}}));
    }
    componentDidMount(){
        this.setState({quantity:this.props.cell.title});
    }
    render(){
        let {cell} = this.props;
        return (<TableRowColumn style={{verticalAlign: 'middle'}}>                                    
                       {this.state.isEditButtonVisible && 
                        <div style={{display: 'inline-block'}}>
                            <div style={{display: 'inline-block', width:"35px"}}>{cell.title}</div>
                            <IconButton 
                                onClick={()=>{this.setState({isEditButtonVisible:false})}} 
                                tooltip="bottom-right" touch={true} 
                                tooltipPosition="bottom-right">
                                    <ModeEdit/>
                            </IconButton>
                        </div>}

                        {!this.state.isEditButtonVisible &&
                            <div style={{display: 'inline-block', width:"35px"}}>
                                <TextField
                                    defaultValue={this.props.cell.title}
                                    type="number"
                                    onChange={(event, newValue)=>{
                                    this.setState({quantity:newValue})}}
                                    style={{width: "80%"}}/>
                                <IconButton onClick={()=>{this.save()}} tooltip="bottom-right" touch={true} tooltipPosition="bottom-right">
                                  <Done/>
                                </IconButton>                                    
                            </div>}
                        </TableRowColumn>);
    }
}

class EditableListItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading:false,
        }
    }
    render() {
        
        const {item, index} = this.props;
        
        return (<TableRow key={index}>
                 {Object.keys(item).map((key) => {
                    if(key != "_id"){
                        if(item[key].isEditable){
                            return (<EditableColumn 
                                cell={item[key]}
                                dispatch={this.props.dispatch}
                                itemId={item._id}/>)
                            }else if(key == "deleteButton"){
                            return (
                                <TableRowColumn key={key} style={{verticalAlign: 'middle'}}>
                                        <FlatButton
                                            label={this.state.loading ? '' : "Delete"}
                                            secondary={true}
                                            disabled={false}
                                            onTouchTap={()=>{
                                                this.setState({loading:true});
                                                this.props.dispatch(item[key].deleteFunc(item._id));
                                                this.setState({loading:false});                                                    
                                                }
                                            }
                                            icon={this.state.loading ? <CircularProgress /> : ''}
                                        />                                
                                </TableRowColumn>) 
                        } else{
                            return (<TableRowColumn id="tyus123"  key={key} style={{verticalAlign: 'middle', maxWidth:'130px' }}>{item[key].title}</TableRowColumn>)
                        }
                      }
                    })};
                </TableRow>);

    }
}

export default connect()(EditableListItem);
