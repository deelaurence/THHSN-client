import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts,fetchProductsDraft } from '../store/fetchProductSlice';
import {  AppDispatch } from '../store/store';
import { Sdk } from '../utils/sdk';
import { Link } from 'react-router-dom';
import { IProduct, IProductDraft } from '../interfaces/productInterface';

const sdk = new Sdk();
 
const InventoryUnit: React.FC<{ filterProp: string; products:IProduct[]|IProductDraft[],status:string}> = ({ filterProp,status,products}) => {
  const dispatch: AppDispatch = useDispatch();
  // const { products,productsDrafts,status } = useSelector((state: RootState) => state.product);
  
  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductsDraft());
  }, [dispatch]);

  // Filtered products based on category selection
  let filteredProducts = filterProp
    ? products.filter((product) => product.category === filterProp)
    : products;

  if (filterProp === 'all') {
    filteredProducts = products;
  }

  return (
    

    <div className="container mx-auto">
      {/* Product List */}
      
      <div className="">
        {status === 'succeeded' && filteredProducts.length === 0 && (
          <p className="text-gray-500 text-[10px] mt-6">Hmmmm. this place is empty</p>
        )}
        {status === 'succeeded' && filteredProducts.map((product) => (
          <Link
            to={`${sdk.singleInventoryRoute}/${product.name}`}
            key={product._id}
            onDoubleClick={()=>{
              console.log('dragging')
            }}
            className="flex  border-b-[1px] relative border-b-gray-300 dark:border-b-neutral-700 justify-start items-center gap-4 pt-6"
          >
            <img
              src={product.images&&product?.images[0]?product?.images[0]:sdk.placeholderImage} 
              alt={product.name}
              className="w-[20%] h-12 object-cover mb-4"
            />
            <h2 className="text-xs ">{product.name}</h2>
            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InventoryUnit;
