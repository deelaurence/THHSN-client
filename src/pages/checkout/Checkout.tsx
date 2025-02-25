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
import SelectMerchant from './SelectMerchant';
import { IPayment } from '../../interfaces/paymentPayload';
import countries from '../../data/countries.json'
import { LiaShippingFastSolid } from 'react-icons/lia';

const Checkout = () => {
    const availableShippingLocations = useSelector((state:RootState)=>state.shipping.availableShippingOptions)
    const user = useSelector((state:RootState)=>state.user.user) 
    const [shippingType, setShippingType] = useState<"local"|"international"|"">(""); // local or international
    const [shippingFees,setShippingFees] = useState(0)
    const [states, setStates] = useState<{ location: string; price: number }[]>([]);
    const [cities, setCities] = useState([]);
    const {cartTotal}=useTheme()
    const [firstName, setFirstName] = useState(user?.firstName||user?.name?.split(' ')[0]||'');
    const [lastName, setLastName] = useState(user?.lastName||'');
    const [address, setAddress] = useState(user?.address||'');
    const [country, setCountry] = useState('');
    const [internationalCity, setInternationalCity] = useState('');
    const [stateOrProvince, setStateOrProvince] = useState('');
    const [postcode, setPostcode] = useState('');
    const [telephone, setTelephone] = useState(user?.phonenumber||'');
    const [showMerchants,setShowMerchants]=useState(false)
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const dispatch = useDispatch<AppDispatch>()
     
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

  const handleShippingTypeChange = (e:any) => {
    setShippingType(e.target.value);
    
    setSelectedState(''); // Reset state selection for local shipping
    setCities([]); // Reset cities
  };

  useEffect(()=>{
    if(shippingType==='local'){
        setCountry('Nigeria')
    }
    else{
        setCountry('')
    }
  },[shippingType])

  //console.log(country)
  useEffect(()=>{
    if(shippingType==='international'){
        setShippingFees(availableShippingLocations.find(item => item.location === 'international')?.price || 0)
    }
  },[shippingType])

  let selectMerchant = (e:any)=>{
    e.preventDefault()
    // //console.log(sdk.getCart())
    // return
    setShowMerchants(true)
  }


  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value); // This will trigger city fetching
    if(availableShippingLocations.length===0) return
    setShippingFees(availableShippingLocations.find(item => item.location === selectedState)?.price || 0)
  };
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value); // This will trigger city fetching
  };





  const shippingDetails:IPayment = {
    shippingType,
    shippingFees,
    cartTotal,
    firstName,
    lastName,
    address,
    country,
    internationalCity,
    stateOrProvince,
    selectedState,
    selectedCity,
    postcode,
    telephone,
    grandTotal:shippingFees+cartTotal
  };

  
  
  return (
    <div className="py-12 relative  mb-44">
      {showMerchants&&<SelectMerchant setShowMerchants={setShowMerchants} shippingDetails={shippingDetails}/>}
      <div className='px-6 sm:px-32'>
            <h2 className="uppercase mb-2">Supply your billing address</h2>
            <p className="text-xs opacity-60">To place your order, you must supply your billing address</p>

            <form 
            onSubmit={selectMerchant}
            className='pt-16'>
            {/* First Name and Last Name */}
            <FormInput type="text" value={firstName} required={true} onChange={(e) => {setFirstName(e.target.value)}} placeholder="First Name" />
            <FormInput type="text" value={lastName} required={true} onChange={(e) => {setLastName(e.target.value)}} placeholder="Last Name" />

            {/* Shipping Type Dropdown */}
            <div className="mb-4">
                <label className="block text-[10px] opacity-80 mb-2">Shipping Destination</label>
                <select
                value={shippingType}
                required={true}
                onChange={handleShippingTypeChange}
                className="border-b dark:border-b-neutral-600 border-neutral-600 bg-transparent p-2 pl-1 w-full focus:outline-none focus:border-b-2 focus:border-primary"
                >
                <option value="">Select a destination</option>
                <option className='text-primary bg-white' value="local">Nigeria</option>
                <option className='text-primary bg-white ' value="international">International </option>
                </select>
            </div>



            {/* additional information */}
            <div className='py-6 '>
                <div className='flex gap-2 items-start'>
                    <LiaShippingFastSolid className='opacity-60' />
                    <p className='text-[10px] w-[90%] opacity-70'>Items above 1kg in weight would attract additional shipping fee. You would be contacted in this case</p>
                </div>
                
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
                {states[0]?.location}
                <option value="">Select a state</option>
                {states.map((state: {location:string,price:number}) => (
                    <option className='text-primary' key={state.location} value={state.location}>
                    {state.location}
                    </option>
                ))}
                </select>

                </div>
                {selectedState && cities.length > 0 && (
                <div className="">
                <label className="block mb-2 text-[10px] opacity-80">City</label>
                <select 
                required={true}
                onChange={handleCityChange}
                className="border-b dark:border-b-neutral-600 border-neutral-600 pl-1 p-2 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-primary">
                    
                    <option value="">Select a city</option>
                    {cities.map((city: string) => (
                    <option className='text-primary' key={city} value={city}>
                        {city}
                    </option>
                    ))}
                </select>
                <div className='mt-6'>
                        <FormInput type="number" value={`${shippingFees}`} required={true} onChange={() => {}} placeholder="Shipping Fees in NGN" />
                </div>
                </div>
                )}
                </>
            )}


            {/* Conditional Fields for International Shipping */}
            {shippingType === 'international' && (
                <>
                
                <label className="block text-[10px] opacity-80 mb-2">Select your country</label>
                <select
                value={country}
                required={true} 
                onChange={(e) => {setCountry(e.target.value)}}
                className="border-b dark:border-b-neutral-600 mb-4 border-neutral-600 p-2 pl-1 w-full bg-transparent focus:outline-none focus:border-b-2 focus:border-primary"
                    >
                {states[0]?.location}
                <option value="">Select a country</option>
                {countries.map((country: {name:string, code:string}) => (
                    <option className='text-primary' key={country.name} value={country.name}>
                    {country.name}
                    </option>
                ))}
                </select>
                <FormInput type="number" value={shippingFees} required={true} onChange={() => {}} placeholder="Shipping Fees" />

                {/* <FormInput type="text" value={country} required={true} onChange={(e) => {setCountry(e.target.value)}} placeholder="Country" /> */}
                <FormInput type="text" value={internationalCity} required={true} onChange={(e) => {setInternationalCity(e.target.value)}} placeholder="City" />
                <FormInput type="text" value={postcode} required={true} onChange={(e) => {setPostcode(e.target.value)}} placeholder="Postcode" />
                <FormInput type="text" value={stateOrProvince} required={true} onChange={(e) => {setStateOrProvince(e.target.value)}} placeholder="State/Province" />
                </>
            )}
            <FormInput type="text" value={address} required={true} onChange={(e) => {setAddress(e.target.value)}} placeholder="Address" />
            <FormInput type="number" value={telephone} required={true} onChange={(e) => {setTelephone(e.target.value)}} placeholder="Telephone" />
            <div className='w-screen fixed left-0  sm:px-24 bottom-0'>
                <div className='px-6 pt-4 pb-2 flex flex-col gap-1 bg-secondary text-primary dark:bg-primary dark:text-secondary border-t border-t-neutral-700 dark:border-t-neutral-800 shadow-sm'>
                    <h3 className='font-bold'>Price Details</h3>
                    <div className='flex items-end justify-between text-xs'>
                        <p className='opacity-70'>Product price &nbsp; </p>
                        <PriceToast className='text-sm' price={cartTotal}/>
                    </div>
                    <div className='flex items-end justify-between text-xs'>
                        <p className='opacity-70'>Shipping &nbsp;</p>
                        <PriceToast className='text-sm' price={shippingFees}/>
                    </div>
                </div>
                <div className='dark:bg-primary border-t border-t-neutral-400 dark:border-t-neutral-800 bg-secondary text-primary dark:text-secondary flex px-6 py-2  justify-between '>
                    <div className='flex'>
                        <p className='opacity-70'>Total &nbsp;</p>
                        <PriceToast className='' price={shippingFees+cartTotal}/>
                    </div>
                    <div 
                    onClick={()=>{}}
                    className='flex items-center gap-2'>
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
