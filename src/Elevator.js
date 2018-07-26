import React, { Component } from "react";

import SelectFloor from "./SelectFloor";

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
      while (this.ascendingFloors.length !== 0) {
        console.log("current floor " + this.currentFloor);
        this.currentDirection = 1;
        if (this.currentFloor === this.ascendingDestination) {
          console.log("ascendingFloors: " + this.ascendingFloors);
          console.log("%cReached floor " + this.currentFloor, "color: green;");
          this.removeFromAscending();
          console.log("ascendingFloors after: " + this.ascendingFloors);
        } else {
          await this.delay(3000);
          this.currentFloor++;
        }
      }
      while (this.descendingFloors.length !== 0) {
        console.log("current floor " + this.currentFloor);
        this.currentDirection = -1;
        if (this.currentFloor === this.descendingDestination) {
          console.log("%cReached floor " + this.currentFloor, "color: green;");
          this.removeFromDescending();
        } else {
          await this.delay(3000);
          this.currentFloor--;
        }
      }
    }

    console.log("Elevator has stopped");
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
  }

  addToDescending = floor => {
    const newDescending = [...this.descendingFloors, floor];
    const noDups = [...new Set(newDescending)].sort();
    this.descendingFloors = noDups;
    this.descendingDestination = noDups[noDups.length - 1];
  };

  removeFromDescending = () => {
    this.descendingFloors.pop();
    this.descendingDestination = this.descendingFloors[this.descendingFloors.length - 1];
  }

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

  render() {
    return <SelectFloor handleOnSelect={this.select} />;
  }
}

export default Elevator;
