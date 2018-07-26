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

  moveThroughFloors = () => {
    return new Promise(resolve => {
      while (this.ascendingFloors.length !== 0) {
        console.log("current floor " + this.currentFloor);
        this.currentDirection = 1;
        if (this.currentFloor === this.ascendingDestination) {
          console.log("%c Reached floor " + this.currentFloor, "color: green;");
          this.ascendingFloors = this.ascendingFloors.slice(1)
        } else {
          this.currentFloor++;
        }
      }
      while (this.descendingFloors.length !== 0) {
        console.log("current floor " + this.currentFloor);
        this.currentDirection = -1;
        if (this.currentFloor === this.descendingDestination) {
          console.log("%c Reached floor " + this.currentFloor, "color: green;");
          this.descendingFloors.pop();
        } else {
          this.currentFloor--;
        }
      }
      resolve();
    });
  };

  move = async () => {
    this.moving = true;

    await this.moveThroughFloors();

    this.moving = false;
  };

  addToAscending = floor => {
    const newAscending = [...this.ascendingFloors, floor];
    const noDups = [...new Set(newAscending)].sort();
    this.ascendingFloors = noDups;
    this.ascendingDestination = noDups[0];
  };

  addToDescending = floor => {
    const newDescending = [...this.descendingFloors, floor];
    const noDups = [...new Set(newDescending)].sort();
    this.descendingFloors = noDups;
    this.descendingDestination = noDups[noDups.length - 1];
  };

  select = floor => {
    console.log("%c Selecting floor " + floor, "color: blue;");
    if (floor !== this.currentFloor) {
      if (floor < this.currentFloor) {
        this.addToDescending(floor);
      } else {
        this.addToAscending(floor);
      }
      if (!this.moving) {
        this.move();
      }
    }
  };

  render() {
    return (
      <SelectFloor handleOnSelect={this.select} />
    );
  }
}

export default Elevator;
