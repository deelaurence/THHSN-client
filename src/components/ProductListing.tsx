import React from 'react';
import { IProduct } from '../interfaces/productInterface';
import PageHeader from './PageHeader';
import SkeletonLoader from './SkeletonLoader';
import { sdk } from '../utils/sdk';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PriceToast from './PriceToast';
import { FcCancel } from 'react-icons/fc';
interface ProductsProps {
  products: IProduct[];
  filterProps: string;
}


const ProductListing: React.FC<ProductsProps> = ({ products,filterProps }) => {
  const param = useParams()
  
  if(param?.name){
    if(param.name.toLowerCase().includes("product")){
      filterProps='Products'
    }else{
      filterProps=param.name
    }
  }
  let filteredProducts = products.filter((product:IProduct)=>product.category.toLowerCase()===filterProps.toLowerCase())
  
  if(filterProps==='all'){
    filteredProducts = products
  }
  
  if(filterProps==='Products'){
    filterProps="Hair Products"
  }
  
  
  return (
    <section>
    <PageHeader heading="" accent={filterProps==="all"?"All Products":filterProps}/>
    <div className="grid grid-cols-2 tablet:grid-cols-3 md:grid-cols-4 gap-6 tablet:gap-8 md:gap-12 -mt-8 mb-44" >
      {filteredProducts.length === 0 && (
        <>
          {[...Array(6)].map((_, index) => (
          <SkeletonLoader key={index} />
          ))}
        </>
      )}
      {filteredProducts.map((product, index) => (
      <Link
      to={`${sdk.productDetailRoute}/${product.name}`}>  
        <div key={index} className=" overflow-hidden">
          <img 
            src={product.coverImage??product.images[0]} 
            alt={product.name} 
            className="w-full h-40 sm:h-64 rounded-xl object-cover  mb-2"
          />
        <h2 className="uppercase text-xs">
        {product.name.length > 20 ? product.name.slice(0, 20) + '...' : product.name}
        </h2>
        <div className='flex justify-between items-center'>
        <PriceToast className='text-[8px] text-yellow-600' price={product.variations[0].variations[0].price}/>
        {product.outOfStock&&<p className='text-[8px] bg-red-500 uppercase text-white px-1 rounded-xl flex items-center gap-1'>Sold out <FcCancel/> </p>}
        </div>
        {/* <Button loading={false} extraClass='text-xs rounded-l bg-transparent  font-thin h-8 mt-2' label='View product' size='large' /> */}
        </div>
      </Link>  
      ))}
    </div>
    </section>
  );
};

export default ProductListing;
