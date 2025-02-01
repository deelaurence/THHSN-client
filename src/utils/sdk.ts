import { AdminObject } from "../interfaces/adminInterfaces";
import { UserObject } from "../interfaces/userInterface";
import threeMogels from '../assets/images/LUX_BEAUTE_Banner-1_3024x (1).png'
import {StaticBestSellerAndArrival} from "../interfaces/bestSellerAndNewArrival";
import { IProduct } from "../interfaces/productInterface";
import { Cart } from "../interfaces/cart";
import { encryptData,decryptData } from "./crypto";
export class Sdk{

    private adminObjectKey:string='admin_object';
    private userObjectKey:string='user_object';
    adminLoginRoute:string='/admin/login'
    googleDashboard:string='/dashboard'
    userLoginRoute:string='/user/login'
    shippingOptionsRoute:string='/admin/shipping'
    userRegistrationRoute:string='/user/register'
    shopRoute:string='/shop'
    receiptRoute:string='/receipt'
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

    merchantsData=[
      {
        name:"paystack",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8Lo9v29vYAnNkAoNoAntnm8/pKsuDY7PeMyuq93vJiuuQGo9vc7fgAm9iFx+nw8PD0+v3K5vWWzuuo1u7u9/xWtuLh8fksqt16w+eu2O8+rt/I5fQbp9xtvuVTteJu0xDnAAACzUlEQVR4nO3d7W7iMBBG4Zg4UBLqEj5aoC17/3e5VKv+XDb1xGO97DlXkEdEVTyO02a7eOy2zaJ57BYI5UOoH0L9EOqHUD+E+iHUD6F+CPVDqB9C/RDqh1A/hPoh1A+hfgj1Q6gfQv0Q6odQP4T6IdQPoX4I9UOoH0L9EE5o1xdtV1u470rX7qsKh24TStcNFYWHrrjvVtvXE5b/Ab+K79WEy9ZFGLpqwmeXmxQhQoQIESJEiBChTfjm9Fwaqgkbh9XhrWhZIBqFa5fbNFkmGdY1/imWB3ZnyxWa5zRD6mLRulR3TnP7a3NYF+0y2q6Peal+CPVDqN8MwnHpUEXh7j21DqUhF2kV7pPPYD/E3IdTo/Aj+fi+avMebozCkx8wdC8VhEfHnzCEzwpCrynGnxJChAgRIkSIECHCrN5chXk7UMa1heeTd1zVEF4dti2+6y41hKPfbZr7+p51irHcFN6Y+a7Nu0fnmLVdhpVD54/c62Neqh9C/RDqN4Nw+VQ0w6bMPML+M5U9MpOC5bSFXfji8Oyd1hWFvcviouY7UZ8ewBB/VRM67cxseL8UIUKECBEiRIgQ4b2cdmY2sZqw8TkVVHFt0ZxddmZqflNhjA7E+Gq5ROsU43gqvjOTrqYrtM/a+vNQtPWT7fqYl+qHUD+E+iH8Z8trzDsFs7JtuEzOKuxTzDw0E1vTR8omZxQ+W8b6mUdEfphRuDI9eKfjXIw72YSjbWcmHmZz/L2qU4zocZsivB9ChAjnCOH9ECJEOEd1haYX1iZW9ck784zIzzKunl5tqyfjJ6AmZRQuLT+i8WPrE7NOMXZtFzY5hZhMn2GbnHkSNa5PWTtK4Wr9lwATY5qoH0L9EOqHUD+E+iHUD6F+CPVDqB9C/RDqh1A/hPoh1A+hfgj1Q6gfQv0Q6odQP4T6IdQPoX4I9UOoH0L9EOqHUL//QbhdPHbb31z+UaDpp89iAAAAAElFTkSuQmCC"
      },
      {
        name:"flutterwave",
        image:"data:image/png;base64,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"
      }
    ]

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
        
        const cart = JSON.parse(decryptData(currentCart))
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
          localStorage.setItem('cart',encryptData(JSON.stringify(updatedCart)))
          return;
        }
        cart.push(object)
        localStorage.setItem('cart',encryptData(JSON.stringify(cart)))
        return;
      }
      localStorage.setItem('cart',encryptData(JSON.stringify([object])))
    }

    modifyExistingCartArray(cart:Cart[]){
      localStorage.setItem('cart',encryptData(JSON.stringify(cart)))
    }

    setIsDollarPersisted(isDollar:string){
      localStorage.setItem('isDollar',isDollar)
    }

    getCart(){
      const currentCart = localStorage.getItem('cart')
      if(currentCart){
        return JSON.parse(decryptData(currentCart))
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