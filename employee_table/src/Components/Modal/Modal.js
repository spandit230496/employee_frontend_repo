import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { setUpdated } from '../../Redux/EmployeeDetailSlice';

const EditEmployeeModal = ({ open, handleClose, handleSave,toEdit,saveEmployee }) => {
    const [editedEmployee, setEditedEmployee] = useState({});
    const employee=useSelector((state) => state?.initialState)
    const dispatch = useDispatch();
    useEffect(() => {
        setEditedEmployee(employee);
    }, [employee]);

    const handleInputChange = (e, key) => {
        setEditedEmployee({ ...editedEmployee, [key]: e.target.value });
    };

    const addEmployee = () => {
        saveEmployee(editedEmployee);
        dispatch(setUpdated(true));
        handleClose();
    };
    const onSave = () => {
        handleSave(editedEmployee);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{toEdit?"Edit Employee":"Add Employee"}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Employee ID"
                    value={editedEmployee?.employeeid || ''}
                    disabled={toEdit ? true : ""}
                    onChange={(e) => handleInputChange(e, 'employeeid')}
                    fullWidth
                />
                <TextField
                    label="Employee Name"
                    value={editedEmployee?.employeename || ''}
                    onChange={(e) => handleInputChange(e, 'employeename')}
                    fullWidth
                />
                <TextField
                    label="Employee Status"
                    value={editedEmployee?.employeestatus || ''}
                    onChange={(e) => handleInputChange(e, 'employeestatus')}
                    fullWidth
                />
                <TextField
                    label="Joining Date"
                    type="date"
                    value={editedEmployee?.joiningdate || ''}
                    onChange={(e) => handleInputChange(e, 'joiningdate')}
                    fullWidth
                />
                <TextField
                    label="Birth Date"
                    type="date"
                    value={editedEmployee?.birthdate || ''}
                    onChange={(e) => handleInputChange(e, 'birthdate')}
                    fullWidth
                />
                <TextField
                    label="Salary"
                    value={editedEmployee?.salary || ''}
                    onChange={(e) => handleInputChange(e, 'salary')}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={toEdit?onSave:addEmployee}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditEmployeeModal;
