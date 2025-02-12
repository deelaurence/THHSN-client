interface Variant {
    type: string;
    name: string;
  }
  
  interface CartItem {
    price: string;
    quantity: string;
    name: string;
    variant: Variant;
  }
  
  interface Description {
    shippingType: string;
    shippingFees: string;
    cartTotal: string;
    firstName: string;
    lastName: string;
    address: string;
    country?: string;
    internationalCity?: string;
    stateOrProvince?: string;
    selectedState: string;
    selectedCity: string;
    postcode?: string;
    telephone: string;
    grandTotal: string;
    merchant: string;
    cart: CartItem[];
  }
  
  export interface Order {
    _id: string;
    owner: string;
    amount: number;
    merchant: string;
    description: Description;
    reference: string;
    name: string;
    date: string;
    status: string;
    id: string;
    deliveryMessage?:string;
    deliveryStatus:string;
    deliveryTimeline:[
      { status: string, time: string },
      { status: string, time: string }, 
      { status: string, time: string }, 
    ],
    __v: number;
  }
  