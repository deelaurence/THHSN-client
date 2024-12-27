export interface VariationLevelOne {
    variation: string;
    price: number;
    quantity: number;
  }
  
  export interface VariationLevelTwo {
    name: string;
    variations: VariationLevelOne[];
  }
  
  export interface IProduct {
    _id?: string; // Optional if it comes from the backend, will be added when fetched
    name: string;
    coverImage?:string;
    category: string;
    description?: string; // Optional, as your backend does not make it required
    quantity: number;
    price: number;
    bestSeller:boolean;
    newArrival:boolean;
    images: string[]; // Array of image URLs
    variations: VariationLevelTwo[];
  }
  