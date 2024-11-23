import { Sdk } from "../../utils/sdk";
import { FaBagShopping } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";
import { useSelector } from "react-redux";
import {IoMdCheckmarkCircle}  from 'react-icons/io'
import { RootState } from "../../store/store";
import { useState } from "react";
import AddProduct from "./AddProduct";
import BarChart from "../../components/BarChart";
import { Link } from "react-router-dom";
import Analytics from "./Analytics";
import Payments from "./Payments";
import { PiPenDuotone } from "react-icons/pi";
const sdk = new Sdk();
import PageHeader from '../../components/PageHeader'
import { GrAnalytics } from "react-icons/gr";
// Menu configuration array
import PieChart from "../../components/PieChart";
import { BsGraphUpArrow } from "react-icons/bs";
import { LuUsers2 } from "react-icons/lu";
const data = [
  { color: '#FF6384', percentage: 80,label:"Hair Products" }, // 40% - Red
  { color: '#36A2EB', percentage: 10 ,label:"Wig Bundles" }, // 30% - Blue
  { color: '#FFCE56', percentage: 2.5,label:"Accessories" }, // 20% - Yellow
  { color: '#4BC0C0', percentage: 7.5 ,label:"Frontals" }, // 10% - Teal
];

const menuItems = [
  {
    label: 'Add Products',
    route: sdk.addProductRoute,
    icon: <FaBagShopping />,
    component: <AddProduct/>
  },
  {
    label: 'Payments',
    route: sdk.managePaymentsRoute, // Replace with the correct route
    icon: <IoWalletOutline />,
    component: <Payments/>
  },
  {
    label: 'Drafts',
    route: sdk.productDraftsRoute, // Replace with the correct route
    icon: <PiPenDuotone />,
    component: <Payments/>
  },
  {
    label: 'Sales',
    route: sdk.salesRoute, // Replace with the correct route
    icon: <BsGraphUpArrow />,
    component: <Payments/>
  },
  {
    label: 'Users',
    route: sdk.manageUsersRoute, // Replace with the correct route
    icon: <LuUsers2 />,
    component: <Payments/>
  },
  {
    label: 'Wrap',
    route: sdk.addProductRoute, // Replace with the correct route
    icon: <GrAnalytics />,
    component: <Analytics/>
  },
];



const salesData = [
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
const AdminDashboard = () => {
  // const [currentMenu, setCurrentMenu] = useState<number >(0);
  const adminObject = useSelector((state: RootState) => state.admin.admin);
  const firstName = adminObject?.name.split(' ')[0];
  return (
    <section className="px-6 ">
      <PageHeader heading="Hello Betran" accent="How are you today?"/>
      <div className="flex gap-4 flex-wrap *:flex *:gap-1 *:items-center  *:w-fit">
        {/* Map through the menu items */}
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.route}

            className={` dark:bg-primary-light bg-neutral-200 p-3 dark:border-b-neutral-400  border-b flex   items-center text-sm gap-2`}
            onClick={() => console.log("")}>
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
      <div>
        
      </div>
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

      <div className="flex justify-center items-center min-h-screen">
      <BarChart
        data={salesData}
        chartTitle="Monthly Sales"
        // height={400} // Optional: customize height
        // width={800} // Optional: customize width
        barColor="#2980b9" // Optional: customize default bar color
      />
    </div>
    </section>
  );
}

export default AdminDashboard;
