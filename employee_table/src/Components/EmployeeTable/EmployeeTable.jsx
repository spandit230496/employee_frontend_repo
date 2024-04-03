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
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setEditableData } from "../../Redux/EmployeeDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import EditEmployeeModal from "../Modal/Modal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { setEmployeeData ,setUpdated} from "../../Redux/EmployeeDetailSlice";
import Chart from "../Charts/Charts";

const EmployeeTable = () => {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [toEdit, setToEdit] = useState(false);
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

    const getData = async () => {
        try {
            const response = await axios.get(
                `${HOSTNAME}/getemployeedata?limit=${limit}&offset=${offset}`
            );
            setData(response.data);
            dispatch(setEmployeeData(Object.keys(response.data[0]),true));
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error fetching data");
        }
    };

    useEffect(() => {
        getData();
    }, [limit, offset]);

    const nextPage = () => {
        setOffset(offset + limit);
    };

    const previousPage = () => {
        if (offset - limit < 0) return;
        setOffset(offset - limit);
    };
    const EmployeeDataEdit = async (row) => {
        try {
            const res = await axios.post(`${HOSTNAME}/updatedata`, { row });

            dispatch(setUpdated(true));
            getData();
            toast(res.data.message);
        } catch (error) {
            console.log(error);
        }
        dispatch(setEditableData(row));
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
    const saveEmployee=async(row)=>{
        try{
            const res=await axios.post(`${HOSTNAME}/saveemployee`,{row})
            getData()        
            toast("Data added successfully")
        }catch(error){
          toast("Something went wrong")
            console.log(error)
        }
       }

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5" component="div">Employee List</Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={addEmployee}>Add Employee</Button>
            </Box>
            <EditEmployeeModal
                open={showModal}
                handleClose={handleModalClose}
                addEmployee={addEmployee}
                handleSave={EmployeeDataEdit}
                toEdit={toEdit}
                saveEmployee={saveEmployee}
            />
            <Box sx={{ overflowX: "auto" }}>
                <Table>
                    {data && data.length > 0 && (
                        <>
                            <TableHead>
                                <TableRow>
                                    {Object.keys(data[0]).map((key) => (
                                        <TableCell key={key}>
                                            {key.toUpperCase()}
                                        </TableCell>
                                    ))}
                                    <TableCell>ACTIONS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.id}>
                                        {Object.keys(row).map((key) => (
                                            <TableCell key={key}>
                                                {row[key]}
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
                                                    handleDelete(row["employeeid"])
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
