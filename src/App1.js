import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import "./App.css";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function App() {
  const classes = useStyles();
  const classes1 = useRowStyles();
  const [open, setOpen] = useState(false);
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://192.168.10.10:8000/api/beauty/v1/treatment"
      );
      setTreatments(result.data.data);
      console.log(result.data.data);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Typography variant="h1" component="h2" gutterBottom>
            Tratamientos
            {treatments.length}
          </Typography>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left">Id</StyledTableCell>
                  <StyledTableCell align="left">Nombre</StyledTableCell>
                  <StyledTableCell align="left">Pvp</StyledTableCell>
                  <StyledTableCell align="left">Creado</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {treatments.map((row) => (
                  <StyledTableRow key={row.id}>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">{row.pvp}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.created_at}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
