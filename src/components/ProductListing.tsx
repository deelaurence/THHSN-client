import React from 'react';
import { IProduct } from '../interfaces/productInterface';
import Button from './Button';

interface ProductsProps {
  products: IProduct[];
}

const ProductListing: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-6 ">
      {products.map((product, index) => (
        <div key={index} className="">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-40 object-cover  mb-2"
          />
        <h2 className="uppercase text-xs">
        {product.name.length > 20 ? product.name.slice(0, 20) + '...' : product.name}
        </h2>

        <p className='text-[10px]'>12 reviews</p>
        <Button loading={false} extraClass='text-xs font-thin h-8 mt-2' label='View product' size='large' />
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
