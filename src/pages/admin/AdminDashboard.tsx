import { Sdk } from "../../utils/sdk";
import { FaBagShopping } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";
import { useSelector } from "react-redux";
import {IoMdCheckmarkCircle}  from 'react-icons/io'
import { RootState } from "../../store/store";
import { useState } from "react";
import AddProduct from "./AddProduct";
import { Link } from "react-router-dom";
import Analytics from "./Analytics";
import Payments from "./Payments";
const sdk = new Sdk();
import PageHeader from '../../components/PageHeader'
// Menu configuration array


const menuItems = [
  {
    label: 'Basic',
    route: sdk.addProductRoute,
    icon: <FaBagShopping />,
    component: <AddProduct/>
  },
  {
    label: 'Add Images',
    route: sdk.addProductRoute, // Replace with the correct route
    icon: <IoWalletOutline />,
    component: <Payments/>
  },
  {
    label: 'Wrap it up',
    route: sdk.addProductRoute, // Replace with the correct route
    icon: <SiGoogleanalytics />,
    component: <Analytics/>
  },
];

const AdminDashboard = () => {
  // const [currentMenu, setCurrentMenu] = useState<number >(0);
  const adminObject = useSelector((state: RootState) => state.admin.admin);
  const firstName = adminObject?.name.split(' ')[0];
  return (
    <section className="px-6 ">
      <PageHeader heading="Hello Betran" accent="How are you today?"/>
      <div className="flex *:flex *:gap-1 *:items-center  *:w-fit">
        {/* Map through the menu items */}
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.route}
            className={`${true? 'border-b-neutral-600 dark:border-b-neutral-300 border-b-[1px]   ':'opacity-20 dark:border-b-neutral-600 border-b-neutral-300 '} border-b flex mx-2  items-center text-sm gap-2`}
            onClick={() => console.log("")}>
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <div>
        
      </div>
      {/* {menuItems[currentMenu].component} */}
      {/* <div>{item.component}</div> */}
    </section>
  );
}

export default AdminDashboard;
