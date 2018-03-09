/*
 **Author: Xingyu Tao
 **Last Updated: 5-15-2017
 **Comments:
 **	presentation wrapper for whole app
 */
import React from 'react';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import ListIcon from 'material-ui/svg-icons/action/list.js';

const options = [
    'Fields',
    'Tasks',
    'Inventories',
    'Reports',
    'Finances',
    'Users',
    'Log out',
,
];

class TopBarNav extends React.Component {
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            anhorE1: null,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(event){
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose(){
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={anchorEl ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <ListIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            width: 200,
                        },
                    }}
                >
                    {options.map(option => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default TopBarNav;