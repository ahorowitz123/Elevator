import React from "react";
import PropTypes from "prop-types";
import { DropdownButton, MenuItem } from "react-bootstrap";

import { FLOORS } from "./constants";

const SelectFloor = props => {
  const floorArray = Array.from(Array(FLOORS), (_, x) => x + 1);

  return (
    <div>
      <DropdownButton
        id="select-floor"
        title="Select Floor"
        onSelect={floor => props.handleOnSelect(floor)}
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

SelectFloor.propTypes = {
  handleOnSelect: PropTypes.func.isRequired
};

export default SelectFloor;
