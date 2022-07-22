import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  createTheme,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { CoinList } from '../config/api';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  row: {
    backgroundColor: '#16171a',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#131111',
    },
    fontFamily: 'Montserrat',
  },
  pagination: {
    '& .MuiPaginationItem-root': {
      color: '#fafafa',
    },
  },
  secSection: {
    backgroundColor: '#080607',
    color: '#fafafa',
  },
  containerTable: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
}));

// Regex to add commas in string
export const numberWithCommas = (curr_price) => {
  return curr_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const classes = useStyles();
  // import currency from context api to use that in this child
  const { currency, symbol } = CryptoState();

  // function to fetch coins from api
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    // console.log(data);
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#000',
      },
      type: 'dark',
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.secSection}>
        <Container
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" style={{ fontFamily: 'Montserrat' }}>
            CryptoCurrency Prices by Market Cap
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            color="secondary"
            label="Search Any CryptoCurrency"
            style={{
              marginBottom: 30,
              width: '80%',
              color: 'white',
              borderRadius: '10px',
              marginTop: '50px',
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer className={classes.containerTable}>
            {loading ? (
              <LinearProgress style={{ backgroundColor: '#9A6AFF' }} />
            ) : (
              <>
                <Table>
                  <TableHead
                    style={{
                      background:
                        'linear-gradient(0deg, #9a6aff 0%, #6b4bff 100%)',
                    }}
                  >
                    <TableRow>
                      {['Coin', 'Price', '24h Change', 'Market Cap'].map(
                        (head) => (
                          <TableCell
                            style={{
                              color: 'black',
                              fontWeight: '700',
                              fontFamily: 'Montserrat',
                              fontSize: '22px',
                            }}
                            key={head}
                            align={head === 'Coin' ? '' : 'right'}
                          >
                            {head}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {handleSearch()
                      .slice((page - 1) * 10, (page - 1) * 10 + 10)
                      .map((row) => {
                        const profit = row.price_change_percentage_24h;
                        return (
                          <TableRow
                            onClick={() => navigate(`/coins/${row.id}`)}
                            className={classes.row}
                            key={row.name}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{ display: 'flex', gap: 15 }}
                            >
                              <img
                                src={row.image}
                                alt={row.name}
                                height="50"
                                style={{ marginBottom: 10 }}
                              />
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: 'uppercase',
                                    fontSize: 22,
                                  }}
                                >
                                  {row.symbol}
                                </span>
                                <span style={{ color: 'darkgrey' }}>
                                  {row.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell align="right">
                              {`${symbol} ${numberWithCommas(
                                row.current_price.toFixed(2)
                              )}`}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{
                                color: profit > 0 ? 'rgba(14,203,129)' : 'red',
                              }}
                            >
                              {profit > 0
                                ? '+' + profit.toFixed(2) + '%'
                                : '-' + profit.toFixed(2) + '%'}
                            </TableCell>
                            <TableCell align="right">
                              {`${symbol} ${numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                              )} M`}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </>
            )}
          </TableContainer>
          <Pagination
            style={{
              paddingTop: 30,
              paddingBottom: 30,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
            variant="outlined"
            shape="rounded"
            classes={{ ul: classes.pagination }}
            count={(handleSearch().length / 10).toFixed(0)}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 1350);
            }}
          />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default CoinsTable;
