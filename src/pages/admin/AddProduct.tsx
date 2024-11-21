import { useSelector } from 'react-redux';
import { FaBagShopping } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";
import PageHeader from '../../components/PageHeader'
import { ProductStepOne } from './ProductStepOne.tsx';
import ProductStepTwo from './ProductStepTwo.tsx';
import ProductStepThree from './ProductStepThree.tsx';
import StepProgess from '../../components/StepProgess.tsx';
import { MenuItems } from '../../components/StepProgess.tsx';
import { RootState} from '../../store/store.ts';
import {Sdk} from '../../utils/sdk'
const sdk = new Sdk();


const AddProduct = () => {
  
  let addProductPage = useSelector((state:RootState)=>{
    return state.admin.addProductPage
  })
  // addProductPage=0
  return (
    <div className='min-h-screen px-6'>
        {/* todo, change the heading based on current page */}
        <PageHeader heading="Hello Betran" accent="How are you today?"/>
        <StepProgess menuItems={menuItems} currentMenu={addProductPage} />
        {menuItems[addProductPage].component}
    </div>
  );
};

export default AddProduct;



const menuItems:MenuItems[] = [
  {
    label: 'Basic',
    route: sdk.addProductRoute,
    icon: <FaBagShopping />,
    component: <ProductStepOne/>
  },
  {
    label: 'Add Images',
    route: sdk.addProductRoute, // Replace with the correct route
    icon: <IoWalletOutline />,
    component: <ProductStepTwo/>
  },
  {
    label: 'Wrap it up',
    route: sdk.addProductRoute, // Replace with the correct route
    icon: <SiGoogleanalytics />,
    component: <ProductStepThree/>
  },
];




