/*
 **Author: Xingyu Tao
 **Last Updated: 5-24-2017
 **Comments:
 **	selecting fields
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add'
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
};

const tilesData = [
    {
        img: '',
        title: 'Breakfast',
        author: 'jill111',
    },
];

const FieldSelectorComponent = ({

}) => (
    <div style={styles.root} className="columns">
        <div className="column is-2-desktop">
            <IconButton tooltip="New Field" tooltipPosition="top-center"><ContentAdd/></IconButton>
        </div>
        <div className="column is-10-desktop">
        <GridList style={styles.gridList} cols={2.2}>
            {tilesData.map((tile) => (
                <GridTile
                    key={tile.img}
                    title={tile.title}
                    actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
                    titleStyle={styles.titleStyle}
                    titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                >
                </GridTile>
            ))}
        </GridList>
        </div>
    </div>

);

FieldSelectorComponent.propTypes = {

};

export default FieldSelectorComponent;