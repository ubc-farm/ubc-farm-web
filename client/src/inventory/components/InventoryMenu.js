/**
 * Created by Xingyu on 6/29/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {selectInventory} from '../actions/select-inventory'

let InventoryList = makeSelectable(List);



function wrapState(ComposedComponent){

    class InventoryList extends Component{
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
            };

            this.handleRequestChange = this.handleRequestChange.bind(this);
        }

        componentWillMount(){
            this.setState({selectedIndex: this.props.defaultValue,})
        }

        handleRequestChange(event, index){
            this.setState({
                selectedIndex: index
            });

            this.props.selectInventory(index);
        };

        render(){
            return (
                <ComposedComponent
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange}
                    style={{paddingTop:"0px", paddingBottom: "0px"}}
                >
            {this.props.children}
                </ComposedComponent>
            )
        }
    }
    InventoryList.propTypes = {
        children: PropTypes.node.isRequired,
        defaultValue: PropTypes.number.isRequired,
        selectInventory: PropTypes.func.isRequired,
    };

    const mapStateToProps = (state) => {
        return{
        }
    };

    return connect(mapStateToProps,{selectInventory})(InventoryList);

}

InventoryList = wrapState(InventoryList);


const InventoryMenu = () => (
    <div>
        <InventoryList defaultValue={0}>
            <ListItem value={0} primaryText="Seeds" leftIcon={<ContentInbox />} />
            <ListItem value={1} primaryText="Transplanting" leftIcon={<ContentInbox />} />
            <ListItem value={2} primaryText="Fertilizers" leftIcon={<ContentInbox />} />
            <ListItem value={3} primaryText="Pest Control" leftIcon={<ContentInbox />} />
            <ListItem value={4} primaryText="Equipment" leftIcon={<ContentInbox />} />
            <ListItem value={5} primaryText="Vehicles" leftIcon={<ContentInbox />} />
            <ListItem value={6} primaryText="Harvested Produce" leftIcon={<ContentInbox />} />
        </InventoryList>
        <Divider />
        Select an Inventory to view
    </div>
);


export default InventoryMenu;