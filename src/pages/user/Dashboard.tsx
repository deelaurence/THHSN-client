import { Sdk } from "../../utils/sdk";
import { AppDispatch, RootState } from "../../store/store";
import { FaBagShopping, FaPowerOff } from "react-icons/fa6";
import DashboardNav from "../../components/DashboardNav";
const sdk = new Sdk();
import { signOutUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import PageHeader from "../../components/PageHeader";
import BestSellersAndNewArrivals from "../../components/LandingPage/_BestSellersAndNewArrivals";
import { fetchExchangeRate, fetchProductsPublic } from "../../store/fetchProductSlice";
import { RxDragHandleDots2 } from "react-icons/rx";

const menuItems = [
  {
    label: 'Overview',
    icon: <RxDragHandleDots2 />,
},
{
    label: 'Cart',
    route: sdk.cartRoute, 
    icon: <FaBagShopping />,
  },
  {
    label: 'order tracking',
    route: sdk.trackingPage, 
    icon: <LiaShippingFastSolid/>,
  }
];

// const calculateTotalRevenue = (orders: Order[]): number => {
//   return orders.reduce((total, order) => total + order.amount, 0);
// };

const landingImages = sdk.bestSellersAndNewArrivalsCoverImages

let store=[
    {
        text:"Curly wavy hair extension",
        image:landingImages[0],
        secondaryImage:landingImages[1],
        price:200,
        path:"/"

    },
    {
        text:"hair extension Wavy",
        image:landingImages[2],
        secondaryImage:landingImages[0],
        price:200,
        path:"/"
    },
    {
        text:"Straight hair extension",
        image:landingImages[2],
        secondaryImage:landingImages[0],
        price:200,
        path:"/"
    },
    {
        text:"Lace Frontal",
        image:landingImages[2],
        secondaryImage:landingImages[4],
        price:200,
        path:"/"
    },
    {
        text:"Bundles",
        image:landingImages[1],
        secondaryImage:landingImages[5],
        price:200,
        path:"/"
    }
]



const UserDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state:RootState)=>{
    return state.user
  })
  useEffect(()=>{
          dispatch(fetchProductsPublic())
          dispatch(fetchExchangeRate())
          
      },[])
      const {productsPublic,statusPublic} = useSelector((state:RootState)=>{
          return state.product
      })
  
      const bestsellersInDatabase=productsPublic
      .filter((product => product.bestSeller||product.newArrival))

  return (
    <section className="px-6 sm:px-16 relative">
      <div 
      onClick={() => {
        dispatch(signOutUser());
      }}
      className=" z-10 shadow bg-red-500 dark:bg-neutral-700 fixed   px-4 py-1 flex items-center gap-2 text-xs text-secondary top-16 opacity-70 right-0 mr-4 cursor-pointer">
        <FaPowerOff />
        <p >Logout</p>
      </div>
      
      <PageHeader heading={`Hello ${user.user?.firstName||user.user?.lastName||user.user?.name}`} accent="Track your orders, check your cart"/>
      <DashboardNav showNav={true} menuItems={menuItems}/>
      <BestSellersAndNewArrivals
        dataReady={statusPublic==="succeeded"} 
        title='You may like these' 
        subtitle='Check out our best selling products and new arrivals' 
        store={sdk.mergeProductInDatabaseWithStaticImages(store,bestsellersInDatabase,statusPublic!=="succeeded")}/>
    </section>
  );
}

export default UserDashboard;
