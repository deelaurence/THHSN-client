// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Home from './pages/Home';
import Placeholder from './components/PlaceHolderComponent.tsx'; 
import Navbar from './components/Navbar.tsx';
import AdminPrivateRoutes from './components/ProtectedRoute.tsx';
import { Sdk } from './utils/sdk.ts';
import AddProduct from './pages/admin/AddProduct.tsx';
import { ThemeProvider } from './contexts/AppContext.tsx';
import Inventory from './pages/admin/Inventory.tsx';
import ProductDetail from './pages/product/ProductDetail.tsx';
import RandomFacts from './pages/admin/RandomFacts.tsx';
import Footer from './components/Footer.tsx';
import MainShop from './pages/shop/MainShop.tsx';
const sdk = new Sdk()

const App: React.FC = () => {
  
  return (
    <div className='dark:bg-primary dark:text-secondary text-primary bg-secondary'>
    <ThemeProvider>
    <Router>
      <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path={sdk.shopRoute} element={<MainShop />} />
            <Route path={sdk.adminLoginRoute} element={<AdminLogin/>} />
            <Route element={<AdminPrivateRoutes />}>
              <Route path={sdk.adminDashboardRoute} element={<AdminDashboard/>} />
              <Route path={sdk.addProductRoute} element={<AddProduct/>} />
              <Route path={sdk.manageInventoryRoute} element={<Inventory/>} />
              <Route path={sdk.singleInventoryRoute+'/:name'} element={<ProductDetail/>}/>
              <Route path={sdk.managePaymentsRoute} element={<Placeholder header='Payments' paragraph='something here later'/>} />
              <Route path={sdk.productDraftsRoute} element={<Placeholder header='Drafts' paragraph='manage drafts'/>} />
              <Route path={sdk.salesRoute} element={<Placeholder header='Sales' paragraph='something here later'/>} />
              <Route path={sdk.manageUsersRoute} element={<Placeholder header='Users' paragraph='something here later'/>} />
              <Route path={sdk.randomFactsRoute} element={<RandomFacts/>} />
            </Route>
        </Routes>
        <Footer/>
    </Router>
    </ThemeProvider>
    </div>
  );
};

export default App;
