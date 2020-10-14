import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  }));

const Notification = ({text, status}) => {
    const classes = useStyles()
    if (!text) {
        return null
    }


    return (
        <Alert variant="filled" severity={status}>
          {text}
        </Alert>
    )
  }

export default Notification