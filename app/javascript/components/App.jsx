import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Home from "./pages/Home";

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends React.Component {
  render() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            UTest App
          </Typography>
        </Toolbar>
      </AppBar>
      <Home />
      </div>
    )
  }
}

export default withStyles(styles)(App);
