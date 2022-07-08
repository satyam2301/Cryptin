import {
  AppBar,
  Container,
  makeStyles,
  createTheme,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  ThemeProvider,
} from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  bar: {
    backgroundImage: '#080607',
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // to navigate to the main page when click on the logo itself
  const handleClick = (e) => navigate('/');

  // used context api here to change currency value
  const { currency, setCurrency } = CryptoState();
  // console.log(currency);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#080607',
      },
      type: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar className={classes.bar} position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={handleClick}
              className={classes.title}
              variant="h5"
              style={{ color: '#fafafa' }}
            >
              CRYPTIN
            </Typography>
            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
