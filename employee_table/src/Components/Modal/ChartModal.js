import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Box,
} from "@mui/material";
import Charts from "../../ChartsTypes";
import { useDispatch } from "react-redux";
import { setChartType ,setChartDetailsVisibility} from "../../Redux/EmployeeDetailSlice";

const ChartModal = ({ open, handleClose ,chartClicked}) => {
    const dispatch = useDispatch();

    const handleChartType = (type) => {
        dispatch(setChartType(type));
        dispatch(setChartDetailsVisibility(true))
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography sx={{ fontWeight: "bold" }}>
                    Select Chart Type
                </Typography>
            </DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {Charts.map((chart) => (
                    <Button
                        key={chart.name}
                        onClick={() => {
                            handleClose(chart.type);
                            handleChartType(chart.type);
                            chartClicked(chart.name);
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                margin: "auto",
                                textAlign: "center",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                src={chart.image}
                                alt={chart.name}
                                width="120px"
                                height="auto"
                                style={{
                                    margin: "auto",
                                }}
                            />
                            <Typography>{chart.name}</Typography>
                        </Box>
                    </Button>
                ))}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChartModal;
