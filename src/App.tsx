// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Home from './pages/Home';
import Placeholder from './components/PlaceHolderComponent.tsx'; 
import Navbar from './components/Navbar.tsx';
import {AdminPrivateRoutes,UserPrivateRoutes} from './components/ProtectedRoute.tsx';
import { Sdk } from './utils/sdk.ts';
import AddProduct from './pages/admin/AddProduct.tsx';
import UserLogin from './pages/user/UserLogin.tsx';
import { ThemeProvider } from './contexts/AppContext.tsx';
import Inventory from './pages/admin/Inventory.tsx';
import ProductDetail from './pages/product/ProductDetail.tsx';
import RandomFacts from './pages/admin/RandomFacts.tsx';
import Footer from './components/Footer.tsx';
import MainShop from './pages/shop/MainShop.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import UserCart from './pages/cart/userCart.tsx';
import DraftInventory from './pages/admin/Drafts.tsx';
import ExchangeRate from './pages/admin/ExchangeRate.tsx';
import UserRegistration from './pages/user/UserRegister.tsx';
import NotFound from './pages/NotFound.tsx';
import EmailSent from './pages/user/EmailSent.tsx';
import AccountVerified from './pages/user/AccountVerified.tsx';
import ForgotPassword from './pages/user/ForgotPassword.tsx';
import UpdatePassword from './pages/user/UpdatePassword.tsx';
import Notifications from './components/Notifications.tsx';
import { fetchExchangeRate} from './store/fetchProductSlice.ts';
import { AppDispatch } from './store/store.ts';
import { useDispatch } from 'react-redux';
import UserInventory from './pages/admin/Users.tsx';
import GoogleSignInSuccess from './pages/user/GoogleSignInSuccess.tsx';
import Checkout from './pages/checkout/Checkout.tsx';
import ShippingOptions from './pages/admin/ShippingOptions.tsx';
import Receipt from './pages/receipt/Receipt.tsx';
//@ts-ignore
import FontFaceObserver from 'fontfaceobserver'
import ContactUs from './pages/staticpages/ContactUs.tsx';
import PrivacyPolicy from './pages/staticpages/Policy.tsx';
import TermsOfService from './pages/staticpages/TermsOfService.tsx';
import SalesCategory from './pages/admin/sales/SalesCategories.tsx';
import TrackProduct from './pages/user/TrackProduct.tsx';
// import Loader from './components/Loader.tsx';
const sdk = new Sdk()

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(fetchExchangeRate())
  },[])

  // const [fontLoaded, setFontLoaded] = useState(false);
  

  // useEffect(() => {
  //   const font = new FontFaceObserver("Frunchy"); // Replace with your actual font name
  //   font.load().then(() => {
  //     setFontLoaded(true);
  //   }).catch(() => {
  //     console.error("Font failed to load.");
  //   });
  // }, []);
  
  return (
    <>
  
    <div className='dark:bg-primary   sm:hidden dark:text-secondary text-primary  bg-secondary'>
    <ThemeProvider>

    <Router>
      <Notifications/>
      <ScrollToTop/>
      <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<UserPrivateRoutes/>}>
              <Route path={sdk.checkoutRoute} element={<Checkout/>}/>
              <Route path={sdk.trackingPage} element={<TrackProduct/>}/>
            </Route>
            <Route path={sdk.shopRoute} element={<MainShop />} />
            <Route path={sdk.shopRoute+'/:name'} element={<MainShop />} />
            <Route path={sdk.adminLoginRoute} element={<AdminLogin/>} />
            <Route path={sdk.userLoginRoute} element={<UserLogin/>} />
            <Route path={sdk.userRegistrationRoute} element={<UserRegistration/>} />
            <Route path={sdk.emailSentRoute} element={<EmailSent/>} />
            <Route path={sdk.accountVerifiedRoute} element={<AccountVerified/>} />
            <Route path={sdk.forgotPasswordRoute} element={<ForgotPassword/>} />
            <Route path={sdk.updatePasswordRoute} element={<UpdatePassword/>} />
            <Route path={sdk.productDetailRoute+'/:name'} element={<ProductDetail/>}/>
            <Route path={sdk.cartRoute} element={<UserCart/>}/>
            <Route path={sdk.receiptRoute} element={<Receipt/>}/>
            <Route path={sdk.contactUsPage} element={<ContactUs/>}/>
            <Route path={sdk.policyPage} element={<PrivacyPolicy/>}/>
            <Route path={sdk.tosPage} element={<TermsOfService/>}/>


            <Route path={sdk.googleDashboard} element={<GoogleSignInSuccess/>}/>
            <Route element={<AdminPrivateRoutes />}>

              <Route path={sdk.shippingOptionsRoute} element={<ShippingOptions/>} />
              <Route path={sdk.adminDashboardRoute} element={<AdminDashboard/>} />
              <Route path={sdk.addProductRoute} element={<AddProduct/>} />
              <Route path={sdk.exchangeRateRoute} element={<ExchangeRate/>} />
              <Route path={sdk.manageInventoryRoute} element={<Inventory/>} />
              <Route path={sdk.singleInventoryRoute+'/:name'} element={<ProductDetail/>}/>
              <Route path={sdk.managePaymentsRoute} element={<Placeholder header='Payments' paragraph='something here later'/>} />
              <Route path={sdk.productDraftsRoute} element={<DraftInventory/>} />
              <Route path={sdk.salesRoute} element={<SalesCategory/>} />
              <Route path={sdk.manageUsersRoute} element={<UserInventory />} />
              <Route path={sdk.randomFactsRoute} element={<RandomFacts/>} />
            </Route>
             {/* 404 Route */}
             <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
    </Router>
    </ThemeProvider>
    </div>
    
    </>
  );
};

export default App;
