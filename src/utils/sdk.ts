import { AdminObject } from "../interfaces/adminInterfaces";
import threeMogels from '../assets/images/LUX_BEAUTE_Banner-1_3024x (1).png'

export class Sdk{

    private adminObjectKey:string='admin_object';
    adminLoginRoute:string='/admin/login'
    shopRoute:string='/shop'
    adminDashboardRoute:string='/admin/dashboard'
    addProductRoute:string='/admin/add-product'
    managePaymentsRoute:string='/admin/payments'
    productDraftsRoute:string='/admin/drafts'
    salesRoute:string='/admin/sales'
    manageUsersRoute:string='/admin/users'
    manageInventoryRoute:string='/admin/inventory'
    randomFactsRoute:string='/admin/random-facts'
    singleInventoryRoute:string='/admin/inventory'
    productDetailRoute:string='/product/details'
    theme:string|null=localStorage.getItem('theme')
    heroSectionImage=threeMogels
    navbarData = [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Dashboard",
          link: this.adminDashboardRoute,
        },
        {
          label: "Best sellers",
          link: "/about",
          imgUrl: "https://plus.unsplash.com/premium_photo-1682096515837-81ef4d728980?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lnfGVufDB8fDB8fHww",
          header: "Get in style",
          catchPhrase: "Order our best sellers",
        },
        {
          label: "Services",
          link: "/services",
          imgUrl: "https://images.unsplash.com/photo-1481044090193-9061560f70d9?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdpZ3xlbnwwfHwwfHx8MA%3D%3D",
          header: "Our Services",
          catchPhrase: "What we can do for you",
        },
        {
          label: "Contact",
          link: "/contact",
        },
        {
          label: "Blog",
          link: "/blog",
        }
      ];


    settheme(theme:string){
        localStorage.setItem('theme',theme)
    }

    getAdminObject():AdminObject|undefined{
        const adminObject:(string|null)=localStorage.getItem('admin_object');
        if(adminObject){
            return JSON.parse(adminObject);
        }
    }
    clearAdminObject(){
        localStorage.removeItem(this.adminObjectKey);
    }

    setAdminObject(object:AdminObject){
        localStorage.setItem(this.adminObjectKey,JSON.stringify(object))
    }


    setSingleProductDetail(object:any){
      localStorage.setItem('single_product',JSON.stringify(object))
    }
    getSingleProductDetail(){
      const singleProduct = localStorage.getItem('single_product')
      if(singleProduct!=='undefined'&&singleProduct!==null){
        return JSON.parse(singleProduct)
      }
    }
}
