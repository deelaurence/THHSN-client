import React from 'react';
import { useTheme } from '../contexts/AppContext';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Loader from './Loader';
interface PriceProps {
    price: number;
    className: string;
}

const PriceToast: React.FC<PriceProps> = ({ price, className }) => {
    const {isDollar}=useTheme()
    const exchangeRate = useSelector((state:RootState)=>{
        return state.product.exchangeRate
    })
  return (
    <div>
        {
            isDollar?
            <>
                {exchangeRate?<p className={`${className}`}>${(price / exchangeRate).toFixed(2)}</p>:
                <Loader/>
                }
            </>

            :
            <p className={`${className}`}>&#8358;{new Intl.NumberFormat('en-NG', { minimumFractionDigits: 0 }).format(price)}</p>

        }
    </div>
  );
}

export default PriceToast;