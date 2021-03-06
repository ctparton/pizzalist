import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory, Link} from "react-router-dom";

const AppHeader = ({user}) => {
    const history = useHistory()
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }))
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                    {/*    <MenuIcon />*/}
                    {/*</IconButton>*/}
                    {/*<Link to="/">*/}
                        <Typography variant="h6" className={classes.title}>
                            Pizza<span role="img" aria-label="Pizza slice">🍕</span>
                        </Typography>
                    {/*</Link>*/}
                    {user ? null :
                        <Link to="/login">
                            <Button color="inherit">Login</Button>
                        </Link>
                    }

                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AppHeader