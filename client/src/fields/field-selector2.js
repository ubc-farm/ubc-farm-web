/**
 * Created by Xingyu on 6/1/2017.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectField} from './actions/select-field.js';
import {fetchTaskByField} from './actions/fetchTaskByField';
import CreateFieldModal from './create-field-modal.js'
import {List, ListItem} from 'material-ui/List';
import ListSubHeader from 'material-ui/List/ListSubheader';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/Progress';
import Button from 'material-ui/Button';

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
        return this.props.fields.map((field) => (
                <div key={field._id}>
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
                    onClick={() => {this.props.selectField(field); this.props.fetchTaskByField(field._id)}}
                >

                </ListItem>
                <Divider/>
                    </div>
                </div>));



    }

    render(){
        return(
            <div style={styles.root}>
                <List classes={{}} style={styles.gridList}>
                    <ListSubHeader>
                        Fields with Updates
                    </ListSubHeader>
                    {this.createListItems()}
                </List>


                <div style={{minWidth: '100%', height: '20%'}} >
                    <Divider classes={{}} />
                    <div style={{position: 'bottom', bottom: '0px', height: '50%'}} >
                        <CreateFieldModal />


                    </div>

                    <Divider classes={{}} />

                    <div style={{height: '50%'}}>
                        <Button classes={{}}  label="Summary" primary={true} style={{minWidth: '100%', height: '100%'}}
                                    onClick={() => {this.props.selectField("")}}/>
                    <Divider classes={{}} />
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
        selectField: selectField,
        fetchTaskByField: fetchTaskByField,
    }, dispatch)
}

FieldSelector2 = connect(mapStateToProps, matchDispatchToProps)(FieldSelector2);
export default FieldSelector2;
