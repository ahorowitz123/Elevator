import React from "react";
import PropTypes from "prop-types";
import { DropdownButton, MenuItem } from "react-bootstrap";

import { FLOORS } from "./constants";

const CallElevator = props => {
  const floorArray = Array.from(Array(FLOORS), (_, x) => x + 1);

  return (
    <div>
      <DropdownButton
        id="call-up"
        title="Call Up"
        onSelect={floor => props.handleOnSelect(floor, 1)}
      >
        {floorArray.map(floor => {
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
        {floorArray.map(floor => {
          return (
            <MenuItem key={floor} eventKey={floor}>
              {floor}
            </MenuItem>
          );
        })}
      </DropdownButton>
    </div>
  );
};

CallElevator.propTypes = {
  handleOnSelect: PropTypes.func.isRequired,
};

export default CallElevator;
