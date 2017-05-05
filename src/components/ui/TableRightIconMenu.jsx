import React from 'react';
import PropTypes from 'prop-types';
import { TableRowColumn } from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { generate } from 'shortid';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon />
  </IconButton>
);

const TableRightIconMenu = ({ items }) => (
  <TableRowColumn style={{ textAlign: 'right' }}>
    <div>
      <IconMenu iconButtonElement={iconButtonElement}>
        {items.map(({ title, onClickHandler }) =>
          <MenuItem key={generate()} onClick={onClickHandler}>{title}</MenuItem>
        )}
      </IconMenu>
    </div>
  </TableRowColumn>
);

TableRightIconMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableRightIconMenu;
