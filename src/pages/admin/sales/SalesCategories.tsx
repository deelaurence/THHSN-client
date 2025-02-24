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
  let categories = useMemo(() => {
    const categoryCount = orders.reduce((acc, order) => {
      acc[order.deliveryStatus] = (acc[order.deliveryStatus] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categoryCount).map(([category, count]) => `${category}(${count})`);
  }, [orders]);

  const orderPattern = ["pending", "dispatched", "shipped", "ready"];

  function sortStatuses(statuses: string[]) {
    return statuses.sort((a, b) => {
      const statusA = a.split('(')[0];
      const statusB = b.split('(')[0];
      return orderPattern.indexOf(statusA) - orderPattern.indexOf(statusB);
    });
  }

  categories = sortStatuses(categories);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  // Generate menu items dynamically
  const menuItems = useMemo(() => {
    return categories.map(category => ({
      label: category,
      icon: <RxDragHandleDots2 className="opacity-60 text-xs" />,
      component: <SalesInventory filter={category.split('(')[0]} />
    }));
  }, [categories]);


  return (
    <div className="container mx-auto p-6 tablet:px-24 md:px-72">
      <PageHeader heading="" accent="Sales" backToRoute={sdk.adminDashboardRoute} backToLabel="Dashboard" />
      <DashboardNav menuItems={menuItems} showNav={true} />
      {status === 'loading' && <div className="mt-32"><Loader /></div>}
      {status === 'failed' && <div className="mt-8"><SingleLineError errorMessage={error || "Connection Error, try again"} /></div>}
    </div>
  );
};

export default SalesCategory;
