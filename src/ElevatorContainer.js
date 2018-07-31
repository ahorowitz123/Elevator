import React, { Component } from "react";
import { Row } from "react-bootstrap";

import SelectFloor from "./SelectFloor";
import CallElevator from "./CallElevator";

// Amount of time in ms it takes to get to another floor
const FLOOR_TIME = 3000;
// Total amount of floors
const FLOORS = 10;
// Array of amount of floors
const FLOOR_ARRAY = Array.from(Array(FLOORS), (_, x) => x + 1);

class ElevatorContainer extends Component {
  // elevator instance variables
  // floor the elevator is currently at
  currentFloor = 1;
  // direction the elevator is going (1 = up, -1 = down)
  currentDirection = 0;
  // array to keep track of ascending floors to go to
  ascendingFloors = [];
  // array to keep track of descending floors to go to
  descendingFloors = [];
  // whether the elevator is moving or not
  moving = false;
  // floor index to stop at if ascending
  ascendingDestination = 0;
  // floor index to stop out if descending
  descendingDesitination = 0;

  componentDidMount = () => {
    console.log("Initialized Elevator");
  };

  // return promis of delay
  delay = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  // move up a floor
  moveUp = () => {
    this.currentFloor++;
    console.log("%cCurrent floor " + this.currentFloor, "color: orange;");
  };

  // move down a floor
  moveDown = () => {
    this.currentFloor--;
    console.log("%cCurrent floor " + this.currentFloor, "color: orange");
  };

  // asynchronously move the elevator
  move = async () => {
    this.moving = true;
    console.log("%cElevator is moving", "color: green;");

    // while there are still requested floors
    while (
      this.ascendingFloors.length !== 0 ||
      this.descendingFloors.length !== 0
    ) {
      // move up first, go to all floors requested that are greater or equal to
      // the current floor
      while (this.ascendingDestination >= this.currentFloor) {
        this.currentDirection = 1;
        if (this.currentFloor === this.ascendingDestination) {
          console.log("%cReached floor " + this.currentFloor, "color: green;");
          this.removeFromAscending();
        } else {
          await this.delay(FLOOR_TIME);
          this.moveUp();
        }
      }

      // go down if elevator was called below us in ascending direction
      if (this.ascendingDestination < this.currentFloor) {
        while (this.ascendingDestination !== this.currentFloor) {
          // catch descending floors on the way down
          if (this.descendingDestination <= this.currentFloor) {
            break;
          } else {
            await this.delay(FLOOR_TIME);
            this.moveDown();
          }
        }
      }

      // move udown, go to all floors requested that are equal to or less than
      // the current floor
      while (this.descendingDestination <= this.currentFloor) {
        this.currentDirection = -1;
        if (this.currentFloor === this.descendingDestination) {
          console.log("%cReached floor " + this.currentFloor, "color: green;");
          this.removeFromDescending();
        } else {
          await this.delay(FLOOR_TIME);
          this.moveDown();
        }
      }

      // go up if elevator was called above us in descending direction
      if (this.descendingDestination > this.currentFloor) {
        while (this.descendingDestination !== this.currentFloor) {
          // catch ascending floors on the way up
          if (this.ascendingDestination >= this.currentFloor) {
            break;
          } else {
            await this.delay(FLOOR_TIME);
            this.moveUp();
          }
        }
      }
    }

    console.log("%cElevator has stopped", "color: red;");
    this.currentDirection = 0;
    this.moving = false;
  };

  // get next greatest floor. if none just return first element
  getNextGreatest = () => {
    for (let i = 0; i < this.ascendingFloors.length; i++) {
      if (this.ascendingFloors[i] > this.currentFloor) {
        console.log("Ascending floors: " + this.ascendingFloors);
        console.log("Next floor: " + this.ascendingFloors[i]);
        return this.ascendingFloors[i];
      }
    }

    return this.ascendingFloors[0];
  };

  // get next smallest floor. if none just return last element
  getNextSmallest = () => {
    for (let i = this.descendingFloors.length - 1; i >= 0; i--) {
      if (this.descendingFloors[i] < this.currentFloor) {
        return this.descendingFloors[i];
      }
    }

    return this.descendingFloors[this.descendingFloors.length - 1];
  };

  // add floor to ascending array
  addToAscending = floor => {
    const newAscending = [...this.ascendingFloors, floor];
    // get rid of duplicates and sort
    const noDups = [...new Set(newAscending)].sort((a, b) => {
      return a - b;
    });
    this.ascendingFloors = noDups;
    console.log("ascendingFloors: " + noDups);
    // set destination to next greatest floor
    this.ascendingDestination = this.getNextGreatest();
  };

  // remove from ascending list
  removeFromAscending = () => {
    // remove current floor from array
    this.ascendingFloors = this.ascendingFloors.filter(
      floor => floor !== this.currentFloor
    );
    // set next destination to next greatest
    this.ascendingDestination = this.getNextGreatest();
  };

  // add to descending array
  addToDescending = floor => {
    const newDescending = [...this.descendingFloors, floor];
    // get rid of duplicates and sort
    const noDups = [...new Set(newDescending)].sort((a, b) => {
      return b - a;
    });
    this.descendingFloors = noDups;
    // set destination to next smallest
    this.descendingDestination = this.getNextSmallest(floor);
  };

  // remove from descending array
  removeFromDescending = () => {
    // remove current floor from array
    this.descendingFloors = this.descendingFloors.filter(
      floor => floor !== this.currentFloor
    );
    // set next destination to next smallest
    this.descendingDestination = this.getNextSmallest(this.currentFloor);
  };

  // select a floor
  select = floor => {
    console.log("%cSelecting floor " + floor, "color: blue;");
    // if not on current floor
    if (floor !== this.currentFloor) {
      // add to appropriate array
      if (floor < this.currentFloor) {
        this.addToDescending(floor);
      } else {
        this.addToAscending(floor);
      }
      // set to moving
      if (!this.moving) {
        this.move();
      }
    } else {
      // if we are already moving and current floor is selected, we have already left current floor
      if (this.moving) {
        if (this.currentDirection === 1) {
          this.addToDescending(floor);
        } else if (this.currentDirection === -1) {
          this.addToAscending(floor);
        }
      }
    }
  };

  // call elevator
  call = (floor, direction) => {
    console.log(
      "%cCalling elevator from floor " + floor + " with direction " + direction,
      "color: blue;"
    );
    if (direction === 1) {
      this.addToAscending(floor);
    } else {
      this.addToDescending(floor);
    }

    if (!this.moving) {
      this.move();
    }
  };

  render() {
    return (
      <div>
        <Row>
          <SelectFloor handleOnSelect={this.select} floorArray={FLOOR_ARRAY} />
        </Row>
        <Row>
          <CallElevator handleOnSelect={this.call} floorArray={FLOOR_ARRAY} />
        </Row>
      </div>
    );
  }
}

export default ElevatorContainer;
