import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import JournalPosts from '../JournalPostsByGoal/JournalPostsByGoal';
import useStyles from './style';

//Material UI Imports
import { TextField, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
//End Material UI Imports


export default function CompletedGoalCardView() {
    // Material UI, handles the expand
    const classes = useStyles();
    // Setting reducers to variables
    const goalDetails = useSelector(store => store.viewGoalDetails);
    const journal = useSelector(store => store.journalPosts);
    const budgetDetails = useSelector(store => store.budgetTableReducer);


    return (
        <div>
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                     <div className={classes.section}>
                        <Typography variant="h3" component="h2" align="center">{goalDetails.name}</Typography>
                            <Divider />
                             <br/>
                            <div className={classes.imageSection}>
                                <div dangerouslySetInnerHTML={{__html: goalDetails.reasons}}></div>
                                {/* <img className={classes.media} src="https://iajw.org/wp-content/uploads/2019/09/What-is-journal-writing-image-of-blank-journal.jpg" /> */}
                            </div>
                             
                                <TableContainer>
                                <Table sx={{ minWidth:650}} size="small" aria-label="Table">
                                    <TableHead>
                                        <TableRow>
                                        <TableCell><strong>Expense</strong></TableCell>
                                        <TableCell align="right"><strong>Price</strong></TableCell>
                                        <TableCell align="right"><strong>Notes</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                        <TableBody>
                                        {budgetDetails.map((expense, index)=> (
                                            <TableRow key={index}>
                                            <TableCell>{expense.expense}</TableCell>
                                            <TableCell align="right">{expense.price}</TableCell>
                                            <TableCell align="right">{expense.notes}</TableCell>
                                            </TableRow>))}
                                        </TableBody>
                                </Table>
                                </TableContainer>
                                <br/>
                                <div className={classes.section}>
                            <Typography gutterBottom variant="h4">Journal</Typography>
                            <Divider />
                        <JournalPosts journal = {journal}/>
                    </div>
                </div>
            </div>
            </Paper>
        </div>
    )
}





{/* <table>
        <thead>
            <tr>
                <th>Expense</th>
                <th>Price</th>
                <th>Notes</th>
            </tr>
        </thead>
        <tbody>
            {details.map(detail => (
                <BudgetTable goal={goalDetails} detail={detail} />
            ))}
        </tbody>
    </table>

    <div>
        <JournalPosts journal={journal} />
    </div> */}