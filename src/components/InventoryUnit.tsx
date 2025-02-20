import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts,fetchProductsDraft } from '../store/fetchProductSlice';
import {  AppDispatch } from '../store/store';
import { Sdk } from '../utils/sdk';
import { Link } from 'react-router-dom';
import { IProduct, IProductDraft } from '../interfaces/productInterface';
import { FiDelete } from 'react-icons/fi';
import { deleteProduct } from '../store/adminSlice';

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



const ProductDeleteButton:React.FC<{product:IProduct|IProductDraft}> = ({product}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleDelete = () => {
    if (product._id) {
      dispatch(deleteProduct(product._id));
      setIsOpen(false); // Close modal after deletion
      setInputValue(""); // Reset input
      dispatch(fetchProducts());
      dispatch(fetchProductsDraft());
    }
  };

  return (
    <>
      {/* Delete Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="text-orange-500 opacity-60 cursor-pointer"
      >
        <FiDelete />
      </div>

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-primary bg-opacity-60 flex items-center text-primary justify-center z-[99999999] ">
          <div className="bg-white text-xs p-6 rounded-lg shadow-lg w-80 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-red-600">⚠️ Confirm Deletion</h2>
            <p className=''>You are about to delete <b>{product.name}</b></p>
            <p className=" text-gray-700 mt-2">
              Type <b>"sure"</b> below to confirm deletion.
            </p>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type 'sure' to confirm"
              className="border p-2 w-full mt-3 rounded"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={inputValue !== "sure"}
                className={`px-4 py-2 rounded ${
                  inputValue === "sure"
                    ? "bg-red-600 text-white"
                    : "bg-red-300 text-white cursor-not-allowed"
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};







  return (
    

    <div className="container mx-auto">
      {/* Product List */}
      
      <div className="">
        {status === 'succeeded' && filteredProducts.length === 0 && (
          <p className="text-gray-500 text-[10px] mt-6">Hmmmm. this place is empty</p>
        )}
        {status === 'succeeded' && filteredProducts.map((product) => (
         
         <section
         className='flex justify-between items-center'
         key={product._id}
         >
         <Link
            to={`${sdk.singleInventoryRoute}/${product.name}`}
            onDoubleClick={()=>{
            }}
            className="flex  border-b-[1px] relative border-b-gray-300 dark:border-b-neutral-700 justify-start items-center w-[90%] gap-4 pt-6"
          >
            <img
              src={product.images&&product?.images[0]?product?.images[0]:sdk.placeholderImage} 
              alt={product.name}
              className="w-20 h-12 object-cover mb-4"
            />
            <h2 className="text-xs ">{product.name}</h2>
            
          
          </Link>
          <ProductDeleteButton product={product}/>
          </section>
        ))}
      </div>
    </div>
  );
};

export default InventoryUnit;
