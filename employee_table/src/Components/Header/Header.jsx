import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import TableChartIcon from '@mui/icons-material/TableChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import { Link } from 'react-router-dom';
import Insights from '../../Pages/Insights/Insights';

function Header() {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {open && <Insights />}
            <Paper sx={{ height: "4rem", width: '90%', margin: "auto", display: "flex", alignItems: "center" }}>
                <Grid container justifyContent="flex-end" paddingRight={2}>
                    <IconButton onClick={() => setOpen(true)} color='primary'>
                        <PieChartIcon />
                    </IconButton>
                    <Typography>Visualization</Typography>
                </Grid>
            </Paper>
            <Paper sx={{ height: "4rem", width: '90%', margin: "auto", display: "flex", alignItems: "center" }}>
                <Grid container justifyContent="space-between" padding={2} boxSizing="border-box">
                    <Typography variant="h6" component="div">
                        Employee Table
                    </Typography>
                    <Box display="flex">
                        <Link to="/fileupload" style={{ textDecoration: 'none', marginRight: '1rem' }}>
                            <IconButton color="inherit">
                                <DriveFileMoveIcon />
                            </IconButton>
                        </Link>
                        <Link to="/table" style={{ textDecoration: 'none' }}>
                            <IconButton color="inherit">
                                <TableChartIcon />
                            </IconButton>
                        </Link>
                    </Box>
                </Grid>
            </Paper>
        </Box>
    );
}

export default Header;
