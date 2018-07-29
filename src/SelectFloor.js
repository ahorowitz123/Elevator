import React from "react";
import PropTypes from "prop-types";
import { DropdownButton, MenuItem } from "react-bootstrap";

const SelectFloor = props =>
  <div>
    <DropdownButton
      id="select-floor"
      title="Select Floor"
      onSelect={floor => props.handleOnSelect(floor)}
    >
      {props.floorArray.map(floor => {
        return (
          <MenuItem key={floor} eventKey={floor}>
            {floor}
          </MenuItem>
        );
      })}
    </DropdownButton>
  </div>;

SelectFloor.propTypes = {
  handleOnSelect: PropTypes.func.isRequired,
  floorArray: PropTypes.array.isRequired
};

export default SelectFloor;
