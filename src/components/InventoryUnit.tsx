import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice'; // Assume you have a slice for fetching products
import { RootState,AppDispatch } from '../store/store';
import PageHeader from '../components/PageHeader';
import DashboardNav from '../components/DashboardNav';
import { Sdk } from '../utils/sdk';
import CategoryHeader from './CategoryHeader';
const sdk=new Sdk()
import { Link } from 'react-router-dom';


const InventoryUnit: React.FC<{filterProp:string}> = ({filterProp}) => {
  const dispatch:AppDispatch = useDispatch();
  const { products, categories, status, error } = useSelector((state: RootState) => state.product); 
    
 


  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle category selection
 
  // Filtered products based on category selection
  let filteredProducts = filterProp
    ? products.filter((product) => product.category === filterProp)
    : products;

    if(filterProp==="all"){
        filteredProducts=products
    }
  return (
    <div className="container mx-auto">

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {status === 'loading' && <p>Loading products...</p>}
        {status === 'succeeded' && filteredProducts.length === 0 && (
          <p className="text-gray-500">No products found in this category.</p>
        )}

        {filteredProducts.map((product) => (

          <Link
            to={`${sdk.singleInventoryRoute}/${product.name}`}
            key={product._id} className="flex border-b-[1px] border-b-gray-300 dark:border-b-neutral-700 justify-start items-center gap-4 pt-6">
            <img
              src={product.images[0]} // Assuming you have an array of images
              alt={product.name}
              className="w-[20%] h-12 object-cover  mb-4"
            />
            <h2 className="text-xs ">{product.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InventoryUnit;
