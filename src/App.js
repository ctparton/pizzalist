import React, {useState} from 'react';
import './App.css';
import Container from "@material-ui/core/Container";
import AppHeader from "./components/AppHeader";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Route, useRouteMatch, useHistory, Switch as Switcher, Redirect} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TabPanel from "./components/TabPanel";
import PizzaTable from "./components/PizzaTable";
import {Typography} from "@material-ui/core";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(null)
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green[500],
      },
    },
    root: {
      flexGrow: 1,
      backgroundColor: '#424242',
    },
  });
  let match = useRouteMatch({path: "home/:slug", strict: true,
    sensitive: true})
  const history = useHistory()
  const slugToTab = {
    "pizza": 0,
    "map": 1,
    "create": 2
  }
  const tabToSlug = {
    0: "pizza",
    1: "map",
    2: "create"
  }

  const tab = match ? slugToTab[match.params.slug] : 0
  const [currentTab, setCurrentTab] = useState(tab);

  const handleTabChange = (event, newValue) => {
    history.push(`/home/${tabToSlug[newValue]}`)
    setCurrentTab(newValue);
  };


  return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Paper style={{height: "100vh"}} elevation={0}>
            <div className="App">
              <AppHeader user={user}/>
              <Switcher>
                <Route path="/home">
                  <Tabs value={currentTab} onChange={handleTabChange} aria-label="simple tabs example">
                    <Tab label="Pizzas" />
                    <Tab label="Map"  />
                    <Tab label="Add to list" disabled={user !== undefined}/>
                  </Tabs>

                  {currentTab === 0 ? <PizzaTable></PizzaTable> : null}
                  {/*<TabPanel value={currentTab} index={0}>*/}
                  {/*  <PizzaTable></PizzaTable>*/}
                  {/*</TabPanel>*/}
                  <TabPanel value={currentTab} index={1}>
                    Item Two
                  </TabPanel>
                  <TabPanel value={currentTab} index={2}>
                    Item Three
                  </TabPanel>
                </Route>
                <Route exact path="/login">
                  <Login/>
                </Route>
                <Route exact path="/sign-up">
                  <SignUp/>
                </Route>
                <Route path="/">
                  <Redirect to="/home" />
                </Route>
                <Route path="*">
                  <Typography>Not found</Typography>
                </Route>
              </Switcher>

            </div>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)}></Switch>}
              label="Dark Mode"
            />
          </Paper>
        </Container>
      </ThemeProvider>
  );
}




export default App;
