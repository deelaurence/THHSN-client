import React, { useState, useEffect } from 'react';
import FormInput from '../../components/FormInput';
import { AppDispatch } from '../../store/store';
import { fetchAvailableShippingOptions } from '../../store/shippingSlice';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { useTheme } from '../../contexts/AppContext';
import PriceToast from '../../components/PriceToast';
import { useNavigate } from 'react-router-dom';
import { sdk } from '../../utils/sdk';
import { BsArrowRight } from 'react-icons/bs';
const Checkout = () => {
    const [shippingType, setShippingType] = useState('local'); // local or international
    const [shippingFees,setShippingFees] = useState(0)
    const [states, setStates] = useState<{ location: string; price: number }[]>([]);
    const [cities, setCities] = useState([]);
    const {cartTotal}=useTheme()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [internationalCity, setInternationalCity] = useState('');
    const [stateOrProvince, setStateOrProvince] = useState('');
    const [postcode, setPostcode] = useState('');
    const [telephone, setTelephone] = useState('');

    const [selectedState, setSelectedState] = useState('');
    const dispatch = useDispatch<AppDispatch>()
    const availableShippingLocations = useSelector((state:RootState)=>state.shipping.availableShippingOptions) 
    const navigate  = useNavigate()
//   // Fetch all 36 states in Nigeria
//   useEffect(() => {
//     if (shippingType === 'local') {
//       fetch('https://nga-states-lga.onrender.com/fetch') // Replace with actual API endpoint
//         .then((response) => response.json())
//         .then((data) => setStates(data))
//         .catch((error) => console.error('Error fetching states:', error));
//     }
//   }, [shippingType]);

if(!cartTotal){
    navigate(sdk.cartRoute)
}


useEffect(() => {
    dispatch(fetchAvailableShippingOptions());
}, [dispatch]);

useEffect(() => {
    setStates(availableShippingLocations.filter(option => option.location !== 'international'));
}, [availableShippingLocations]);


  // Fetch cities based on the selected state
  useEffect(() => {
    if (selectedState) {
        setShippingFees(availableShippingLocations.find(item => item.location === selectedState)?.price || 0)
      if(selectedState==='international') return
      fetch(`https://nga-states-lga.onrender.com/?state=${selectedState}`) // Replace with actual API endpoint
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error('Error fetching cities:', error));
    } else {
      setCities([]); // Clear cities when no state is selected
    }
  }, [selectedState]);

  const handleShippingTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShippingType(e.target.value);
    
    setSelectedState(''); // Reset state selection for local shipping
    setCities([]); // Reset cities
  };

  useEffect(()=>{
    console.log(shippingType)
    if(shippingType==='international'){
        setShippingFees(availableShippingLocations.find(item => item.location === 'international')?.price || 0)
    }
  },[shippingType])

  console.log(shippingFees,cartTotal)

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value); // This will trigger city fetching
    if(availableShippingLocations.length===0) return
    setShippingFees(availableShippingLocations.find(item => item.location === selectedState)?.price || 0)
  };
  return (
    <div className="py-12 mb-44">
      <div className='px-6'>
            <h2 className="uppercase mb-2">Supply your billing address</h2>
            <p className="text-xs opacity-60">To place your order, you must supply your billing address</p>

            <form className='pt-16'>
            {/* First Name and Last Name */}
            <FormInput type="text" value={firstName} required={true} onChange={(e) => {setFirstName(e.target.value)}} placeholder="First Name" />
            <FormInput type="text" value={lastName} required={true} onChange={(e) => {setLastName(e.target.value)}} placeholder="Last Name" />

            {/* Shipping Type Dropdown */}
            <div className="mb-4">
                <label className="block text-[10px] opacity-80 mb-2">Shipping Destination</label>
                <select
                value={shippingType}
                onChange={handleShippingTypeChange}
                className="border-b dark:border-b-neutral-600 border-neutral-600 bg-transparent p-2 pl-1 w-full focus:outline-none focus:border-b-2 focus:border-primary"
                >
                <option className='text-primary bg-white' value="local">Nigeria</option>
                <option className='text-primary bg-white ' value="international">International</option>
                </select>
            </div>

            {/* Conditional Fields for Local Shipping */}
            {shippingType === 'local' && states.length > 0 && (
                <>
                <div className="mb-4">
                    
                    <label className="block text-[10px] opacity-80 mb-2">Select a state</label>
                    <select
                value={selectedState}
                required={true}
                onChange={handleStateChange}
                className="border-b dark:border-b-neutral-600 border-neutral-600 p-2 pl-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-primary"
                    >
                {states[0].location}
                <option value="">Select a state</option>
                {states.map((state: {location:string,price:number}) => (
                    <option className='text-primary' key={state.location} value={state.location}>
                    {state.location}
                    </option>
                ))}
                    </select>

                </div>
                {selectedState && cities.length > 0 && (
                    <div className="mb-4">
                <label className="block mb-2 text-[10px] opacity-80">City</label>
                <select 
                required={true}
                className="border-b dark:border-b-neutral-600 border-neutral-600 pl-1 p-2 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-primary">
                    
                    <option value="">Select a city</option>
                    {cities.map((city: string) => (
                    <option className='text-primary' key={city} value={city}>
                        {city}
                    </option>
                    ))}
                </select>
                <div className='mt-8'>
                        <FormInput type="number" value={`${shippingFees}`} required={true} onChange={() => {}} placeholder="Shipping Fees in NGN" />
                </div>
                </div>
                )}
                </>
            )}


            {/* Conditional Fields for International Shipping */}
            {shippingType === 'international' && (
                <>
                <FormInput type="number" value={shippingFees} required={true} onChange={() => {}} placeholder="Shipping Fees in USD" />
                <FormInput type="text" value={country} required={true} onChange={(e) => {setCountry(e.target.value)}} placeholder="Country" />
                <FormInput type="text" value={internationalCity} required={true} onChange={(e) => {setInternationalCity(e.target.value)}} placeholder="City" />
                <FormInput type="text" value={postcode} required={true} onChange={(e) => {setPostcode(e.target.value)}} placeholder="Postcode" />
                <FormInput type="text" value={stateOrProvince} required={true} onChange={(e) => {setStateOrProvince(e.target.value)}} placeholder="State/Province" />
                </>
            )}
            <FormInput type="text" value={address} required={true} onChange={(e) => {setAddress(e.target.value)}} placeholder="Address" />
            <FormInput type="number" value={telephone} required={true} onChange={(e) => {setTelephone(e.target.value)}} placeholder="Telephone" />
            <div className='w-screen fixed left-0  bottom-0'>
                <div className='px-6 pt-4 pb-2  flex flex-col gap-1 bg-secondary text-primary border-t border-t-neutral-700'>
                    <h3 className='text-xl font-bold mb-2'>Price Details</h3>
                    <div className='flex items-end justify-between text-xs'>
                        <p className='opacity-70'>Product price &nbsp; </p>
                        <PriceToast className='text-sm' price={cartTotal}/>
                    </div>
                    <div className='flex items-end justify-between text-xs'>
                        <p className='opacity-70'>Shipping &nbsp;</p>
                        <PriceToast className='text-sm' price={shippingFees}/>
                    </div>
                </div>
                <div className='dark:bg-secondary border-t border-t-neutral-400 bg-secondary text-primary dark:text-primary flex px-6 py-5  justify-between '>
                    <div className='flex'>
                        <p className='opacity-70'>Total &nbsp;</p>
                        <PriceToast className='' price={shippingFees+cartTotal}/>
                    </div>
                    <div className='flex items-center gap-2'>
                        <button className='uppercase'>Continue </button>
                        <BsArrowRight/>
                    </div>
                </div>
            </div>
            
            </form>
       </div>
    </div>
  );
};

export default Checkout;
