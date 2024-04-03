import React, { useState } from 'react';
import { Button, Typography, Container, Box, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { read, utils } from 'xlsx';
import axios from 'axios';
import HOSTAME from '../../HOSTANAME';
import {toast } from 'react-toastify';


function FileUpload() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [exceldata, setExceldata] = useState([]);

const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(sheet);
      setExceldata(jsonData);
      setIsUploaded(true);
      setFileName(file.name);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSaveToDatabase = async () => {
    try {
       const result=await axios.post(`${HOSTAME}/postexceldata`,exceldata)
      setIsSaved(true); 
      toast(result.data.message)
    }
    catch(error) {
      toast("error while saving data to database")
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Box sx={{width:"40%",height:"40%",border:"1px dashed black",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <Typography variant="h4" gutterBottom>
          Upload a File
        </Typography>
        <Input
          type="file"
          onChange={handleFileChange}
          sx={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Choose File
          </Button>
        </label>
        <Typography>
          {fileName ? `File selected: ${fileName}` : 'No file selected'}
        </Typography>

        {isUploaded && !isSaved && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveToDatabase}
            disabled={!isUploaded} 
            mt={2}
          >
            Save to Database
          </Button>
        )}
          </Box>
        
        
        {isSaved && (
          <Typography variant="body1" mt={2} color="success">
            File saved to database successfully!
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default FileUpload;
