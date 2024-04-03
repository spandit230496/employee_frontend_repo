import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Select,
    MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import HOSTAME from "../../HOSTANAME";
import { useDispatch } from "react-redux";
import { setChartData ,setUpdated} from "../../Redux/EmployeeDetailSlice";
import {toast } from 'react-toastify';


const ChartDetailsModal = ({ open, handleClose, firstOpen, secondOpen }) => {
    const [formData, setFormData] = useState({
        title: "",
        dataType: "",
        field: "",
        data: "",
    });

    const SelectField = useSelector((state) => state.employeeData);
    const dispatch = useDispatch();

    const handleTitleChange = (event) => {
        setFormData({ ...formData, title: event.target.value });
    };
    const handleDataTypeChange = (event) => {
        setFormData({ ...formData, dataType: event.target.value });
    };

    const handleFieldChange = (event) => {
        setFormData({ ...formData, field: event.target.value });
    };

    const handleBack = () => {
        firstOpen(true);
        secondOpen(false);
    };

    const createChart = async () => {
        try {
            const response = await axios.get(
                `${HOSTAME}/getemployeedata?groupBy=${formData["field"]}&&aggregatedColumns=count`
            );
            toast("Chart created successfully");
            const updatedData = response.data.map((data) => {
                const keys = Object.keys(data);
                const firstKey = keys[0];
                
                return { column: data[firstKey], count: data.count };
            });
    
    
            setFormData({ ...formData, data: updatedData });
            dispatch(
                setChartData({ title: formData.title, data: updatedData,generated:true })
            );
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };
    
    const chartType = useSelector((state) => state.chartType);
    const updated=useSelector((state) => state.updated)

    useEffect(() => {
        
           if(updated) createChart();
           dispatch(setUpdated(false))
        
    }, [updated]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography sx={{ fontWeight: "bold" }}>
                    {chartType} chart Settings
                </Typography>
            </DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TextField
                    placeholder="Chart Title"
                    value={formData.title}
                    onChange={handleTitleChange}
                />
                <Select
                    labelId="data-type-select-label"
                    id="data-type-select"
                    value={formData.dataType}
                    onChange={handleTitleChange}
                    displayEmpty
                    sx={{ width: "100%" }}
                >
                    <MenuItem value="" disabled>
                        <em>Select Data Type</em>
                    </MenuItem>
                    <MenuItem value={formData.title}>Employee</MenuItem>
                </Select>
                <Select
                    labelId="field-select-label"
                    id="field-select"
                    value={formData.field}
                    onChange={handleFieldChange}
                    displayEmpty
                    sx={{ width: "100%" }}
                >
                    <MenuItem value="" disabled>
                        <em>Select Field</em>
                    </MenuItem>
                    {SelectField&&SelectField.map((item) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleBack}>Back</Button>
                <Button variant="contained" onClick={createChart}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChartDetailsModal;
