// store.js

import { configureStore } from '@reduxjs/toolkit';
import employeeDetail from './EmployeeDetailSlice';

const store = configureStore({
  reducer: employeeDetail,
});

export default store;
