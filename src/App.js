import React, { Component } from "react";
import { Grid, PageHeader } from "react-bootstrap";

import ElevatorContainer from "./ElevatorContainer.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <PageHeader>Elevator!</PageHeader>
          <ElevatorContainer />
        </Grid>
      </div>
    );
  }
}

export default App;
