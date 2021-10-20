import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import JournalPosts from "../JournalPostsByGoal/JournalPostsByGoal";
import useStyles from "./style";

//Material UI Imports
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//End Material UI Imports

export default function CompletedGoalCardView() {
  // Material UI, handles the expand
  const classes = useStyles();
  // Setting reducers to variables
  const goalDetails = useSelector((store) => store.viewGoalDetails);
  const journal = useSelector((store) => store.journalPosts);
  const budgetDetails = useSelector((store) => store.budgetTableReducer);

  return (
    <div>
      <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2" align="center">
              {goalDetails.name}
            </Typography>
            <Divider />
            <br />
            <div className={classes.imageSection}>
              <div
                dangerouslySetInnerHTML={{ __html: goalDetails.reasons }}
              ></div>
              <img
                className={classes.media}
                src="https://cdn.travelpulse.com/images/abaaedf4-a957-df11-b491-006073e71405/25b80fab-d2f1-4ff0-b531-9f266118cd28/630x355.jpg"
              />
            </div>

            <TableContainer>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="Table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Expense</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Price</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Notes</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {budgetDetails.map((expense, index) => (
                    <TableRow key={index}>
                      <TableCell>{expense.expense}</TableCell>
                      <TableCell align="right">{expense.price}</TableCell>
                      <TableCell align="right">{expense.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <div className={classes.section}>
              <Typography gutterBottom variant="h4">
                Journal
              </Typography>
              <Divider />
              <JournalPosts journal={journal} />
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}

