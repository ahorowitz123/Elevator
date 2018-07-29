import React, { Component } from "react";

import SelectFloor from "./SelectFloor";
import CallElevator from "./CallElevator";

const FLOOR_TIME = 3000;

class Elevator extends Component {
  currentFloor = 1;
  currentDirection = 0;
  ascendingFloors = [];
  descendingFloors = [];
  moving = false;
  ascendingDestination = 0;
  descendingDesitination = 0;

  componentDidMount = () => {
    console.log("Initialized Elevator");
  };

  delay = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  move = async () => {
    this.moving = true;
    console.log("Elevator is moving");

    while (
      this.ascendingFloors.length !== 0 ||
      this.descendingFloors.length !== 0
    ) {
      while (this.ascendingDestination >= this.currentFloor) {
        this.currentDirection = 1;
        if (this.currentFloor === this.ascendingDestination) {
          console.log("ascendingFloors: " + this.ascendingFloors);
          console.log("%cReached floor " + this.currentFloor, "color: green;");
          this.removeFromAscending();
          console.log("ascendingFloors after: " + this.ascendingFloors);
        } else {
          await this.delay(FLOOR_TIME);
          this.currentFloor++;
          console.log("current floor " + this.currentFloor);
        }
      }

      if (this.ascendingDestination < this.currentFloor) {
        while (this.ascendingDestination !== this.currentFloor) {
          if (this.descendingDestination <= this.currentFloor) {
            break;
          } else {
            await this.delay(FLOOR_TIME);
            this.currentFloor--;
            console.log("current floor " + this.currentFloor);
          }
        }
      }

      while (this.descendingDestination <= this.currentFloor) {
        this.currentDirection = -1;
        if (this.currentFloor === this.descendingDestination) {
          console.log("%cReached floor " + this.currentFloor, "color: green;");
          this.removeFromDescending();
        } else {
          await this.delay(FLOOR_TIME);
          this.currentFloor--;
          console.log("current floor " + this.currentFloor);
        }
      }

      if (this.descendingDestination > this.currentFloor) {
        while (this.descendingDestination !== this.currentFloor) {
          if (this.ascendingDestination >= this.currentFloor) {
            break;
          } else {
            await this.delay(FLOOR_TIME);
            this.currentFloor++;
            console.log("current floor " + this.currentFloor);
          }
        }
      }
    }

    console.log("Elevator has stopped");
    this.currentDirection = 0;
    this.moving = false;
  };

  addToAscending = floor => {
    const newAscending = [...this.ascendingFloors, floor];
    const noDups = [...new Set(newAscending)].sort();
    this.ascendingFloors = noDups;
    this.ascendingDestination = noDups[0];
  };

  removeFromAscending = () => {
    this.ascendingFloors.shift();
    this.ascendingDestination = this.ascendingFloors[0];
  };

  addToDescending = floor => {
    const newDescending = [...this.descendingFloors, floor];
    const noDups = [...new Set(newDescending)].sort();
    this.descendingFloors = noDups;
    this.descendingDestination = noDups[noDups.length - 1];
  };

  removeFromDescending = () => {
    this.descendingFloors.pop();
    this.descendingDestination = this.descendingFloors[
      this.descendingFloors.length - 1
    ];
  };

  select = floor => {
    console.log("%cSelecting floor " + floor, "color: blue;");
    if (floor !== this.currentFloor) {
      if (floor < this.currentFloor) {
        this.addToDescending(floor);
      } else {
        this.addToAscending(floor);
      }
      if (!this.moving) {
        this.move();
      }
    } else {
      if (this.moving) {
        console.log("adding");
        if (this.currentDirection === 1) {
          this.addToDescending(floor);
        } else if (this.currentDirection === -1) {
          this.addToAscending(floor);
        }
      }
    }
  };

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
        <SelectFloor handleOnSelect={this.select} />
        <CallElevator handleOnSelect={this.call} />
      </div>
    );
  }
}

export default Elevator;
