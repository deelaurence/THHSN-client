import React, { useEffect, useState } from 'react';
import CategoryHeader from '../../components/CategoryHeader';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import { SlInfo } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store.ts';
import { fetchShippingOptions, createShippingOption } from '../../store/shippingSlice.ts';
import { sdk } from '../../utils/sdk.ts';

const ShippingOptions = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Redux state
    const shippingOptions = useSelector((state: RootState) => state.shipping.shippingOptions);
    const shippingStatus = useSelector((state: RootState) => state.shipping.status);
    const shippingError = useSelector((state: RootState) => state.shipping.error);
    const successFeedback = useSelector((state: RootState) => state.shipping.successFeedback);

    // Component state
    const [shippingType, setShippingType] = useState<'local' | 'international'>('local');
    const [states, setStates] = useState<{ location: string; price: number }[]>([]);
    const [internationalPrice, setInternationalPrice] = useState<number | ''>('');

    // Fetch shipping options on mount
    useEffect(() => {
        if (shippingOptions.length === 0) {
            dispatch(fetchShippingOptions());
        }
    }, [dispatch, shippingOptions]);

    // Sync states with shipping options from Redux
    useEffect(() => {
        if (shippingType === 'local') {
            setStates(shippingOptions.filter(option => option.location !== 'international'));
        } else {
            const intlOption = shippingOptions.find(option => option.location === 'international');
            setInternationalPrice(internationalPrice||intlOption?.price||'');
        }
    }, [shippingType, shippingOptions]);

    const handleStatePriceChange = (index: number, price: number) => {
        setStates((prevStates) =>
            prevStates.map((state, i) =>
                i === index ? { ...state, price } : state
            )
        );
    };
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare the payload
        const payload ={ states: [...states, { location: 'international', price: Number(internationalPrice) }] };


        dispatch(createShippingOption(payload));
    };

    const isSubmitDisabled = false
    return (
        <div className="min-h-screen pb-4 px-6 sm:px-16">
            <form onSubmit={handleSubmit}>
                {/* Page Header */}
                <CategoryHeader
                    heading="Add/Edit Shipping Options!"
                    subheading="Configure shipping costs for local or international deliveries."
                />

                {/* Shipping Type Selector */}
                <div className="mt-12 [&>*]:w-1/2 mb-16 gap-2 flex [&>*]:px-2 ">
                    <div
                        className={`flex gap-2 pb-1 border-b border-neutral-600 items-center cursor-pointer ${
                            shippingType === 'local'
                                ? ''
                                : 'opacity-30'
                        }`}
                        onClick={() => setShippingType('local')}
                    >
                        <img className="h-4" src={sdk.nigeriaFlagIcon} alt="Nigeria Flag" />
                        Local
                    </div>
                    <div
                        className={`flex gap-2 border-b border-neutral-600  pb-1 items-center cursor-pointer ${
                            shippingType === 'international'
                                ? ''
                                : 'opacity-30'
                        }`}
                        onClick={() => setShippingType('international')}
                    >
                        <img className="h-4" src={sdk.usaFlagIcon} alt="USA Flag" />
                        International
                    </div>
                </div>

                {/* Shipping Form */}
                {shippingType === 'local' && (
                    <div className="space-y-4">
                        {states.map((state, index) => (
                            <div key={state.location} className="flex items-center gap-4">
                                <p className="w-1/3 dark:bg-primary-light bg-neutral-300">{state.location}</p>
                                <FormInput
                                    type="number"
                                    required={false}
                                    placeholder="Shipping Price in NGN"
                                    value={state.price || ''}
                                    onChange={e =>
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
                            value={internationalPrice}
                            onChange={e => setInternationalPrice(Number(e.target.value))}
                            required
                        />
                    </div>
                )}

                {/* Submit Button */}
                <Button
                    extraClass="bg-primary fixed bottom-0 text-secondary"
                    disabled={isSubmitDisabled || shippingStatus === 'loading'}
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
