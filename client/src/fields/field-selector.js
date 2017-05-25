/**
 * Created by Xingyu on 5/25/2017.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectField} from './actions/select-field.js';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import CreateFieldModal from './create-field-modal.js'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '70%',
        justifyContent: 'space-around',
    },
    gridList: {
        width: '100%',
        height:450,
        overflowY: 'auto',
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
    buttonGroup:{
        bottom: 0,
        display: 'inline-block',
        height:0
    }
};

class FieldSelector extends Component{
    createListItems(){
        return this.props.fields.map((field) => {
            return(
                <GridTile
                    key={field.id}
                    title={field.name}
                    onClick={() => this.props.selectField(field)}
                >
                </GridTile>
            );
        });

    }

    render(){
        return(
            <div style={styles.root}>
                <GridList style={styles.gridList} cellHeight={180}>
                    {this.createListItems()}
                </GridList>
                <div style={styles.buttonGroup}>
                    <RaisedButton label="Summary"/>
                    <CreateFieldModal/>
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

export default connect(mapStateToProps, matchDispatchToProps)(FieldSelector);
