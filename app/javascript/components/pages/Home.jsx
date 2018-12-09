import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import SearchToolbar from './SearchToolbar';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  grid: {
    margin: theme.spacing.unit
  },
});

const rows = [
  { id: 'full_name' , label: 'Full Name' },
  { id: 'country' , label: 'Country' },
  { id: 'experience', label: 'Experience'}
]

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDevices: [],
      selectedCountries: [],
      devices: [],
      countries: [],
      testers: [],
      searchResults: []
    }
    this.applyFilters = this.applyFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  fetchTesters(countries, devices) {
    var postBody = {
      countries: countries,
      devices: devices
    }
    fetch('/api/search.json', {
      method: 'post',
      body: JSON.stringify(postBody)
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.setState(
        {
          searchResults: data,
          selectedDevices: devices,
          selectedCountries: countries
        }
      )
    });
  }

  applyFilters(countries, devices) {
    this.fetchTesters(countries, devices)
  }

  clearFilters() {
    this.setState({
      selectedDevices: [],
      selectedCountries: [],
      searchResults: []
    });
  }

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
    const { testers, searchResults } = this.state;
    return(
      <div>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="h4" component="h3">
              UTest Search
            </Typography>
            <div className="search-results">
              <SearchToolbar applyFilters={this.applyFilters}
                clearFilters={this.clearFilters}
                devices={this.state.devices}
                countries={this.state.countries}
                />
              {this.state.searchResults.length == 0 ?
                (<div>No Search Results</div>) :
                (
                  <Table>
                    <TableHead>
                      <TableRow>
                        {rows.map(row => {
                          return (
                            <TableCell
                              key={row.id}
                              padding="default">
                              {row.label}
                            </TableCell>
                          );})}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {searchResults.map(n => {
                        return (
                          <TableRow key={n.tester_id}>
                            <TableCell>{`${n.first_name} ${n.last_name}`}</TableCell>
                            <TableCell>{n.country}</TableCell>
                            <TableCell>{n.experience}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )
              }
            </div>
          </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Home);
