import React, { useEffect, useState } from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { TrendingCoins } from '../config/api';
import { CryptoState } from '../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    // backgroundImage: 'url(./undraw_crypto_portfolio_2jy5.png)',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      // height: '150px',
    },
  },
  card: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      height: '150px',
    },
    marginLeft: 20,
    height: '200px',
    background: 'rgba( 124, 173, 210, 0.25 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 5px )',
    webkitBackdropFilter: 'blur( 5px )',
    borderRadius: '20px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white',
    textDecoration: 'none',
  },
  img: {
    height: 80,
    [theme.breakpoints.down('sm')]: {
      height: 50,
    },
    marginBottom: 20,
  },
}));

// Regex to add commas in string
export const numberWithCommas = (curr_price) => {
  return curr_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();
  //   context api to pass currency in trending coins function
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  };
  // console.log(trending);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin, id) => {
    let profit = coin.price_change_percentage_24h;
    return (
      <>
        <Card className={classes.card}>
          <CardContent style={{ padding: 8, marginTop: 6, marginBottom: 6 }}>
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
              <img src={coin.image} alt={coin.name} className={classes.img} />
              <span style={{ marginBottom: 5 }}>
                {coin.symbol}
                &nbsp;
                <span
                  style={{
                    color: profit > 0 ? 'rgba(14,203,129' : 'red',
                  }}
                >
                  {profit > 0
                    ? '+' + profit.toFixed(2) + '%'
                    : profit.toFixed(2) + '%'}
                </span>
              </span>
              <span style={{ fontSize: 18, fontWeight: 500 }}>
                {`${symbol} ${numberWithCommas(coin.current_price.toFixed(2))}`}
              </span>
            </Link>
          </CardContent>
        </Card>
      </>
    );
  });

  const responsive = {
    0: { items: 2 },
    568: { items: 2 },
  };

  return (
    <div className={classes.carousel}>
      {/* <img src={back} alt={'background view'} className={classes.images} /> */}
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
