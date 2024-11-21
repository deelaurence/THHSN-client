// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Home from './pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { signInAdmin } from './store/adminSlice.ts';
import { RootState, AppDispatch } from './store/store.ts';
 
import Navbar from './components/Navbar.tsx';
import AdminPrivateRoutes from './components/ProtectedRoute.tsx';
import { Sdk } from './utils/sdk.ts';
import AddProduct from './pages/admin/AddProduct.tsx';
import { ThemeProvider } from './contexts/AppContext.tsx';
const sdk = new Sdk()

const App: React.FC = () => {
  
  return (
    <div className='dark:bg-primary dark:text-secondary text-primary bg-secondary'>
    <ThemeProvider>
    <Router>
      <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path={sdk.adminLoginRoute} element={<AdminLogin/>} />
            <Route element={<AdminPrivateRoutes />}>
              <Route path={sdk.adminDashboardRoute} element={<AdminDashboard/>} />
              <Route path={sdk.addProductRoute} element={<AddProduct/>} />
            </Route>
        </Routes>
    </Router>
    </ThemeProvider>
    </div>
  );
};

export default App;
