/**
 * Created by Xingyu on 6/29/2017.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

const InventoryMenu = () => (
    <a>
        <List style={{paddingTop:"0px", paddingBottom: "0px"}}>
            <ListItem primaryText="Seeds" leftIcon={<ContentInbox />} />
            <ListItem primaryText="Transplanting" leftIcon={<ContentInbox />} />
            <ListItem primaryText="Fertilizers" leftIcon={<ContentInbox />} />
            <ListItem primaryText="Pest Control" leftIcon={<ContentInbox />} />
            <ListItem primaryText="Equipment" leftIcon={<ContentInbox />} />
            <ListItem primaryText="Vehicles" leftIcon={<ContentInbox />} />
            <ListItem primaryText="Harvested Produce" leftIcon={<ContentInbox />} />
            <ListItem primaryText="Eggs" leftIcon={<ContentInbox />} />
        </List>
        <Divider />
        New Category
    </a>
);

export default InventoryMenu;