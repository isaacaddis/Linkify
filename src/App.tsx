import React from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import "./App.css";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <h1>Linkify</h1>
        </Grid>

      </Grid>
    </React.Fragment>
  )
}

export default App;
