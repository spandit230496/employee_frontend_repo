import React, { useEffect, useState } from "react";
import axios from "axios";
import HOSTNAME from "../../HOSTANAME";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Box,
    Button,
    Typography,
    Container,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setEditableData } from "../../Redux/EmployeeDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import EditEmployeeModal from "../Modal/Modal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { setEmployeeData, setUpdated } from "../../Redux/EmployeeDetailSlice";
import Chart from "../Charts/Charts";

const EmployeeTable = () => {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [toEdit, setToEdit] = useState(false);
    const [showAddColumnModal, setShowAddColumnModal] = useState(false);
    const [newColumnName, setNewColumnName] = useState("");
    const [columns, setColumns] = useState([]);
    const dispatch = useDispatch();
    const isGenerated = useSelector((state) => state?.employeeData?.generated);

    useEffect(() => {
        if (isGenerated) {
            window.scrollTo({
                bottom: 0,
                behavior: "smooth",
            });
        }
    }, [isGenerated]);

    useEffect(() => {
        getData();
    }, [limit, offset]);

    const getData = async () => {
        try {
            const response = await axios.get(
                `${HOSTNAME}/getemployeedata?limit=${limit}&offset=${offset}`
            );
            setData(response.data);
            dispatch(setEmployeeData(Object.keys(response.data[0]), true));
            setColumns(Object.keys(response.data[0]));
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error fetching data");
        }
    };

    const nextPage = () => {
        setOffset(offset + limit);
    };

    const previousPage = () => {
        if (offset - limit < 0) return;
        setOffset(offset - limit);
    };

    const handleEdit = (row) => {
        dispatch(setEditableData(row));
        setShowModal(true);
        setToEdit(true);
    };

    const addEmployee = () => {
        dispatch(setEditableData(null));
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`${HOSTNAME}/deletedata`, { id });
            dispatch(setUpdated(true));
            toast.success("Employee deleted successfully");
            getData();
        } catch (error) {
            console.error("Error deleting employee:", error);
            toast.error("Error deleting employee");
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };
    
    const updateEmployee = async (row) => {
        try {
            const res = await axios.post(`${HOSTNAME}/updatedata`, { row });
            getData();
            toast("Data updated successfully");
        } catch (error) {
            toast("Something went wrong");
            console.log(error);
        }
    };
    const saveEmployee = async (row) => {
        try {
            const res = await axios.post(`${HOSTNAME}/saveemployee`, { row });
            getData();
            toast("Data added successfully");
        } catch (error) {
            toast("Something went wrong");
            console.log(error);
        }
    };

    const handleAddColumn = () => {
        setShowAddColumnModal(true);
    };

    const handleCloseAddColumnModal = () => {
        setShowAddColumnModal(false);
        setNewColumnName("");
    };

    const handleAddColumnSubmit = async () => {
        try {
            const addedColumnName = await axios.post(`${HOSTNAME}/addcolumn`, {
                columnName: newColumnName,
            });
            toast("Column added successfully");
            setColumns([...columns, addedColumnName]);
            setShowAddColumnModal(false);
            setNewColumnName("");
        } catch (error) {
            toast("Something went wrong");
            console.error("Error adding column:", error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h5" component="div">
                    Employee List
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={addEmployee}
                >
                    Add Employee
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddColumn}
                >
                    Add Column
                </Button>
            </Box>
            <Dialog
                open={showAddColumnModal}
                onClose={handleCloseAddColumnModal}
            >
                <DialogTitle>Add New Column</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Column Name"
                        value={newColumnName}
                        onChange={(e) => setNewColumnName(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddColumnModal}>Cancel</Button>
                    <Button onClick={handleAddColumnSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
            <EditEmployeeModal
                open={showModal}
                handleClose={handleModalClose}
                addEmployee={addEmployee}
                handleSave={updateEmployee}
                saveEmployee={saveEmployee}
                toEdit={toEdit}
            />
            <Box sx={{ overflowX: "auto" }}>
                <Table>
                    {data && data.length > 0 && (
                        <>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        
                                        <TableCell key={column}>
                                            {console.log(column,"colopioiojioj")}
                                            {typeof column === "string" ? (
                                                <Typography variant="body1">
                                                    {column.toUpperCase()}
                                                </Typography>
                                            ) : (
                                                column
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell>ACTIONS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={index}>
                                        {columns.map((column) => (
                                            <TableCell key={column}>
                                                {row[column]}
                                            </TableCell>
                                        ))}
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleEdit(row)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() =>
                                                    handleDelete(
                                                        row["employeeid"]
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </>
                    )}
                </Table>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Grid container justifyContent="space-between">
                    <Button onClick={previousPage}>Previous</Button>
                    <Button onClick={nextPage}>Next</Button>
                </Grid>
            </Box>
            <Chart style={{ width: "80%", height: "80%" }} />
        </Container>
    );
};

export default EmployeeTable;
