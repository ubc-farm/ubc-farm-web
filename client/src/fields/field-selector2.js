/**
 * Created by Xingyu on 6/1/2017.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectField} from './actions/select-field.js';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import CreateFieldModal from './create-field-modal.js'
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    root: {
        height: '70%',
    },
    gridList: {
        width: '100%',
        height: '80%',
        overflowY: 'auto',
        padding: 0
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
    buttonGroup:{
        bottom: 0,
        display: 'inline-block',
        height:0
    },
    iconStyles:{
        marginRight: 24,
    },
    generalHealth:{
        backgroundColor: 'transparent'
    }
};

class FieldSelector2 extends Component{
    createListItems(){
        return this.props.fields.map((field) => {
            return(
                <div>
                    <Divider/>
                    <div>
                <ListItem
                    key={field._id}
                    primaryText={field.name}
                    leftAvatar={<CircularProgress
                        mode="determinate"
                        innerStyle={styles.generalHealth}
                        value={80}
                    /> }
                    onClick={() => this.props.selectField(field)}
                >

                </ListItem>
                <Divider/>
                    </div>
                </div>
            );
        });

    }

    render(){
        return(
            <div style={styles.root}>
                <List style={styles.gridList}>
                    <Subheader>
                        Fields with Updates
                    </Subheader>
                    {this.createListItems()}
                </List>


                <div style={{minWidth: '100%', height: '20%'}} >
                    <Divider/>
                    <div style={{position: 'bottom', bottom: '0px', height: '50%'}} >

                    <FlatButton label="Summary" primary={true} style={{minWidth: '100%', height: '100%'}} />
                    </div>

                    <Divider/>

                    <div style={{height: '50%'}}>
                    <CreateFieldModal />
                    <Divider/>
                    </div>

                </div>

            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        fields: state.fields
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        selectField: selectField
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(FieldSelector2);
