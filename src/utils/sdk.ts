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
    userDashboard:string='/user/dashboard'
    shippingOptionsRoute:string='/admin/shipping'
    userRegistrationRoute:string='/user/register'
    shopRoute:string='/shop'
    contactUsPage:string='/contact'
    trackingPage:string='/tracking'
    policyPage:string='/policy'
    tosPage:string='/tos'
    authScreenPicture:string='https://images.unsplash.com/photo-1724362180927-3e61a44bf175?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTYwfHx3aWdzfGVufDB8fDB8fHww'
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
    betranImage="data:image/jpeg;base64,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"
    phoneNumber = "2347068051696"; // WhatsApp number in international format (without +)
    message = encodeURIComponent("Hello, I am chatting from your website.");

    whatsappLink=`https://wa.me/${this.phoneNumber}?text=${this.message}`;
    
    contactLinks = [
      { category: "About Us", items: [
        { name: "Privacy policy", url: this.policyPage },
        { name: "Contact", url: this.contactUsPage }
      ] },
      { category: "Support", items: [
        { name: "Terms Of Service", url: this.tosPage },
        ] },
      { category: "Social Media", items: [
          { name: "Tiktok", url: "https://www.tiktok.com/@thehumanhairshop.ng?_t=ZM-8sFxXXeiRWP&_r=1" },
          { name: "Instagram", url: "https://www.instagram.com/thehumanhairshopng?igsh=MXVwcW81NDFpYjNubw==" },
          { name: "Whatsapp", url:this.whatsappLink }
        ] },
    ];
    
    
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
          label: "See all categories",
          link: "/shop",
          imgUrl: "https://plus.unsplash.com/premium_photo-1682096515837-81ef4d728980?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lnfGVufDB8fDB8fHww",
          header: "Get in style",
          catchPhrase: "Order our best sellers",
        },
        {
          label: "Wigs",
          link: "/shop/Wigs",
          imgUrl: "https://images.unsplash.com/photo-1481044090193-9061560f70d9?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdpZ3xlbnwwfHwwfHx8MA%3D%3D",
          header: "Checkout our wigs",
          catchPhrase: "Select from our wigs varieties",
        },
        {
          label: "Contact",
          link: "/contact",
        },
        {
          label: "Your Orders",
          link: "/tracking",
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
      // {
      //   name:"flutterwave",
      //   image:"data:image/png;base64,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"
      // }
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
            return JSON.parse(decryptData(adminObject));
        }
    }
    clearAdminObject(){
        localStorage.removeItem(this.adminObjectKey);
    }

    setAdminObject(object:AdminObject){
        localStorage.setItem(this.adminObjectKey,encryptData(JSON.stringify(object)))
    }



    getUserObject(){
        const userObject:(string|null)=localStorage.getItem('user_object');
        if(userObject){
            return JSON.parse(decryptData(userObject));
        }
    }
    clearUserObject(){
        localStorage.removeItem(this.userObjectKey);
    }

    setUserObject(object:UserObject){
        localStorage.setItem(this.userObjectKey,encryptData(JSON.stringify(object)))
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
                outOfStock:dataInDatabase[index].outOfStock,
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
      // //console.log(object)
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

    clearCart(){
      localStorage.removeItem('cart')
    }

    getSingleProductDetail(){
      const singleProduct = localStorage.getItem('single_product')
      if(singleProduct!=='undefined'&&singleProduct!==null){
        return JSON.parse(singleProduct)
      }
    }

    
}


export const sdk = new Sdk();