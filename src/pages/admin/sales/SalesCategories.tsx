import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import PageHeader from '../../../components/PageHeader';
import DashboardNav from '../../../components/DashboardNav';
import { Sdk } from '../../../utils/sdk';
import { fetchPayments } from '../../../store/adminSlice';
import { RxDragHandleDots2 } from 'react-icons/rx';
import Loader from '../../../components/Loader';
import SingleLineError from '../../../components/errors/SingleLineError';
import SalesInventory from './Sales';

const sdk = new Sdk();

const SalesCategory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, orders } = useSelector((state: RootState) => state.admin);

  // Memoize categories to prevent unnecessary recalculations
  const categories = useMemo(() => {
    return [...new Set(orders.map(order => order.deliveryStatus))];
  }, [orders]);

  useEffect(() => {
    console.log("disparching")
    dispatch(fetchPayments());
  }, [dispatch]);
//   console.log(categories); // Ensure categories update when orders change

  // Generate menu items dynamically
  const menuItems = useMemo(() => {
    return categories.map(category => ({
      label: category,
      icon: <RxDragHandleDots2 className="opacity-60 text-xs" />,
      component: <SalesInventory filter={category} />
    }));
  }, [categories]);

  return (
    <div className="container mx-auto p-6">
      <PageHeader heading="" accent="Sales" backToRoute={sdk.adminDashboardRoute} backToLabel="Dashboard" />
      <DashboardNav menuItems={menuItems} showNav={true} />
      {status === 'loading' && <div className="mt-32"><Loader /></div>}
      {status === 'failed' && <div className="mt-8"><SingleLineError errorMessage={error || "Connection Error, try again"} /></div>}
    </div>
  );
};

export default SalesCategory;
