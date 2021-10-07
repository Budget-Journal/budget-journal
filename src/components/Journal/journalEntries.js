import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./styles.css";




export default function JournalEntries({entry, index}){

    // Formats date from PostgreSQL to readable date
    function formatDate(date) {
        let d = new Date(date);
        return d = d.toLocaleDateString();
    }

    // Styling of the journal posts
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {formatDate(entry.date_posted)}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Goal: {entry.name}
                </Typography>
                <Typography variant="body2">
                    {entry.post_text}
                </Typography>
            </CardContent>
        </React.Fragment>
    );


    return (
        <Box sx={{ maxWidth: 700 }}>
            <Card 
                variant="outlined"
                className="journal-posts"
                >{card}</Card>
        </Box>
    )
}