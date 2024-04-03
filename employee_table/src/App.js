import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import FileUpload from './Components/Fileupload/Fileupload';
import TablePage from './Components/EmployeeTable/EmployeeTable';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Insights from './Pages/Insights/Insights';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <ToastContainer/>
        <Header />
        <Routes>
          <Route path="/fileupload" element={<FileUpload />} />
          <Route path="/table" element={<TablePage />} />
          <Route path='/' element={<FileUpload />} />
          <Route path='/insights' element={<Insights />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
