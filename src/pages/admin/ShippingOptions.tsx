import React, { useEffect, useState } from 'react';
import CategoryHeader from '../../components/CategoryHeader';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import { SlInfo } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store.ts';
import { fetchShippingOptions, createShippingOption} from '../../store/shippingSlice.ts';
import { sdk } from '../../utils/sdk.ts';

const ShippingOptions = () => {
    const dispatch = useDispatch<AppDispatch>();

    const shippingOptions = useSelector((state: RootState) => state.shipping.shippingOptions);
    const shippingStatus = useSelector((state: RootState) => state.shipping.status);
    const shippingError = useSelector((state: RootState) => state.shipping.error);
    const successFeedback = useSelector((state: RootState) => state.shipping.successFeedback);

    const [shippingType, setShippingType] = useState<'local' | 'international'>('local');
    const [states, setStates] = useState<{ location: string; price: number }[]>(shippingOptions);
    const [internationalPrice, setInternationalPrice] = useState<number | ''>('');

    // Fetch all 36 states in Nigeria
    // useEffect(() => {
    //     if (shippingType === 'local' && shippingOptions.length===0) {
    //         console.log("fetching states")
    //         fetch('https://nga-states-lga.onrender.com/fetch') // Replace with your actual API endpoint
    //             .then((response) => response.json())
    //             .then((data) =>
    //                 setStates(data.map((state: string) => ({ location: state, price: 0 })))
    //             )
    //             .catch((error) => console.error('Error fetching states:', error));
    //     }
    // }, [shippingType]);
    // Fetch existing shipping options
    useEffect(() => {
        dispatch(fetchShippingOptions());
        setStates(shippingOptions)
    }, [dispatch]);

    const handleStatePriceChange = (index: number, price: number) => {
        setStates((prevStates) => {
            const updatedStates = [...prevStates];
            updatedStates[index].price = price;
            return updatedStates;
        });
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStates([...states,{location:"international",price:Number(internationalPrice)}])
        // return
        dispatch(createShippingOption({states}))

        // if (shippingType === 'local') {
        //     // Dispatch local shipping options
        //     dispatch(updateShippingOption({ type: 'local', states }));
        // } else {
        //     // Dispatch international shipping option
        //     dispatch(updateShippingOption({ type: 'international', price: internationalPrice }));
        // }
    };

    return (
        <div className="min-h-screen pb-4 px-6 sm-px-16">
            <form onSubmit={handleSubmit}>
                {/* Page Header */}
                <CategoryHeader
                    heading="Add/Edit Shipping Options!"
                    subheading="Configure shipping costs for local or international deliveries."
                />

                {/* Shipping Type Selector */}
                <div className="mt-12 mb-16 gap-2 flex  [&>*]:px-4 border-b">
                    <div
                        className={`flex gap-2 items-center ${shippingType === 'local' ? 'border-b border-b-neutral-600 ' : 'border-b border-b-neutral-600 opacity-30'}`}
                        onClick={() => setShippingType('local')}
                    >
                        <img className='h-4' src={sdk.nigeriaFlagIcon} alt="" />
                        Local
                    </div>    
                    <div
                        className={`flex gap-2 items-center ${shippingType === 'international' ? 'border-b border-b-neutral-600 ' : 'border-b border-b-neutral-600 opacity-30'}`}
                        onClick={() => setShippingType('international')}
                    >
                        <img className='h-4' src={sdk.usaFlagIcon} alt="" />
                        International
                    </div>    
                </div>

                {/* Shipping Form */}
                {shippingType === 'local' && (
                    <div className="space-y-4">
                        {states.map((state, index) => (
                            <div key={state.location} className="flex items-center gap-4">
                                <p className="w-1/3">{state.location}</p>
                                <FormInput
                                    type="number"
                                    required={false}
                                    placeholder="Shipping Price In NGN"
                                    value={
                                        state.price ||
                                        shippingOptions.find(
                                            (option) => option.location === state.location
                                        )?.price || ''
                                    }
                                    onChange={(e) =>
                                        handleStatePriceChange(index, Number(e.target.value))
                                    }
                                />
                            </div>
                        ))}
                    </div>
                )}

                {shippingType === 'international' && (
                    <div className="my-4">
                        <FormInput
                            type="number"
                            placeholder="International Shipping Price in NGN"
                            value={internationalPrice||states.find(item=> item.location=="international")?.price || ''}
                            onChange={(e) => setInternationalPrice(Number(e.target.value))}
                            required
                        />
                    </div>
                )}

                {/* Submit Button */}
                <Button
                    extraClass="bg-primary fixed bottom-0 text-secondary"
                    disabled={shippingStatus === 'loading'}
                    size="large"
                    label="Save Changes"
                    loading={shippingStatus === 'loading'}
                />
            </form>

            {/* Error or Success Feedback */}
            {shippingStatus === 'failed' && (
                <p className="text-danger dark:text-danger-light text-[12px] py-2 flex gap-1 items-center input-errors">
                    <SlInfo /> {shippingError}
                </p>
            )}
            {successFeedback && (
                <p className="text-success dark:text-success-light text-[12px] py-2 flex gap-1 items-center">
                    <SlInfo /> {successFeedback}
                </p>
            )}
        </div>
    );
};

export default ShippingOptions;
