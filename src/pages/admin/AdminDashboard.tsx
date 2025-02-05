import { Sdk } from "../../utils/sdk";
import { AppDispatch } from "../../store/store";
import { FaBagShopping, FaPowerOff } from "react-icons/fa6";
import BarChart from "../../components/BarChart";
import { PiPenDuotone } from "react-icons/pi";
import DashboardNav from "../../components/DashboardNav";
const sdk = new Sdk();
import PageHeader from '../../components/PageHeader'
import { GrAnalytics } from "react-icons/gr";
// Menu configuration array
import PieChart from "../../components/PieChart";
import { BsGraphUpArrow } from "react-icons/bs";
import { TbArrowsExchange2 } from "react-icons/tb"
import { LuUsers2 } from "react-icons/lu";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { signOutAdmin } from "../../store/adminSlice";
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
  const dispatch = useDispatch<AppDispatch>()
  
  // const [currentMenu, setCurrentMenu] = useState<number >(0);
  // const adminObject = useSelector((state: RootState) => state.admin.admin);
  // const firstName = adminObject?.name.split(' ')[0];
  return (
    <section className="px-6 relative">
      <div 
      onClick={() => {
        dispatch(signOutAdmin());
      }}
      className=" z-10 shadow bg-red-500 dark:bg-neutral-700 fixed   px-4 py-1 flex items-center gap-2 text-xs text-secondary top-16 opacity-70 right-0 mr-4 cursor-pointer">
        <FaPowerOff />
        <p >Logout</p>
      </div>
      <PageHeader heading="Hello Betran" accent="How are you today?"/>
      <DashboardNav showNav={true} menuItems={menuItems}/>
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
