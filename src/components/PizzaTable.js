import React, {useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box";
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
    table: {
        width: 1,
    },
});


const PizzaTable = ({pizzas}) => {
    const classes = useStyles();
    // TODO: Add delete to table elements if user created pizza
    // TODO: Add link to pizza info page, as card widget
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Pizza</strong></TableCell>
                            <TableCell align="right"><strong>City</strong></TableCell>
                            <TableCell align="right"><strong>Place</strong></TableCell>
                            <TableCell align="right"><strong>Toppings</strong></TableCell>
                            <TableCell><strong>Rating</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pizzas.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell component="th" scope="row">
                                    {p.pizza}
                                </TableCell>
                                <TableCell align="right">{p.city}</TableCell>
                                <TableCell align="right">{p.place}</TableCell>
                                <TableCell align="right">{p.toppings}</TableCell>
                                <TableCell align="right"> <Box component="fieldset" mb={3} borderColor="transparent">
                                    {/* eslint-disable-next-line react/jsx-no-undef */}
                                    <Rating name="read-only" value={p.rating} readOnly />
                                </Box></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PizzaTable