import { Sdk } from "../../utils/sdk";
import { AppDispatch } from "../../store/store";
import { FaBagShopping, FaPowerOff } from "react-icons/fa6";
import BarChart from "../../components/BarChart";
import { PiPenDuotone } from "react-icons/pi";
import DashboardNav from "../../components/DashboardNav";
const sdk = new Sdk();

import { subMonths, format } from "date-fns";
import PageHeader from '../../components/PageHeader'
import { GrAnalytics } from "react-icons/gr";
// Menu configuration array
import PieChart from "../../components/PieChart";
import { BsGraphUpArrow } from "react-icons/bs";
import { TbArrowsExchange2 } from "react-icons/tb"
import { LuUsers2 } from "react-icons/lu";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments, signOutAdmin } from "../../store/adminSlice";
import { useEffect, useState } from "react";
import { Order } from "../../interfaces/order";
import { RootState } from "../../store/store";
import PriceToast from "../../components/PriceToast";
import { fetchExchangeRate } from "../../store/fetchProductSlice";
import { FaShippingFast } from "react-icons/fa";
const data = [
  { color: '#FF6384', percentage: 80,label:"Hair Products" }, // 40% - Red
  { color: '#36A2EB', percentage: 10 ,label:"Wig Bundles" }, // 30% - Blue
  { color: '#FFCE56', percentage: 2.5,label:"Accessories" }, // 20% - Yellow
  { color: '#4BC0C0', percentage: 7.5 ,label:"Frontals" }, // 10% - Teal
];

const menuItems = [
  {
    label: 'overview',
    route: sdk.adminDashboardRoute,
    icon: <GrAnalytics />,
  },
  {
    label: 'Add Products',
    route: sdk.addProductRoute,
    icon: <FaBagShopping />,
  },
  // {
  //   label: 'Payments',
  //   route: sdk.managePaymentsRoute, 
  //   icon: <IoWalletOutline />,
  // },
  {
    label: 'Drafts',
    route: sdk.productDraftsRoute, 
    icon: <PiPenDuotone />,
  },
  {
    label: 'Orders/Sales',
    route: sdk.salesRoute, 
    icon: <BsGraphUpArrow />,
  },
  {
    label: 'Users',
    route: sdk.manageUsersRoute, 
    icon: <LuUsers2 />,
  },
  {
    label: 'Manage Inventory',
    route: sdk.manageInventoryRoute, 
    icon: <GrAnalytics />,
  },
  {
    label: 'Shipping',
    route: sdk.shippingOptionsRoute, 
    icon: <LiaShippingFastSolid/>,
  },
  {
    label: 'Exchange Rate',
    route: sdk.exchangeRateRoute, 
    icon: <TbArrowsExchange2 />,
  },
  {
    label: 'Random Facts',
    route: sdk.randomFactsRoute, 
    icon: <HiOutlineLightBulb />,
  },
];

// const calculateTotalRevenue = (orders: Order[]): number => {
//   return orders.reduce((total, order) => total + order.amount, 0);
// };




const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [showMoreCustomers, setShowMoreCustomers] = useState(false);
  const [showMoreAllCustomers, setShowMoreAllCustomers] = useState(false);
  const [showMoreCountries, setShowMoreCountries] = useState(false);
 
  const orders = useSelector((state: RootState) => state.admin.orders);

  useEffect(() => {
    dispatch(fetchPayments())
    dispatch(fetchExchangeRate())
  }, []);


  const calculateTotalRevenue = (orders: Order[]): number => {
    return orders.reduce((total, order) => total + Number(order.description.cartTotal), 0);
  };

  interface CustomerStats {
    name: string;
    totalSpent: number;
    ordersCount: number;
  }
  
  const getCustomerStats = (orders: Order[]): CustomerStats[] => {
    const customerMap = new Map<string, CustomerStats>();
  
    orders.forEach(order => {
      const key = order.owner; // Unique identifier for a customer
      if (!customerMap.has(key)) {
        customerMap.set(key, {
          name: order.name,
          totalSpent: 0,
          ordersCount: 0,
        });
      }
  
      const customer = customerMap.get(key)!;
      customer.totalSpent += order.amount;
      customer.ordersCount += 1;
    });
  
    return Array.from(customerMap.values());
  };
  

  const getTopCustomers = (orders: Order[], topN: number = 5): CustomerStats[] => {
    const customerStats = getCustomerStats(orders);
    return customerStats.sort((a, b) => b.totalSpent - a.totalSpent).slice(0, topN);
  };
  

  const getTotalCustomers = (orders: Order[]): number => {
    const uniqueCustomers = new Set(orders.map(order => order.owner));
    return uniqueCustomers.size;
  };
  

  interface CountrySales {
    country: string;
    totalSales: number;
  }
  
  const getSalesPerCountry = (orders: Order[]): CountrySales[] => {
    const countryMap = new Map<string, number>();

    orders.forEach(order => {
      const country = order.description.country || "Unknown";
      countryMap.set(country, (countryMap.get(country) || 0) + order.amount);
    });

    return Array.from(countryMap.entries())
      .map(([country, totalSales]) => ({
        country,
        totalSales,
      }))
      .sort((a, b) => b.totalSales - a.totalSales); // Sort from highest to lowest
  };
  

const generateSalesData = (orders: Order[]): { label: string; value: number; color: string }[] => {
  const colors = ["#e74c3c", "#3498db", "#9b59b6", "#2ecc71", "#f1c40f", "#e67e22", "#34495e"];
  
  // Create last 12 months labels
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return format(date, "MMM"); // "Jan", "Feb", etc.
  }).reverse(); // Keep in ascending order

  // Initialize sales per month
  const salesMap = new Map<string, number>(last12Months.map(month => [month, 0]));

  // Aggregate sales per month
  orders.forEach(order => {
    const month = format(new Date(order.date), "MMM");
    if (salesMap.has(month)) {
      salesMap.set(month, (salesMap.get(month) || 0) + order.amount);
    }
  });

  // Generate final dataset with colors
  return last12Months.map((month, index) => ({
    label: month,
    value: salesMap.get(month) || 0,
    color: colors[index % colors.length], // Rotate colors
  }));
};

  
let salesData = [
  { label: 'Jan', value: 1200, color: '#e74c3c' },
  { label: 'Feb', value: 300, color: '#3498db' },
  { label: 'Mar', value: 0, color: '#9b59b6' },
  { label: 'Apr', value: 1800 },
  { label: 'May', value: 2000, color: '#2ecc71' },
  { label: 'Jun', value: 1400 },
  { label: 'Jul', value: 2300 },
  { label: 'Aug', value: 1700, color: '#f1c40f' },
  { label: 'Sep', value: 1900 },
  { label: 'Oct', value: 2200, color: '#e67e22' },
  { label: 'Nov', value: 2100 },
  { label: 'Dec', value: 2400, color: '#34495e' },
];

salesData = generateSalesData(orders);
  // //console.log(getSalesPerCountry(orders)) 
  // //console.log(getCustomerStats(orders)) 
  // //console.log(getTopCustomers(orders)) 
  // //console.log(getTotalCustomers(orders)) 
  
  
  // const [currentMenu, setCurrentMenu] = useState<number >(0);
  // const adminObject = useSelector((state: RootState) => state.admin.admin);
  // const firstName = adminObject?.name.split(' ')[0];
  return (
    <section className="px-6 sm:px-16 relative">
      <div 
      onClick={() => {
        dispatch(signOutAdmin());
      }}
      className=" z-10 shadow bg-red-500 dark:bg-neutral-700 fixed   px-4 py-1 flex items-center gap-2 text-xs text-secondary top-16 opacity-70 right-0 sm:right-12 mr-4 cursor-pointer">
        <FaPowerOff />
        <p >Logout</p>
      </div>


      
      
      <PageHeader heading="Hello Betran" accent="How are you today?"/>
      
      <div className="my-12  flex items-center gap-4 flex-wrap text-neutral-300 dark:text-neutral-600">
        <div className="dark:bg-primary-light bg-gray-200 border-b-2 dark:border-b-neutral-700 p-2 ">
          <p className="text-xs   text-neutral-500 flex gap-2 items-center ">Total Revenue  <GrAnalytics className="text-yellow-700"/> </p>
          <PriceToast className="text-3xl sm:text-7xl font-medium text-neutral-700 dark:text-neutral-200" price={calculateTotalRevenue(orders)}/>  
        </div>
        <div className=" dark:bg-primary-light  bg-gray-200 border-b-2 dark:border-b-neutral-700 p-2 ">
          <p className="text-xs text-neutral-500 flex gap-2 items-center">Customers <LuUsers2 className="text-green-700"/> </p>
          <p className="text-3xl  text-neutral-700 sm:text-7xl dark:text-neutral-200 font-adelia">{getTotalCustomers(orders)}</p>
        </div>
      </div>

      <section className="sm:flex sm:my-12 tablet:flex gap-10">
          <div className="my-12 sm:my-0 tablet:my-0">
            
            <div className="flex mb-4 relative justify-between items-center">
              <h2 className="text-xs  text-neutral-500 flex items-center gap-2">Top Customers <LuUsers2/> </h2>
              {getTopCustomers(orders).length > 1 && (
                <button className="text-orange-400 text-xs" onClick={() => setShowMoreCustomers(!showMoreCustomers)}>{showMoreCustomers?"Hide Details":"Show more"}</button>
              )}
              {/* {!showMoreCustomers&&<p className="absolute z-10 top-12 bg-gradient-to-b from-transparent dark:via-transparent dark:to-primary  via-transparent to-secondary w-full h-14"></p>} */}
            </div>
            {getTopCustomers(orders).slice(0, 1).map((customer, index) => {
              return (
            <div key={index} className="flex text-neutral-400 gap-7 mb-1 p-1 justify-between dark:border-neutral-800 border-b-neutral-200 border-b items-center">
              <p>{customer.name}</p>
              <div className="flex "><PriceToast price={customer.totalSpent}/>({customer.ordersCount})</div>
            </div>
              );
            })}
            
            {showMoreCustomers && getTopCustomers(orders).slice(2,10).map((customer, index) => {
              return (
            <div key={index} className="flex text-neutral-400 gap-7 mb-1 p-1 justify-between dark:border-neutral-800 border-b-neutral-200 border-b items-center">
              <p>{customer.name}</p>
              <div className="flex "><PriceToast price={customer.totalSpent}/>({customer.ordersCount})</div>
            </div>
              );
            })}
          </div>



          <div className="my-12 sm:my-0 tablet:my-0">
            
            <div className="flex mb-4 relative justify-between items-center">
              <h2 className="text-xs  text-neutral-500 flex gap-2 items-center">All Customers <LuUsers2/></h2>
              {getTopCustomers(orders).length > 1 && (
                <button className="text-green-400 text-xs" onClick={() => setShowMoreAllCustomers(!showMoreAllCustomers)}>{showMoreAllCustomers?"Hide Details":"Show more"}</button>
              )}
              {/* {!showMoreCustomers&&<p className="absolute z-10 top-12 bg-gradient-to-b from-transparent dark:via-transparent dark:to-primary  via-transparent to-secondary w-full h-14"></p>} */}
            </div>
            {getTopCustomers(orders).slice(0, 1).map((customer, index) => {
              return (
            <div key={index} className="flex text-neutral-400 gap-7 mb-1 p-1 justify-between dark:border-neutral-800 border-b-neutral-200 border-b items-center">
              <p>{customer.name}</p>
              <div className="flex "><PriceToast price={customer.totalSpent}/>({customer.ordersCount})</div>
            </div>
              );
            })}
            
            {showMoreAllCustomers && getTopCustomers(orders).map((customer, index) => {
              return (
            <div key={index} className="flex text-neutral-400 gap-7 mb-1 p-1 justify-between dark:border-neutral-800 border-b-neutral-200 border-b items-center">
              <p>{customer.name}</p>
              <div className="flex "><PriceToast price={customer.totalSpent}/>({customer.ordersCount})</div>
            </div>
              );
            })}
          </div>


          <div className="mb-12">
            <div className="flex mb-4 relative justify-between items-center">
              <p className="text-xs text-neutral-500 items-center flex gap-2">Sales By Country <FaShippingFast/> </p>
              {getSalesPerCountry(orders).length > 1 && (
                <button className="text-purple-500 text-xs" onClick={() => setShowMoreCountries(!showMoreCountries)}>{showMoreCountries?"Hide details":"Show more"}</button>
              )}
              {/* {!showMoreCountries&&<p className="absolute z-10 top-12 bg-gradient-to-b from-transparent dark:via-transparent dark:to-primary  via-transparent to-secondary w-full h-14"></p>} */}
            </div>
            {getSalesPerCountry(orders).slice(0, 1).map((country, index) => {
              return (
                <div key={index} className="flex relative text-neutral-400 gap-7 mb-1 p-1 justify-between border-b dark:border-neutral-800 border-b-neutral-200 items-center">
                  <p>{country.country}</p>
                  <div className="flex "><PriceToast price={country.totalSales}/></div>
                </div>
              );
            })}
            
            {showMoreCountries && getSalesPerCountry(orders).slice(2).map((country, index) => {
              return (
                <div key={index} className="flex text-neutral-400 gap-7 mb-1 p-1 justify-between border-b dark:border-neutral-800 border-b-neutral-200 items-center">
                  <p>{country.country}</p>
                  <div className="flex "><PriceToast price={country.totalSales}/></div>
                </div>
              );
            })}
          </div>
      </section>
      
      <DashboardNav showNav={true} menuItems={menuItems}/>
      
      
      

     <section className="sm:flex my-44 sm:flex-col  items-start">
        <div className="flex justify-center items-center ">
        <BarChart
          data={salesData}
          chartTitle="Monthly Sales"
          // height={400} // Optional: customize height
          // width={800} // Optional: customize width
          barColor="#2980b9" // Optional: customize default bar color
        />
      </div>

      <div className="hidden">
        <div className="flex  mt-16 ">
          <PieChart 
          chartTitle="Sales By Category"
          segments={data}
          strokeWidth={3} 
          gapSize={4}  
          size={250} />
        </div>
        <div className="flex  mt-16 ">
          <PieChart 
          chartTitle="Inventory Worth"
          segments={data}
          strokeWidth={3} 
          gapSize={4}  
          size={250} />
        </div>
      </div>
      </section>

      
    </section>
  );
}

export default AdminDashboard;
