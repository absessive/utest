import React from 'react';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class ExperienceCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      experience: []
    }
    this.fetchExperience = this.fetchExperience.bind(this);
  }

  fetchExperience(testerId) {
    fetch(`/api/${testerId}/experience`)
      .then(response => response.json())
      .then(data => {
        this.setState({ experience: data})
      })
  }

  componentDidMount() {
    this.fetchExperience(this.props.testerId);
  }

  render() {
    const { experience } = this.state;
    const { classes } = this.props;
    return(
      <TableCell>
        <Paper className={classes.root}>
          {experience.map( exp => {
            return(
              <Chip
                avatar={<Avatar>{exp.experience}</Avatar>}
                key={exp.device}
                label={exp.device}
                />
            );
          })}
        </Paper>
      </TableCell>
    )
  }
}


export default withStyles(styles)(ExperienceCell);
