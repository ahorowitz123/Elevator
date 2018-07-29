import React from "react";
import PropTypes from "prop-types";
import { DropdownButton, MenuItem } from "react-bootstrap";

const CallElevator = props =>
  <div>
    <DropdownButton
      id="call-up"
      title="Call Up"
      onSelect={floor => props.handleOnSelect(floor, 1)}
    >
      {props.floorArray.map(floor => {
        return (
          <MenuItem key={floor} eventKey={floor}>
            {floor}
          </MenuItem>
        );
      })}
    </DropdownButton>
    <DropdownButton
      id="call-down"
      title="Call Down"
      onSelect={floor => props.handleOnSelect(floor, -1)}
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

CallElevator.propTypes = {
  handleOnSelect: PropTypes.func.isRequired,
  floorArray: PropTypes.array.isRequired
};

export default CallElevator;
