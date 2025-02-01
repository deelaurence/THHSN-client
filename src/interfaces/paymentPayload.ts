export interface IPayment {
    address: string;
    cartTotal: number;
    country: string;
    firstName: string;
    grandTotal: number;
    internationalCity: string;
    lastName: string;
    postcode: string;
    selectedCity: string;
    selectedState: string;
    shippingFees: number;
    shippingType: "local" | "international";
    stateOrProvince: string;
    telephone: string|number;
    merchant?:string;
    cart?:[]
  }
  