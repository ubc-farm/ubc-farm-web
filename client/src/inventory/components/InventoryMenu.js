/**
 * Created by Xingyu on 6/29/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, ListItem} from 'material-ui/List';

import ContentInbox from 'material-ui-icons/Inbox';

import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';

import {selectInventory} from '../actions/select-inventory'

let InventoryList = List;



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
            if(this.props.active_inventory != this.props.defaultValue){
                this.setState({selectedIndex: this.props.active_inventory,});
            }else{
                this.setState({selectedIndex: this.props.defaultValue,});
            }

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
                    type= {List}
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
        active_inventory: PropTypes.number.isRequired,
    };

    const mapStateToProps = (state) => {
        return{
            active_inventory: state.active_inventory
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