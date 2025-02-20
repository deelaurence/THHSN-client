import { useSelector } from 'react-redux';
import { FaBagShopping } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";
import PageHeader from '../../components/PageHeader'
import { ProductStepOne } from './ProductStepOne.tsx';
import ProductStepTwo from './ProductStepTwo.tsx';
import ProductStepThree from './ProductStepThree.tsx';
import {StepProgessTypeOne,StepProgessTypeTwo} from '../../components/StepProgess.tsx';
import { MenuItems } from '../../components/StepProgess.tsx';
import { RootState} from '../../store/store.ts';
import {Sdk} from '../../utils/sdk'
const sdk = new Sdk();


const AddProduct = () => {
  let addProductPage = useSelector((state:RootState)=>{
    return state.admin.addProductPage
  })
  let editingProduct = useSelector((state:RootState)=>{
    return state.admin.editingProduct
  })

  
  
  let stepProgressType=2
  // addProductPage=2
  return (
    <div className='min-h-screen px-6 mt-16 tablet:mx-44 md:mx-72'>
        {/* todo, change the heading based on current page */}
        <PageHeader heading={editingProduct?"Revamp your store,":"Grow your inventory,"} accent={editingProduct?"Sell More Tomorrow!":"Grow your brand"}/>
        {stepProgressType===1?<StepProgessTypeOne menuItems={menuItems} currentMenu={addProductPage} />:<StepProgessTypeTwo menuItems={menuItems} currentMenu={addProductPage}/>}
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




