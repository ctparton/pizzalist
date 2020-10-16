import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm} from "react-hook-form";
import Rating from "@material-ui/lab/Rating";
import opencage from "../services/opencage";
import pizzas from "../services/pizzas";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const CreatePizzaRating = ({user, notifyUser, pizza, setPizza}) => {
    let coordinates
    const classes = useStyles();
    const {register, handleSubmit}  = useForm()
    const [rating, setRating] = useState(0)
    const handleCreateNewPizza = async (data) => {
        try {
            coordinates = await opencage.getData({location: `${data.place} ${data.city}`})
        } catch (e) {
            notifyUser({text: e.response.data.error, status: "error"})
        }

        const newPizza = {
            pizza: data.name,
            city: data.city,
            place: data.place,
            rating: rating,
            coordinates: coordinates ? [coordinates.bounds.northeast.lat, coordinates.bounds.northeast.lng] : []
            // TODO: Add user info, handle coordinate error
        }

        try {
            const newlyCreatedPizza = await pizzas.create(newPizza)
            notifyUser({text: `Successfully rated new pizza`, status: "info"})
            setPizza(pizza.concat(newlyCreatedPizza))


        } catch (e) {
            // notifyUser({text: e.response.data.error, status: "error"})
            
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography variant="h3" gutterBottom>
                    Rate a new Pizza!
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit((data) => handleCreateNewPizza(data))}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                name="name"
                                variant="outlined"
                                inputRef={register}
                                required
                                fullWidth
                                id="name"
                                label="Pizza Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                inputRef={register}
                                required
                                fullWidth
                                name="place"
                                label="Restaurant"
                                id="place"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                inputRef={register}
                                required
                                fullWidth
                                name="city"
                                label="City"
                                id="city"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"h5"}>Rating</Typography>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                {/* eslint-disable-next-line react/jsx-no-undef */}
                                <Rating name="read-only" value={rating} onChange={((event, value) => setRating(value))} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default CreatePizzaRating