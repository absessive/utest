import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

// Input and FormControl
import Grid from '@material-ui/core/Grid';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Button from '@material-ui/core/Button';

const toolbarStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
    width: 150,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontSize: 14
  },
  label: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  highlight: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.dark,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class SearchToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      searchCountries: [],
      searchDevices: [],
      devices: []
    }
    this.applyAll = this.applyAll.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.fetchInitialData = this.fetchInitialData.bind(this);
  }

  applyAll(event) {
    var applyFilters = this.props.applyFilters;
    applyFilters(this.state.searchCountries, this.state.searchDevices);
    event.preventDefault();
  }

  clearAll() {
    var clearFilters = this.props.clearFilters;
    this.setState({ searchCountries:[], searchDevices: [] });
    clearFilters();
  }

  handleChangeCountries = event => {
    if (event.target.value.includes('ALL')) {
      this.setState({ searchCountries: this.state.countries });
    } else {
      this.setState({ searchCountries: event.target.value });
    }
  };

  handleChangeDevices = event => {
    if (event.target.value.includes('ALL')) {
      this.setState({ searchDevices: this.state.devices });
    } else {
      this.setState({ searchDevices: event.target.value });
    }
  };

  fetchInitialData() {
    fetch('/api/devices.json')
      .then(response => response.json())
      .then(data => {
        this.setState({devices: data})
      });
    fetch('/api/countries.json')
      .then(response => response.json())
      .then(data => {
        this.setState({countries: data})
      });
  }

  componentDidMount() {
    this.fetchInitialData();
  }

  render() {
    const { classes } = this.props;
    const { countries, devices } = this.state;

    return (
      <Toolbar className={classNames(classes.root)}>
        <Grid container direction="row" justify="center" alignItems="baseline">
          <div className={classes.title}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-countries">Countries</InputLabel>
              <Select
                multiple
                value={this.state.searchCountries}
                onChange={this.handleChangeCountries}
                input={<Input id="select-countries" />}
                MenuProps={MenuProps}
              >
                <MenuItem key='ALL' value='ALL'>
                ALL
                </MenuItem>
                {countries.map(country => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-devices">Devices</InputLabel>
              <Select
                multiple
                value={this.state.searchDevices}
                onChange={this.handleChangeDevices}
                input={<Input id="select-devices" />}
                MenuProps={MenuProps}
              >
                <MenuItem key='ALL' value='ALL'>
                ALL
                </MenuItem>
                {devices.map(device => (
                  <MenuItem key={device} value={device}>
                  {device}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button variant="contained"
                color="secondary"                
                onClick={this.clearAll}>
                Clear
              </Button>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button variant="contained"
                color="primary"
                disabled={this.state.searchDevices.length == 0 || this.state.searchCountries.length == 0}
                onClick={this.applyAll}>
                Search
              </Button>
            </FormControl>

          </div>
        </Grid>
      </Toolbar>
    );
  }
}

SearchToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(toolbarStyles)(SearchToolbar);
