import { useEffect, useState } from "react";
import { Sdk } from "../../utils/sdk";
import { Cart } from "../../interfaces/cart";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import Button from "../../components/Button";
const sdk = new Sdk();
import { useTheme } from "../../contexts/AppContext";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import PriceToast from "../../components/PriceToast";
const userCart = () => {
    const {cartItems,updateCartcount,setCartTotal}=useTheme()
    const [cart, setCart] = useState<Cart[]>(sdk.getCart());

    const increaseQuantity = (id: string, variantName: string) => {
        setCart(cart.map(item => 
            item.product._id === id && item.variant.name === variantName 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
        ));
        sdk.modifyExistingCartArray(cart)
    };

    const decreaseQuantity = (id: string, variantName: string) => {
        setCart(cart.map(item => 
            item.product._id === id && item.variant.name === variantName && item.quantity > 1 
                ? { ...item, quantity: item.quantity - 1 } 
                : item
        ));
    };
    
    const removeProduct = (id: string, variantName: string) => {
        setCart(cart.filter(item => !(item.product._id === id && item.variant.name === variantName)));
    };

    useEffect(() => {
        sdk.modifyExistingCartArray(cart);  
        updateCartcount()
    }, [cart]); 

    const getTotal = () => {
        const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        setCartTotal(total)
        return total
    };

    return (
        <div className="px-6 tablet:px-16">
            {cartItems>0&&<h1 className="uppercase mt-16 mb-10 font-queens text-4xl">Your Cart</h1>}
            
            {cartItems>0?<section>
                <div className=" flex flex-col gap-12">
                    {cart.map(item => (
                        
                        <div className="pb-4 flex gap-4 border-b border-b-neutral-300 dark:border-b-neutral-600" key={`${item.product._id}-${item.variant.name}`}>
                            <Link
                              to={`${sdk.productDetailRoute}/${item.product.name}`}> 
                                    <div className="w-32 h-44 flex-shrink-0 overflow-hidden">
                                        <img className="object-cover w-full h-full" src={item.product.coverImage ?? item.product.images[0]} alt={item.product.name} />
                                    </div>
                            </Link>
                            
                            <div className=" flex flex-col gap-2">
                                <h3 className="font-queens opacity-90 leading-7 text-xl capitalize">{item.product.name}</h3>
                                <p className="text-xs  text-yellow-600 capitalize opacity-60">{item.variant.type}, {item.variant.name}</p>
                                <div className="gap-2 flex items-center">
                                    <button className="" onClick={() => item.product._id && item.variant.name && decreaseQuantity(item.product._id, item.variant.name)}><IoRemoveCircleOutline/></button>
                                    <span className="font-medium opacity-90">{item.quantity}</span>
                                    <button className="" onClick={() => item.product._id && item.variant.name &&increaseQuantity(item.product._id, item.variant.name)}><IoAddCircleOutline/> </button>
                                    <button className="text-red-400 ml-2 text-lg" onClick={() => item.product._id && item.variant.name &&removeProduct(item.product._id, item.variant.name)}><AiOutlineDelete/></button>
                                </div>
                                <PriceToast className="text-sm opacity-70" price={item.price*item.quantity}/>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 ">
                    <h2 className="font-queens text-3xl opacity-80">Estimated Total</h2>
                    <PriceToast price={getTotal()} className="text-2xl font-queens opacity-90"/>
                </div>
                <Link to={sdk.checkoutRoute}>
                    <Button extraClass="my-12 text-secondary bg-primary" label="checkout" size="large" loading={false}/>
                </Link>
            </section>:
            <div className="flex flex-col items-center justify-center h-[70vh]">
                <h2 className="font-queens text-3xl opacity-80">Cart Empty</h2>
                <Link to="/shop" className="opacity-30 mt-4 text-sm">Continue Shopping</Link>
                <MdOutlineRemoveShoppingCart className="text-[18rem] mt-16"/>
            </div>
            }
        </div>
    );
};

export default userCart;