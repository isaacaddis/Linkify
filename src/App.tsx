import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import "./App.css";
import FrontPage from "./pages/FrontPage";
import CreateRoom from "./pages/CreateRoom";
import Room from "./pages/Room";

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
        <Router>
          <Route exact path="/" component={FrontPage} />
          <Route path="/room" component={Room} />
          <Route path="/createRoom" component={CreateRoom} />
        </Router>

      </Grid>
    </React.Fragment>
  )
}

export default App;
