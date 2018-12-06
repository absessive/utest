import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableFooter from '@material-ui/core/TableFooter';

import ExperienceCell from './ExperienceCell';
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
      testers: []
    }
  }
  fetchTesters() {
    fetch('/api/list_testers.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState(
          {
            testers: data
          }
        )
      });
  }

  componentDidMount() {
    this.fetchTesters();
  }

  render() {
    const { classes } = this.props;
    const { testers } = this.state;
    return(
      <div>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="h4" component="h3">
              UTest Search
            </Typography>
            <SearchToolbar />
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
                {testers.map(n => {
                  return (
                    <TableRow key={n.tester_id}>
                      <TableCell>{`${n.first_name} ${n.last_name}`}</TableCell>
                      <TableCell>{n.country}</TableCell>
                      <ExperienceCell testerId={n.tester_id} />
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Home);
