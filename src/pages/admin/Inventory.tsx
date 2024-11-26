import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/fetchProductSlice'; // Assume you have a slice for fetching products
import { RootState,AppDispatch } from '../../store/store';
import PageHeader from '../../components/PageHeader';
import DashboardNav from '../../components/DashboardNav';
import { Sdk } from '../../utils/sdk';
const sdk=new Sdk()
import InventoryUnit from '../../components/InventoryUnit';
import SingleLineError from '../../components/errors/SingleLineError';
import { RxDragHandleDots2 } from 'react-icons/rx';


const Inventory: React.FC = () => {
  const dispatch:AppDispatch = useDispatch();
  const {  categories, error } = useSelector((state: RootState) => state.product); // Update this line based on your state structure
  
  //Use categories coming from reducer state [Straight from the api]
  const menuItems = categories.map((category)=>{
    return {
        label:category,
        icon:<RxDragHandleDots2 className='opacity-60 text-xs' />,
        component:<InventoryUnit filterProp={category}/>
    }
  })

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <PageHeader heading="" accent="Manage Inventory" backToRoute={sdk.adminDashboardRoute} backToLabel='Dashboard'/>
      <DashboardNav menuItems={menuItems} />
      {error&&<SingleLineError errorMessage={error}/>}
    </div>
  );
};

export default Inventory;
