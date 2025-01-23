import { AdminObject } from "../interfaces/adminInterfaces";
import { UserObject } from "../interfaces/userInterface";
import threeMogels from '../assets/images/LUX_BEAUTE_Banner-1_3024x (1).png'
import {StaticBestSellerAndArrival} from "../interfaces/bestSellerAndNewArrival";
import { IProduct } from "../interfaces/productInterface";
import { Cart } from "../interfaces/cart";
export class Sdk{

    private adminObjectKey:string='admin_object';
    private userObjectKey:string='user_object';
    adminLoginRoute:string='/admin/login'
    googleDashboard:string='/dashboard'
    userLoginRoute:string='/user/login'
    shippingOptionsRoute:string='/admin/shipping'
    userRegistrationRoute:string='/user/register'
    shopRoute:string='/shop'
    cartRoute:string='/cart'
    checkoutRoute:string='/checkout'
    updatePasswordRoute:string="/update/password"
    emailSentRoute:string='/email/sent'
    forgotPasswordRoute:string='/forgot/password'
    accountVerifiedRoute:string='/account/verified'
    adminDashboardRoute:string='/admin/dashboard'
    addProductRoute:string='/admin/add-product'
    managePaymentsRoute:string='/admin/payments'
    exchangeRateRoute:string='/admin/exchange-rate'
    productDraftsRoute:string='/admin/drafts'
    salesRoute:string='/admin/sales'
    manageUsersRoute:string='/admin/users'
    manageInventoryRoute:string='/admin/inventory'
    randomFactsRoute:string='/admin/random-facts'
    singleInventoryRoute:string='/admin/inventory'
    productDetailRoute:string='/product/details'
    usaFlagIcon="https://cdn-icons-png.flaticon.com/128/197/197484.png"
    nigeriaFlagIcon="https://cdn-icons-png.flaticon.com/128/11849/11849096.png"
    theme:string|null=localStorage.getItem('theme')
    persistedIsDollar=localStorage.getItem('isDollar')
    heroSectionImage=threeMogels
    navbarData = [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Dashboard",
          superUser:true,
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
        },
        {
          label: `Login`,
          link: "/user/login",
        }
    ];
    placeholderImage:string="https://placehold.co/800@3x.png"

    bestSellersAndNewArrivalsCoverImages:string[]=[
      "https://res.cloudinary.com/dy5xob0gn/image/upload/v1735384866/THHSN/static/ufyzdmh0u2ydsxqlzgya.png",
      "https://res.cloudinary.com/dy5xob0gn/image/upload/v1735384865/THHSN/static/skq9myj1znmimatf8qc0.webp",
      "https://res.cloudinary.com/dy5xob0gn/image/upload/v1735384866/THHSN/static/aicwt29igtixagqwvtxx.png",
      "https://res.cloudinary.com/dy5xob0gn/image/upload/v1735384865/THHSN/static/ijmfxbl9bkvt87djynda.png",
      "https://res.cloudinary.com/dy5xob0gn/image/upload/v1735384865/THHSN/static/qgg4x3yr0hpqozqpzhzn.webp",
      "https://res.cloudinary.com/dy5xob0gn/image/upload/v1735384865/THHSN/static/haybucxj8xk96fj27rjk.webp",
      "https://res.cloudinary.com/dy5xob0gn/image/upload/v1735384865/THHSN/static/pb3obrhrmwepekytoaze.png",
      "https://res.cloudinary.com/dy5xob0gn/image/upload/v1735384865/THHSN/static/kepa9oulu87j7y9t1ksl.webp",
      "https://res.cloudinary.com/dy5xob0gn/image/upload/v1735384864/THHSN/static/isla786mebsuindakzv9.webp",
      "https://res.cloudinary.com/dy5xob0gn/image/upload/v1735384864/THHSN/static/jyjtdqrfyqu93ltdcgyg.webp",
      "https://res.cloudinary.com/dy5xob0gn/image/upload/v1735384864/THHSN/static/bxhtzfmovv1wq6wzjrps.webp"
    ]
    
    productCategories=[
      { 
        label: 'Hair Products', 
        value: 'Hair Products',
        coverImage:this.bestSellersAndNewArrivalsCoverImages[6] 
      },
      { 
        label: 'Lace fronts', 
        value: 'Lace Fronts',
        coverImage:this.bestSellersAndNewArrivalsCoverImages[3] 
      },
      { label: 'Hair tools', 
        value: 'Hair Tools',
        coverImage:this.bestSellersAndNewArrivalsCoverImages[2]
      },
      { label: 'Wigs', 
        value: 'Wigs',
        coverImage:this.bestSellersAndNewArrivalsCoverImages[10]},
      { label: 'Bundles', 
        value: 'Bundles',
        coverImage:this.bestSellersAndNewArrivalsCoverImages[1]
      },
    ]

    formatNairaPrice(price:number):string{
      return new Intl.NumberFormat('en-NG', { minimumFractionDigits: 0 }).format(price)
    }

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



    getUserObject(){
        const userObject:(string|null)=localStorage.getItem('user_object');
        if(userObject){
            return JSON.parse(userObject);
        }
    }
    clearUserObject(){
        localStorage.removeItem(this.userObjectKey);
    }

    setUserObject(object:UserObject){
        localStorage.setItem(this.userObjectKey,JSON.stringify(object))
    }

    mergeProductInDatabaseWithStaticImages(
      staticData:StaticBestSellerAndArrival[],
      dataInDatabase:IProduct[],
      returnPreset:boolean
    ){
        
      if(returnPreset){
        return staticData
      }
      return staticData.slice(0,dataInDatabase.length)
        .map((item,index)=>{
            return{
                ...item,
                image:dataInDatabase[index].coverImage??item.image,
                price:dataInDatabase[index]
                .variations[0]
                .variations[0]
                .price,
                text:dataInDatabase[index].name
            }
        })  
    }


    setSingleProductDetail(object:any){
      // console.log(object)
      // if(object.coverImage){
      //   object.images.unshift(object.coverImage)
      // }
      localStorage.setItem('single_product',JSON.stringify(object))
    }


    setCart(object:Cart){
      const currentCart = localStorage.getItem('cart')
      if(currentCart){
        
        const cart = JSON.parse(currentCart)
        const productExists=cart.some((product:Cart) =>{
          return product.product._id===object.product._id&&product.variant.name===object.variant.name
        })
        
        if(productExists){
          const updatedCart = cart.map((product:Cart)=>{
            if(product.product._id===object.product._id&&product.variant.name===object.variant.name){
              return{
                ...product,
                quantity:product.quantity+object.quantity
              }
            }
            return product
          })
          localStorage.setItem('cart',JSON.stringify(updatedCart))
          return;
        }
        cart.push(object)
        localStorage.setItem('cart',JSON.stringify(cart))
        return;
      }
      localStorage.setItem('cart',JSON.stringify([object]))
    }

    modifyExistingCartArray(cart:Cart[]){
      localStorage.setItem('cart',JSON.stringify(cart))
    }

    setIsDollarPersisted(isDollar:string){
      localStorage.setItem('isDollar',isDollar)
    }

    getCart(){
      const currentCart = localStorage.getItem('cart')
      if(currentCart){
        return JSON.parse(currentCart)
      }
      return []
    }

    getSingleProductDetail(){
      const singleProduct = localStorage.getItem('single_product')
      if(singleProduct!=='undefined'&&singleProduct!==null){
        return JSON.parse(singleProduct)
      }
    }

    
}


export const sdk = new Sdk();