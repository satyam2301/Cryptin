import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  banner: {
    // backgroundColor: '#030409',
    backgroundColor: '#080607',
    // background-image: linear-gradient(to top, #5f72bd 0%, #9b23ea 100%);
  },
  bannercontent: {
    height: '91vh',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    paddingTop: 25,
    justifyContent: 'space-around',
  },
  tagline: {
    display: 'flex',
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '10',
    // textAlign: 'center',
  },
  taglineheader: {
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'Montserrat',
    color: '#fafafa',
    fontSize: '50px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px',
    },
  },
  taglinepara: {
    color: '#b6cce2',
    textTransform: 'Capitalize',
    fontFamily: 'Montserrat',
    fontSize: '25px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
    },
  },
  imgcontainer: {
    // display: 'flex',
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: '0%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  images: {
    height: '108%',
    zIndex: '10',
  },
  blur: {
    background: '#ca82ff',
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(212px)',
    zIndex: '5',
    width: '20rem',
    height: '20rem',
    top: '10%',
    right: '10%',
  },
}));

const Banner = () => {
  const classes = useStyles();

  const sideview = './CRYPTIN.png';

  return (
    <div className={classes.banner}>
      <div className={classes.blur}></div>
      <Container className={classes.bannercontent}>
        <div className={classes.tagline}>
          <Typography variant="h2" className={classes.taglineheader}>
            Make your crypto tracking easier
          </Typography>
          <Typography variant="subtitle2" className={classes.taglinepara}>
            Coin Available including Bitcoin, Ethereum and many others.
          </Typography>
        </div>
        <div className={classes.imgcontainer}></div>
        <img src={sideview} alt="side view" className={classes.images} />
      </Container>
    </div>
  );
};

export default Banner;
