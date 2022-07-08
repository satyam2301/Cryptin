import React from 'react';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
  selectbutton: {
    border: '1px solid rgba(154,106,255,1)',
    borderRadius: 5,
    padding: 10,
    fontFamily: 'Montserrat',
    cursor: 'pointer',
    // backgroundColor: selected ? 'gold' : '',
    // color: selected ? 'black' : '',
    // fontWeight: selected ? 700 : 500,
    '&:hover': {
      border: '1px solid #EAF6F6',
      color: 'rgba(154,106,255,1)',
    },
    width: '15%',
    textAlign: 'center',
  },
});

const SelectButton = ({ children, selected, onClick }) => {
  const classes = useStyles();

  return (
    <span
      onClick={onClick}
      className={classes.selectbutton}
      style={{
        fontWeight: selected ? 700 : 500,
        background: selected
          ? 'linear-gradient(0deg, #9a6aff 0%, rgba(107,75,255,1) 100%)'
          : '',
        color: selected ? 'black' : '',
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
