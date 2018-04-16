/**
 * Created by Xingyu on 6/29/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    TableRow,
    TableRowColumn,
    FlatButton,
    Table,
    TableHeader,
    TableBody,
    TableHeaderColumn
} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Done from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import {logSeed} from '../../actions';
import EditableListItem from './EditableListItem'

class EditableList extends Component {
    render() {
        let {columns, items, id, isEditable} = this.props;
        let header = (
                <TableRow>
                    {columns.map( (item,index) => (<TableHeaderColumn key={index} tooltip={item.toolTip} style={{verticalAlign: 'middle'}}>{item.title}</TableHeaderColumn>))}
                </TableRow>);

        return (
                    <Table
                        bodyStyle={{overflow:'visible'}}
                        height={'100%'}
                        fixedHeader={false} 
                        style={{ width: "100%", tableLayout: "auto" }}
                        fixedFooter={false}
                        selectable={false}
                        multiSelectable={false}
                    >
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            enableSelectAll={false}
                            style={{verticalAlign: 'middle'}}
                        >
                        {header}
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            deselectOnClickaway={true}
                            showRowHover={true}
                            stripedRows={false}
                        >
                        {items.map( (item, index) => (<EditableListItem item={item} key={index}/>))}

                        </TableBody>
                    </Table>

        );
    }
}

EditableList.propTypes = {
    items: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired, 
    id: PropTypes.string.isRequired
};



export default connect()(EditableList);